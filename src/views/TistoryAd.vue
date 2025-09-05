<template>
  <section class="tistory-auto-posting px-4 py-5">
    <!-- 상단 제목 -->
    <h1 class="text-center main-title">📝 티스토리 자동 포스팅, 직접 써본 리얼 후기</h1>
    
    <!-- 서브 타이틀 -->
    <p class="sub-hook text-center">
      “글 쓰는 시간조차 아껴주는 똑똑한 블로그 운영 비결”  
      하루 종일 손가락 한 번 까딱 안 해도 매일 포스팅이 올라갑니다.
    </p>

    <!-- 블로그 스타일 본문 -->
    <div class="blog-content">
      <p>
        안녕하세요, 워기입니다 😊  
        티스토리 블로그를 운영하면서 가장 힘들었던 건 <strong>매일 글을 꾸준히 올리는 것</strong>이었습니다.
        소재 찾기, 글 작성, 이미지 편집… 정말 시간이 많이 들죠.
      </p>

      <p>
        그러던 중 알게 된 게 바로 <span class="highlight">티스토리 자동 포스팅 시스템</span>입니다.
        처음에는 ‘이게 진짜 가능해?’ 싶었지만,  
        직접 써보니 제 블로그 운영 방식이 완전히 바뀌었습니다.
      </p>

      <p>
        하루 종일 다른 일을 하면서도  
        <strong>정해진 시간에 포스팅이 자동 발행</strong>되고,  
        키워드에 맞춰 최적화된 글이 꾸준히 올라가니  
        방문자와 검색 노출이 자연스럽게 늘었습니다.
      </p>

      <h3 class="section-title">💡 티스토리 자동 포스팅, 이런 분께 강력 추천!</h3>
      <ul class="benefit-list">
        <li>📌 매일 글 쓰기가 부담스러운 분</li>
        <li>📌 블로그를 여러 개 운영하는 분</li>
        <li>📌 수익형 블로그를 단기간에 성장시키고 싶은 분</li>
        <li>📌 꾸준한 검색 노출로 장기 트래픽을 만들고 싶은 분</li>
      </ul>

      <p>
        저는 이 기능 덕분에  
        블로그 운영에 들이던 시간을 절반 이상 줄이고도  
        방문자와 수익은 오히려 늘었습니다.
      </p>

      <p>
        블로그는 결국 ‘꾸준함’이 승부인데,  
        <strong>자동 포스팅은 꾸준함을 완벽하게 유지</strong>하게 해줍니다.  
        직접 해보시면, 그 차이를 바로 느끼실 거예요.
      </p>
    </div>

    <!-- CTA 버튼 2개 -->
    <div class="text-center my-5 btn-group">
      <button class="cta-btn guide" @click="goToGuide">📖 사용 가이드 보기</button>
      <button class="cta-btn start" @click="goToStart">🚀 바로 사용하기</button>
    </div>

    <!-- 후기 이미지 섹션 -->
    <div class="review-header">
      <h3 class="sub-title">📷 사용자 후기</h3>
      <button class="more-review-btn" @click="goToReview">후기 더 보기 ➜</button>
    </div>

    <div class="thumbnail-grid">
      <div
        v-for="(image, index) in reviewImages"
        :key="index"
        class="thumb"
      >
        <img :src="image.src" :alt="image.title" />
        <p class="title">{{ image.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TistoryAutoPosting",
  data() {
    return {
      reviewImages: [
        { title: "후기 이미지 #1", src: "/programlist/adsense/tistory_ad1.png" },
        { title: "후기 이미지 #2", src: "/programlist/adsense/tistory_ad2.png" },
        { title: "후기 이미지 #3", src: "/programlist/adsense/tistory_ad3.png" }
      ]
    };
  },
  methods: {
    goToGuide() {
      this.$router.push("/tistoryGuide");
    },
    goToStart() {
      this.$router.push("/tistoryce");
    },
    goToReview() {
      this.$router.push("/tistoryreview");
    }
  }
};
</script>

<style scoped>
.tistory-auto-posting {
  background-color: #121212;
  color: #fff;
  max-width: 1100px;
  margin: auto;
}
.main-title {
  font-size: 2rem;
  font-weight: bold;
  color: #ffc107;
}
.sub-hook {
  font-size: 1.1rem;
  color: #ddd;
  margin-bottom: 2rem;
}
.blog-content {
  font-size: 1rem;
  line-height: 1.8;
}
.highlight {
  background-color: #fff3cd;
  color: #121212;
  padding: 2px 4px;
  border-radius: 4px;
}
.section-title {
  margin-top: 2rem;
  font-size: 1.3rem;
  color: #ffc107;
}
.benefit-list {
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;
}
.benefit-list li {
  margin-bottom: 0.5rem;
}
.btn-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.cta-btn {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.cta-btn.guide {
  background-color: #6c757d;
  color: #fff;
}
.cta-btn.start {
  background-color: #ffc107;
  color: #121212;
}
.cta-btn.guide:hover {
  background-color: #5a6268;
}
.cta-btn.start:hover {
  background-color: #ffca2c;
}
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
}
.sub-title {
  font-size: 1.5rem;
  color: #ffc107;
}
.more-review-btn {
  background: none;
  border: none;
  color: #ffc107;
  font-size: 1rem;
  cursor: pointer;
}
.more-review-btn:hover {
  text-decoration: underline;
}
.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.thumb {
  text-align: center;
}
.thumb img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.3);
}
.title {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #fff;
}
</style>
