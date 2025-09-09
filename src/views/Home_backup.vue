<template>
  <div class="table-container">
    <h2>📦 주문내역 관리</h2>
    <p>Total {{ orders.length }}건</p>

    <div class="table-wrapper">
      <table class="order-table">
        <thead>
          <tr>
            <th>비교</th>
            <th>출고일자</th>
            <th>택배사</th>
            <th>송장번호</th>
            <th>주문일자</th>
            <th>구분</th>
            <th>거래처명</th>
            <th>주문자</th>
            <th>수령자/상품고유번호</th>
            <th>휴대전화/상품명</th>
            <th>결재수단</th>
            <th>우편번호/수량</th>
            <th>수량</th>
            <th>단가</th>
            <th>금액</th>
            <th>택배비</th>
            <th>총결재금액</th>
            <th>배송메세지</th>
            <th>관리자메모</th>
            <th>배송지</th>
            <th class="th-action">액션</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, localIndex) in paginatedOrders" :key="getGlobalIndex(localIndex)">
            <!-- 비교 체크박스 (value는 전역 인덱스) -->
            <td class="td-check">
              <input
                type="checkbox"
                v-model="selectedOrders"
                :value="getGlobalIndex(localIndex)"
              />
            </td>

            <td>
              <input
                v-if="isEditing(localIndex)"
                v-model="order.출고일자"
                type="date"
                class="edit-input"
              />
              <span v-else>{{ order.출고일자 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.택배사" class="edit-input" />
              <span v-else>{{ order.택배사 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.송장번호" class="edit-input" />
              <span v-else>{{ order.송장번호 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.주문일자" type="date" class="edit-input" />
              <span v-else>{{ order.주문일자 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.구분" class="edit-input" />
              <span v-else>{{ order.구분 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.거래처명" class="edit-input" />
              <span v-else>{{ order.거래처명 }}</span>
            </td>
<td>
              <input v-if="isEditing(localIndex)" v-model="order.구분" class="edit-input" />
              <span v-else>{{ order.구분 }}</span>
            </td>
            <!-- 수령자 + 상품고유번호 -->
            <td>
              <div v-if="isEditing(localIndex)">
                <input v-model="order.주문자" class="edit-input" placeholder="수령자" />
                <input v-model="order.상품고유번호" class="edit-input" placeholder="상품고유번호" />
              </div>
              <div v-else>
                <div>{{ order.주문자 }}</div>
                <div>{{ order.상품고유번호 }}</div>
              </div>
            </td>
            
            <!-- 휴대전화 + 상품명 -->
            <td>
              <div v-if="isEditing(localIndex)">
                <input v-model="order.휴대전화" class="edit-input" placeholder="휴대전화" />
                <input v-model="order.상품명" class="edit-input" placeholder="상품명" />
              </div>
              <div v-else>
                <div>{{ order.휴대전화 }}</div>
                <div>{{ order.상품명 }}</div>
              </div>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.결재수단" class="edit-input" />
              <span v-else>{{ order.결재수단 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model="order.우편번호" class="edit-input" />
              <span v-else>{{ order.우편번호 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model.number="order.수량" type="number" class="edit-input" />
              <span v-else>{{ order.수량 }}</span>
            </td>

            <td>
              <input v-if="isEditing(localIndex)" v-model.number="order.단가" type="number" class="edit-input" />
              <span v-else>{{ order.단가 }}</span>
            </td>

            <td>{{ order.금액 }}</td>
            <td>{{ order.택배비 }}</td>
            <td>{{ order.총결재금액 }}</td>

            <td>
              <textarea v-if="isEditing(localIndex)" v-model="order.배송메세지" rows="2" class="edit-textarea"></textarea>
              <span v-else>{{ order.배송메세지 }}</span>
            </td>

            <td>
              <textarea v-if="isEditing(localIndex)" v-model="order.관리자메모" rows="2" class="edit-textarea"></textarea>
              <span v-else>{{ order.관리자메모 }}</span>
            </td>

            <td>
              <textarea v-if="isEditing(localIndex)" v-model="order.배송지" rows="2" class="edit-textarea"></textarea>
              <span v-else>{{ order.배송지 }}</span>
            </td>

            <!-- 액션 버튼 (한 칸) -->
            <td class="td-action">
              <div class="action-buttons">
                <button
                  class="btn btn-icon btn-copy"
                  @click="copyRow(getGlobalIndex(localIndex))"
                  title="복사"
                >📄</button>

                <button
                  class="btn btn-icon btn-edit"
                  @click="editRow(localIndex)"
                  :title="isEditing(localIndex) ? '저장' : '수정'"
                >{{ isEditing(localIndex) ? '💾' : '✏️' }}</button>

                <button
                  class="btn btn-icon btn-add"
                  @click="addRowAfter(getGlobalIndex(localIndex))"
                  title="추가"
                >➕</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이징 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">다음</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editIndex: null, // 전역 인덱스(orders 배열 기준). null이면 편집중 아님
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
      return Math.max(1, Math.ceil(this.orders.length / this.pageSize));
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.orders.slice(start, start + this.pageSize);
    },
  },
  methods: {
    // helper: 로컬 인덱스 -> 전역 인덱스
    getGlobalIndex(localIndex) {
      return localIndex + (this.currentPage - 1) * this.pageSize;
    },

    // 편집 여부 판단 (로컬 인덱스 기준)
    isEditing(localIndex) {
      return this.editIndex === this.getGlobalIndex(localIndex);
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    // 복사: 전역 인덱스 사용
    copyRow(globalIndex) {
      const newRow = { ...this.orders[globalIndex] };
      this.orders.splice(globalIndex + 1, 0, newRow);

      // 서버 저장 호출 (옵션)
      axios
        .post("http://15.165.125.244:8080/admin/api/order/save", newRow)
        .then(() => {
          alert("복사된 주문 저장 완료");
        })
        .catch((err) => {
          console.error(err);
          alert("복사 저장 중 오류 발생");
        });
    },

    // 특정 행 아래에 추가 (전역 인덱스 기준)
    addRowAfter(globalIndex) {
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
      this.orders.splice(globalIndex + 1, 0, newRow);

      axios
        .post("http://15.165.125.244:8080/admin/api/order/add", newRow)
        .then(() => {
          alert("새 주문 추가 완료");
        })
        .catch((err) => {
          console.error(err);
          alert("추가 중 오류 발생");
        });
    },

    // editRow은 로컬 인덱스(현재 페이지)를 받아 전역 인덱스로 변환하여 처리
    editRow(localIndex) {
      const globalIndex = this.getGlobalIndex(localIndex);

      if (this.editIndex === globalIndex) {
        // 저장 모드: 금액, 총결재금액 계산 후 서버 전송
        const target = this.orders[globalIndex];
        // 숫자 보장
        target.금액 = Number(target.수량 || 0) * Number(target.단가 || 0);
        target.총결재금액 = Number(target.금액 || 0) + Number(target.택배비 || 0);

        axios
          .post("http://15.165.125.244:8080/admin/api/order/modify", target)
          .then(() => {
            alert("주문 수정 완료");
            this.editIndex = null;
          })
          .catch((err) => {
            console.error(err);
            alert("수정 저장 중 오류 발생");
          });
      } else {
        // 편집 시작: editIndex에 전역 인덱스 저장
        this.editIndex = globalIndex;
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  font-size: 12px; /* 전체 글자 크기 통일 */
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* 테이블 기본 */
.order-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  word-wrap: break-word;
  white-space: normal;
  text-align: center;
}

/* 헤더 복구: 배경/글자/패딩/고정(선택적) */
.order-table thead th {
  background: #222;
  color: #fff;
  padding: 8px 6px;
  font-weight: 600;
  font-size: 12px;
  position: sticky;
  top: 0;
  z-index: 2;
}

/* 셀 스타일 */
.order-table td {
  border: 1px solid #e6e6e6;
  padding: 6px 4px;
  vertical-align: middle;
  font-size: 12px;
  line-height: 1.2;
}

/* 체크박스 칸 좁히기 */
.td-check,
.order-table th:first-child,
.order-table td:first-child {
  width: 34px;
  text-align: center;
  padding: 6px 2px;
}

/* 액션 칸 고정 폭 */
.th-action,
.td-action,
.order-table th:last-child,
.order-table td:last-child {
  width: 110px;
  text-align: center;
  padding: 6px 4px;
}

/* 입력창/텍스트영역 작게 */
.edit-input {
  width: 95%;
  padding: 4px 6px;
  margin: 2px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  box-sizing: border-box;
}

.edit-textarea {
  width: 95%;
  padding: 4px 6px;
  margin: 2px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 12px;
  box-sizing: border-box;
}

/* 액션 버튼 그룹 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
}

/* 아이콘 버튼 (작게) */
.btn {
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* 아이콘 고정 크기 (작게) */
.btn-icon {
  width: 26px;
  height: 26px;
  font-size: 14px;
  line-height: 1;
}

/* 버튼 색상 */
.btn-copy {
  background: #6c757d;
}
.btn-edit {
  background: #ffc107;
  color: #000;
}
.btn-add {
  background: #28a745;
}

/* 체크박스 크기 */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

/* 페이징 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
  font-size: 12px;
}

.pagination button {
  padding: 4px 8px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.pagination button:disabled {
  background: #ccc;
  cursor: default;
  color: #666;
}
</style>
