<template>
  <div class="table-container">
    <h2>주문내역 관리</h2>
    <p>Total {{ filteredOrders.length }}건</p>

    <!-- ✅ 합계 박스 (오른쪽 상단) -->
    <div class="summary-box">
      <div class="summary-item">금액 합계 : <span>{{ totalProductAmount.toLocaleString() }}</span> 원</div>
      <div class="summary-item">택배비 합계 : <span>{{ totalShippingFee.toLocaleString() }}</span> 원</div>
      <div class="summary-item total">총 합계 : <span>{{ totalFinalAmount.toLocaleString() }}</span> 원</div>
    </div>

    <!-- 검색창 -->
    <div class="search-bar">
      <select v-model="searchField">
        <option value="shippingDate">출고일자</option>
        <option value="productName">상품명</option>
        <option value="ordererName">주문자</option>
        <option value="recPerson">수령자</option>
        <option value="orderSeq">주문번호</option>
        <option value="orderDate">주문일자</option>
      </select>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="검색어를 입력하세요"
      />
      <button @click="clearSearch">❌ 초기화</button>
    </div>

    <!-- 액션 버튼 -->
    <div class="global-actions">
      <button class="btn-add" @click="addOrder">➕ 추가</button>
      <button class="btn-copy" @click="copySelected">📑 복사</button>
      <button class="btn-save" @click="saveSelected">💾 선택 저장</button>
      <button class="btn-update" @click="updateSelected">✏️ 선택 수정</button>
      <button class="btn-delete" @click="deleteSelected">🗑️ 선택 삭제</button>
    </div>

    <!-- 테이블 -->
    <div class="table-wrapper">
      <table class="order-table">
        <thead>
          <tr>
            <th>선택</th>
            <th>출고일자</th>
            <th>택배사</th>
            <th>송장번호</th>
            <th>주문일자</th>
            <th>구분</th>
            <th>거래처명</th>
            <th>주문자</th>
            <th>수령자<br>상품고유번호</th>
            <th>휴대전화<br>상품명</th>
            <th>결제수단</th>
            <th>우편번호<br>수량</th>
            <th>단가</th>
            <th>금액</th>
            <th>택배비</th>
            <th>총결제금액</th>
            <th>배송지</th>
            <th>배송메세지</th>
            <th>관리자메모</th>
            <th v-if="editRow !== null">user_id</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, localIndex) in paginatedOrders"
            :key="order.orderSeq || getGlobalIndex(localIndex)"
          >
            <!-- 체크박스 -->
            <td>
              <input
                type="checkbox"
                v-model="selectedOrders"
                :value="getGlobalIndex(localIndex)"
              />
            </td>

            <!-- 수정 모드 적용 -->
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.shippingDate }}</span>
              <input v-else v-model="order.shippingDate" type="date" class="edit-input" />
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.courier }}</span>
              <input v-else v-model="order.courier" class="edit-input" />
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.trackingNo }}</span>
              <input v-else v-model="order.trackingNo" class="edit-input" />
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.orderDate }}</span>
              <input v-else v-model="order.orderDate" type="date" class="edit-input" />
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.orderType }}</span>
              <input v-else v-model="order.orderType" class="edit-input" />
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.customerName }}</span>
              <input v-else v-model="order.customerName" class="edit-input" />
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.ordererName }}</span>
              <input v-else v-model="order.ordererName" class="edit-input" />
            </td>

            <!-- 수령자 + 상품고유번호 -->
            <td>
              <div>
                <span v-if="editRow !== order.orderSeq">{{ maskName(order.recPerson) }}</span>
                <input v-else v-model="order.recPerson" class="edit-input" />
              </div>
              <div>
                <span v-if="editRow !== order.orderSeq">{{ order.productCode }}</span>
                <input v-else v-model="order.productCode" class="edit-input" />
              </div>
            </td>

            <!-- 휴대전화 + 상품명 -->
            <td>
              <div>
                <span v-if="editRow !== order.orderSeq">{{ maskPhone(order.phoneNumber) }}</span>
                <input v-else v-model="order.phoneNumber" class="edit-input" />
              </div>
              <div>
                <span v-if="editRow !== order.orderSeq">{{ order.productName }}</span>
                <input v-else v-model="order.productName" class="edit-input" />
              </div>
            </td>

            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.paymentMethod }}</span>
              <input v-else v-model="order.paymentMethod" class="edit-input" />
            </td>

            <!-- 우편번호 + 수량 -->
            <td>
              <div>
                <span v-if="editRow !== order.orderSeq">{{ order.postalCode }}</span>
                <input v-else v-model="order.postalCode" class="edit-input" />
              </div>
              <div>
                <span v-if="editRow !== order.orderSeq">{{ order.quantity }}</span>
                <input v-else v-model.number="order.quantity" type="number" class="edit-input" />
              </div>
            </td>

            <td>
              <span v-if="editRow !== order.orderSeq">{{ formatCurrency(order.unitPrice) }}</span>
              <input v-else v-model.number="order.unitPrice" type="number" class="edit-input" />
            </td>
            <td>{{ formatCurrency(order.quantity * order.unitPrice) }}</td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ formatCurrency(order.shippingFee) }}</span>
              <input v-else v-model.number="order.shippingFee" type="number" class="edit-input" />
            </td>
            <td>{{ formatCurrency((order.quantity * order.unitPrice) + (order.shippingFee || 0)) }}</td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.deliveryAddress }}</span>
              <textarea v-else v-model="order.deliveryAddress" class="edit-textarea"></textarea>
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.deliveryMessage }}</span>
              <textarea v-else v-model="order.deliveryMessage" class="edit-textarea"></textarea>
            </td>
            <td>
              <span v-if="editRow !== order.orderSeq">{{ order.adminMemo }}</span>
              <textarea v-else v-model="order.adminMemo" class="edit-textarea"></textarea>
            </td>

            <!-- user_id -->
            <td v-if="editRow === order.orderSeq">
              <input v-model="order.userId" class="edit-input" />
            </td>
            <td v-else-if="editRow !== null"></td>

            <!-- 작업 버튼 -->
            <td>
              <button v-if="editRow !== order.orderSeq" class="btn-update" @click="editRow = order.orderSeq">✏️ 수정</button>
              <button v-else class="btn-save" @click="saveRow(order)">💾 저장</button>
              <button v-if="editRow === order.orderSeq" class="btn-delete" @click="cancelEdit">취소</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 총 결제 금액 -->
    <div class="total-amount">
      총 결제 금액: {{ totalAmount.toLocaleString() }} 원
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
      currentPage: 1,
      pageSize: 10,
      selectedOrders: [],
      orders: [],
      searchQuery: "",
      searchField: "productName",
      editRow: null,
    };
  },
  computed: {
    filteredOrders() {
      if (!this.searchQuery) return this.orders;
      return this.orders.filter((order) => {
        const fieldValue = order[this.searchField];
        if (!fieldValue) return false;
        return String(fieldValue).toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredOrders.length / this.pageSize));
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredOrders.slice(start, start + this.pageSize);
    },
    totalAmount() {
      return this.filteredOrders.reduce(
        (sum, o) => sum + (o.quantity * o.unitPrice) + (o.shippingFee || 0),
        0
      );
    },
    // 합계 계산
    totalProductAmount() {
      return this.filteredOrders.reduce(
        (sum, o) => sum + (o.quantity * o.unitPrice),
        0
      );
    },
    totalShippingFee() {
      return this.filteredOrders.reduce(
        (sum, o) => sum + (o.shippingFee || 0),
        0
      );
    },
    totalFinalAmount() {
      return this.totalProductAmount + this.totalShippingFee;
    },
  },
  methods: {
    maskName(name) {
      if (!name) return "";
      if (name.length <= 2) return name[0] + "*".repeat(name.length - 1);
      return name.slice(0, -2) + "**";
    },
    maskPhone(phone) {
      if (!phone) return "";
      if (phone.length <= 4) return "*".repeat(phone.length);
      return phone.slice(0, -4) + "****";
    },
    formatCurrency(value) {
      if (value == null) return "0";
      return Number(value).toLocaleString();
    },
    async fetchOrders() {
      try {
        const res = await axios.get("http://localhost:8080/admin/api/order/list");
        this.orders = res.data;
      } catch (err) {
        console.error(err);
        alert("주문 목록을 불러오는 중 오류 발생");
      }
    },
    clearSearch() {
      this.searchQuery = "";
      this.currentPage = 1;
    },
    getGlobalIndex(localIndex) {
      return localIndex + (this.currentPage - 1) * this.pageSize;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    getSelectedOrders() {
      return this.selectedOrders.map((i) => this.filteredOrders[i]);
    },
    addOrder() {
      const newOrder = {
        orderSeq: Date.now(),
        user_id: "", // 신규 추가 시 user_id 필드 포함
        shippingDate: "",
        courier: "",
        trackingNo: "",
        orderDate: "",
        orderType: "",
        customerName: "",
        ordererName: "",
        recPerson: "",
        productCode: "",
        phoneNumber: "",
        productName: "",
        paymentMethod: "",
        postalCode: "",
        quantity: 1,
        unitPrice: 0,
        shippingFee: 0,
        deliveryMessage: "",
        adminMemo: "",
        deliveryAddress: "",
      };
      this.orders.unshift(newOrder);
      this.editRow = newOrder.orderSeq;
    },
    copySelected() {
      const selected = this.getSelectedOrders();
      selected.forEach((o) => {
        const copy = { ...o, orderSeq: Date.now() + Math.random() };
        this.orders.unshift(copy);
        this.editRow = copy.orderSeq;
      });
    },
    async saveSelected() {
      const selected = this.getSelectedOrders();
      if (!selected.length) {
        alert("선택된 주문이 없습니다.");
        return;
      }
      try {
        await axios.post("http://localhost:8080/admin/api/order/save", selected);
        alert("선택 주문 저장 완료");
        this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert("저장 중 오류 발생");
      }
    },
    async updateSelected() {
      const selected = this.getSelectedOrders();
      if (!selected.length) {
        alert("선택된 주문이 없습니다.");
        return;
      }
      try {
        await axios.post("http://localhost:8080/admin/api/order/update", selected);
        alert("선택 주문 수정 완료");
        this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert("수정 중 오류 발생");
      }
    },
    async deleteSelected() {
      const selected = this.getSelectedOrders();
      if (!selected.length) {
        alert("선택된 주문이 없습니다.");
        return;
      }
      if (!confirm("정말 삭제하시겠습니까?")) return;

      const orderSeqList = selected.map((o) => o.orderSeq);

      try {
        await axios.post("http://localhost:8080/admin/api/order/delete", orderSeqList);
        alert("선택 주문 삭제 완료");
        this.fetchOrders();
        this.selectedOrders = [];
      } catch (err) {
        console.error(err);
        alert("삭제 중 오류 발생");
      }
    },
    async saveRow(order) {
      try {
        await axios.post("http://localhost:8080/admin/api/order/update", [order]);
        alert("주문이 수정되었습니다.");
        this.editRow = null;
        this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert("수정 중 오류 발생");
      }
    },
    cancelEdit() {
      this.editRow = null;
      this.fetchOrders();
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  margin: 10px auto;
  padding: 5px;
  background: #fff;
  border-radius: 8px;
  font-size: 11px;
  position: relative;
}
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}
.order-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 11px;
}
.order-table th {
  background: #333;
  color: #fff;
  padding: 4px;
  border: 1px solid #555;
}
.order-table td {
  border: 1px solid #ddd;
  padding: 3px;
}
.order-table tbody tr:nth-child(odd) {
  background: #fafafa;
}
.order-table tbody tr:nth-child(even) {
  background: #f0f0f0;
}
.edit-input {
  width: 90%;
  font-size: 11px;
  padding: 2px;
}
.edit-textarea {
  width: 90%;
  font-size: 11px;
  padding: 2px;
  height: 30px;
}
.global-actions {
  margin-bottom: 8px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.global-actions button {
  padding: 4px 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}
.btn-add { background: #28a745; color: #fff; }
.btn-copy { background: #6f42c1; color: #fff; }
.btn-save { background: #007bff; color: #fff; }
.btn-update { background: #fd7e14; color: #fff; }
.btn-delete { background: #dc3545; color: #fff; }
.pagination {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
}
.search-bar {
  margin-bottom: 8px;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 11px;
}
.search-bar input,
.search-bar select {
  padding: 2px 4px;
  font-size: 11px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-bar button {
  padding: 2px 6px;
  font-size: 11px;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.total-amount {
  margin-top: 10px;
  font-weight: bold;
  font-size: 12px;
  text-align: right;
}

/* ✅ 합계 박스 스타일 */
.summary-box {
  margin-top:30px;
  margin-right:15px;
  position: absolute;
  top: 0;
  right: 0;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 17px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: right;
}
.summary-box .summary-item {
  margin-bottom: 4px;
}
.summary-box .summary-item span {
  font-weight: bold;
  color: #333;
}
.summary-box .total {
  font-weight: bold;
  color: #007bff;
}
</style>
