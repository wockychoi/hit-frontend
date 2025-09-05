<template>
    <div class="contact-form bg-dark text-white p-5">
      <h2 class="text-warning text-center mb-4">📩 제작 문의</h2>
      <form @submit.prevent="sendMessage">
        <div class="mb-3">
          <label class="form-label">이름</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">휴대폰 번호</label>
          <input v-model="form.phone" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">이메일 주소</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">문의 내용</label>
          <textarea v-model="form.message" class="form-control" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-warning">문의 보내기</button>
      </form>
      <p v-if="successMessage" class="mt-3 text-success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ContactForm",
    data() {
      return {
        form: {
          name: "",
          phone: "",
          email: "",
          message: ""
        },
        successMessage: ""
      };
    },
    methods: {
      async sendMessage() {
        alert("아직 기능이 작동하지 않습니다. \n 카카오톡 : nglemfk8 로 문의주세요.")
        /*
        try {
          await axios.post("http://localhost:5000/send-email", this.form);
          this.successMessage = "메일이 성공적으로 전송되었습니다!";
          this.form = { name: "", phone: "", email: "", message: "" };
        } catch (error) {
          alert("메일 전송 중 오류가 발생했습니다.");
          console.error(error);
        }
          */

      }
    }
  };
  </script>
  
  <style scoped>
  .contact-form {
    max-width: 600px;
    margin: auto;
  }
  </style>
  