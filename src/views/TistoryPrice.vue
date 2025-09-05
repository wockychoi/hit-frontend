<template>
  <div class="page-container">
    <div class="price-box">
      <h2 class="title">
        💳 티스토리 요금제<br />
        문의 (KAKAO Talk): nglemfk8
      </h2>

      <div class="plan-list">
        <div class="plan-card" v-for="plan in plans" :key="plan.amount">
          <h3>{{ plan.title }}</h3>
          <p class="amount">{{ formatCurrency2(plan.amount) }} 충전</p>
          <p class="bonus">보너스 {{ plan.bonus }}%</p>
          <p class="total">총 {{ formatCurrency(plan.total) }} 지급</p>
          <button class="btn-select" @click="selectPlan(plan)">요금제 선택</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const plans = ref([
  {
    title: '스타터 요금제',
    amount: 10000,
    bonus: 0,
    get total() {
      return this.amount + Math.floor(this.amount * this.bonus / 100)
    }
  },
  {
    title: '베이직 요금제',
    amount: 30000,
    bonus: 5,
    get total() {
      return this.amount + Math.floor(this.amount * this.bonus / 100)
    }
  },
  {
    title: '스탠다드 요금제',
    amount: 50000,
    bonus: 10,
    get total() {
      return this.amount + Math.floor(this.amount * this.bonus / 100)
    }
  },
  {
    title: '프리미엄 요금제',
    amount: 100000,
    bonus: 20,
    get total() {
      return this.amount + Math.floor(this.amount * this.bonus / 100)
    }
  }
])

const formatCurrency = (val) => val.toLocaleString('ko-KR') + ' 포인트'
const formatCurrency2 = (val) => val.toLocaleString('ko-KR') + '원'

const selectPlan = (plan) => {
  alert(`✅ 선택된 요금제: ${formatCurrency2(plan.amount)} (보너스 ${plan.bonus}% 포함 총 ${formatCurrency(plan.total)})`)
}
</script>

<style scoped>
.page-container {
  background-color: white;
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.price-box {
  background-color: #1e1e1e;
  padding: 40px 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
  color: #ffcc33;
}

.plan-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.plan-card {
  background-color: #2c2c2c;
  border-radius: 12px;
  padding: 24px;
  width: calc(25% - 24px);
  min-width: 250px;
  max-width: 220px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}
.plan-card:hover {
  transform: translateY(-5px);
}

.amount {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.bonus {
  color: #00e676;
  margin: 8px 0;
  font-size: 16px;
}

.total {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 16px;
}

.btn-select {
  background-color: #f8b500;
  border: none;
  color: #000;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}
.btn-select:hover {
  background-color: #ffcc33;
}

@media (max-width: 1024px) {
  .plan-card {
    width: calc(50% - 24px);
  }
}

@media (max-width: 600px) {
  .plan-card {
    width: 100%;
  }
}
</style>
