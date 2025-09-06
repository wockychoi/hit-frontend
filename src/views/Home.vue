<template>
  <div class="table-container">
    <h2>📦 주문내역 관리</h2>
    <p>Total {{ orders.length }}건</p>

    <div class="table-wrapper">
      <table class="order-table">
        <thead>
          <tr>
            <th>비교</th>
            <th>주문일자</th>
            <th>출고일자</th>
            <th>택배사</th>
            <th>송장번호</th>
            <th>거래처명</th>
            <th>수령자/상품고유번호</th>
            <th>휴대전화/상품명</th>
            <th>결재수단</th>
            <th>우편번호</th>
            <th>수량</th>
            <th>단가</th>
            <th>금액</th>
            <th>택배비</th>
            <th>총결재금액</th>
            <th>배송메세지</th>
            <th>관리자메모</th>
            <th>배송지</th>
            <th>복사</th>
            <th>수정</th>
            <th>추가</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in paginatedOrders" :key="index">
            <!-- 체크박스 -->
            <td>
              <input
                type="checkbox"
                v-model="selectedOrders"
                :value="index + (currentPage - 1) * pageSize"
              />
            </td>

            <!-- 일반 데이터/수정 -->
            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.주문일자"
                type="date"
                class="edit-input"
              />
              <span v-else>{{ order.주문일자 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.출고일자"
                type="date"
                class="edit-input"
              />
              <span v-else>{{ order.출고일자 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.택배사"
                type="text"
                class="edit-input"
              />
              <span v-else>{{ order.택배사 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.송장번호"
                type="text"
                class="edit-input"
              />
              <span v-else>{{ order.송장번호 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.거래처명"
                type="text"
                class="edit-input"
              />
              <span v-else>{{ order.거래처명 }}</span>
            </td>

            <!-- 수령자 + 상품고유번호 -->
            <td>
              <div v-if="isEditing(index)">
                <input
                  v-model="order.주문자"
                  type="text"
                  class="edit-input"
                  placeholder="수령자"
                />
                <input
                  v-model="order.상품고유번호"
                  type="text"
                  class="edit-input"
                  placeholder="상품고유번호"
                />
              </div>
              <div v-else>
                <div>{{ order.주문자 }}</div>
                <div>{{ order.상품고유번호 }}</div>
              </div>
            </td>

            <!-- 휴대전화 + 상품명 -->
            <td>
              <div v-if="isEditing(index)">
                <input
                  v-model="order.휴대전화"
                  type="text"
                  class="edit-input"
                  placeholder="휴대전화"
                />
                <input
                  v-model="order.상품명"
                  type="text"
                  class="edit-input"
                  placeholder="상품명"
                />
              </div>
              <div v-else>
                <div>{{ order.휴대전화 }}</div>
                <div>{{ order.상품명 }}</div>
              </div>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.결재수단"
                type="text"
                class="edit-input"
              />
              <span v-else>{{ order.결재수단 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model="order.우편번호"
                type="text"
                class="edit-input"
              />
              <span v-else>{{ order.우편번호 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model.number="order.수량"
                type="number"
                class="edit-input"
              />
              <span v-else>{{ order.수량 }}</span>
            </td>

            <td>
              <input
                v-if="isEditing(index)"
                v-model.number="order.단가"
                type="number"
                class="edit-input"
              />
              <span v-else>{{ order.단가 }}</span>
            </td>

            <td>{{ order.금액 }}</td>
            <td>{{ order.택배비 }}</td>
            <td>{{ order.총결재금액 }}</td>

            <!-- 두 줄 입력 (textarea) -->
            <td>
              <textarea
                v-if="isEditing(index)"
                v-model="order.배송메세지"
                rows="2"
                class="edit-textarea"
              ></textarea>
              <span v-else>{{ order.배송메세지 }}</span>
            </td>

            <td>
              <textarea
                v-if="isEditing(index)"
                v-model="order.관리자메모"
                rows="2"
                class="edit-textarea"
              ></textarea>
              <span v-else>{{ order.관리자메모 }}</span>
            </td>

            <td>
              <textarea
                v-if="isEditing(index)"
                v-model="order.배송지"
                rows="2"
                class="edit-textarea"
              ></textarea>
              <span v-else>{{ order.배송지 }}</span>
            </td>

            <!-- 버튼 -->
            <td>
              <button class="btn copy" @click="copyRow(index)">복사</button>
            </td>
            <td>
              <button class="btn edit" @click="editRow(index)">
                {{ editIndex === index ? "저장" : "수정" }}
              </button>
            </td>
            <td>
              <button class="btn add" @click="addRow">추가</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이징 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">다음</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editIndex: null,
      currentPage: 1,
      pageSize: 5,
      selectedOrders: [],
      orders: [
        {
          주문일자: "2025-09-01",
          출고일자: "2025-09-02",
          택배사: "CJ대한통운",
          송장번호: "6915-0642-5911",
          거래처명: "히든컴퍼니",
          주문자: "김철수",
          상품고유번호: "P-1001",
          휴대전화: "010-1234-5678",
          상품명: "프리미엄사료 10kg",
          결재수단: "카드",
          우편번호: "05342",
          수량: 2,
          단가: 15000,
          금액: 30000,
          택배비: 3000,
          총결재금액: 33000,
          배송메세지: "부재시 문앞에 두세요",
          관리자메모: "첫주문 고객",
          배송지: "서울 강동구 천호동",
        },
        {
          주문일자: "2025-09-02",
          출고일자: "2025-09-03",
          택배사: "롯데택배",
          송장번호: "4077-1005-301",
          거래처명: "굿컴퍼니",
          주문자: "이민호",
          상품고유번호: "P-1002",
          휴대전화: "010-9876-5432",
          상품명: "강아지 간식 종세트",
          결재수단: "무통장",
          우편번호: "06234",
          수량: 1,
          단가: 12000,
          금액: 12000,
          택배비: 0,
          총결재금액: 12000,
          배송메세지: "빠른 배송 부탁드려요",
          관리자메모: "VIP 고객",
          배송지: "서울 서초구 반포동",
        },
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.orders.length / this.pageSize);
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.orders.slice(start, start + this.pageSize);
    },
  },
  methods: {
    isEditing(index) {
      return this.editIndex === index;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    copyRow(index) {
      const globalIndex = index + (this.currentPage - 1) * this.pageSize;
      const newRow = { ...this.orders[globalIndex] };
      this.orders.splice(globalIndex + 1, 0, newRow);
      axios
        .post("http://15.165.125.244:8080/admin/api/order/save", newRow)
        .then(() => {
          alert("복사된 주문 저장 완료");
        });
    },
    addRow() {
      const newRow = {
        주문일자: "",
        출고일자: "",
        택배사: "",
        송장번호: "",
        거래처명: "",
        주문자: "",
        상품고유번호: "",
        휴대전화: "",
        상품명: "",
        결재수단: "",
        우편번호: "",
        수량: 0,
        단가: 0,
        금액: 0,
        택배비: 0,
        총결재금액: 0,
        배송메세지: "",
        관리자메모: "",
        배송지: "",
      };
      this.orders.push(newRow);
      axios
        .post("http://15.165.125.244:8080/admin/api/order/add", newRow)
        .then(() => {
          alert("새 주문 추가 완료");
        });
    },
    editRow(index) {
      const globalIndex = index + (this.currentPage - 1) * this.pageSize;
      if (this.editIndex === index) {
        // 저장 모드
        this.orders[globalIndex].금액 =
          this.orders[globalIndex].수량 * this.orders[globalIndex].단가;
        this.orders[globalIndex].총결재금액 =
          this.orders[globalIndex].금액 + this.orders[globalIndex].택배비;

        axios
          .post(
            "http://15.165.125.244:8080/admin/api/order/modify",
            this.orders[globalIndex]
          )
          .then(() => {
            alert("주문 수정 완료");
          });
        this.editIndex = null;
      } else {
        this.editIndex = index;
      }
    },
  },
};
</script>

<style>
.table-container {
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto; /* 모바일에서 가로 스크롤 가능 */
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  table-layout: fixed; /* 반응형 고정 */
  word-wrap: break-word;
  white-space: normal;
}

.order-table th {
  background: #222;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.order-table td {
  border: 1px solid #ddd;
  padding: 6px;
  text-align: center;
  vertical-align: middle;
}

.order-table td div {
  line-height: 1.4;
}

.edit-input {
  width: 95%;
  padding: 4px;
  margin: 2px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-textarea {
  width: 95%;
  padding: 4px;
  margin: 2px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin: 2px;
  border-radius: 5px;
  color: #fff;
}

.btn.copy {
  background: #6c757d;
}

.btn.edit {
  background: #ffc107;
}

.btn.add {
  background: #28a745;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.pagination button {
  margin: 0 5px;
  padding: 6px 12px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.pagination button:disabled {
  background: #ccc;
}
</style>
