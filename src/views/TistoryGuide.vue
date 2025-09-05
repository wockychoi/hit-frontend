<template>
  <section class="guide-section px-4 py-5">
    <!-- 제목 -->
    <h2 class="main-title">📌 티스토리 자동 포스팅 사용 가이드</h2>
    <p class="sub-hook">
      초보 사용자도 쉽게 따라 할 수 있도록 제작된 가이드입니다.  
      아래 동영상을 먼저 시청하고, 단계별 설명을 확인하세요.
    </p>

    <!-- 유튜브 영상 -->
    <div class="video-wrapper">
      <iframe
        width="100%"
        height="450"
        src="https://www.youtube.com/embed/5XKBkhjeJww"
        title="티스토리 자동 포스팅 - 아이디 키값 전송 방법"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 1단계 -->
    <div class="step-block">
      <h3 class="section-title">1️⃣ 아이디 키값 전송</h3>
      <ol class="step-list">
        <li>아래 <b>EXE 파일</b>을 다운로드 후 실행합니다.</li>
        <li><b>Site ID</b>에는 사이트 ID를 입력하고, ID/PWD에는 티스토리 로그인 정보를 입력합니다.</li>
        <li><b>로그인</b> 버튼을 클릭하여 자동 로그인 여부를 확인합니다.</li>
        <li>로그인 완료 시 웹사이트 창이 닫히고, <b>Key값</b> 창에 값이 표시됩니다.</li>
        <li>값이 나오면 <b>'전송하기'</b> 버튼을 클릭하여 키값을 서버로 전송합니다.</li>
      </ol>
    </div>

    <!-- 두번째 유튜브 영상 -->
    <div class="video-wrapper">
      <iframe
        width="100%"
        height="450"
        src="https://www.youtube.com/embed/7YEPjj1DQDM"
        title="티스토리 자동 포스팅 방법"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 2단계 -->
    <div class="step-block">
      <h3 class="section-title">2️⃣ 티스토리 자동 포스팅</h3>
      <ol class="step-list">
        <li>사이트에 접속하여 <b>로그인</b>합니다.</li>
        <li><b>티스토리 &gt; 티스토리 자동 발행</b> 메뉴로 이동합니다.</li>
        <li>폼을 입력합니다.
          <ul class="sub-list">
            <li><b>블로그 주소</b> : 티스토리 주소 입력</li>
            <li><b>사용할 가게 수</b> : 포스팅할 가게 수</li>
            <li><b>등록될 제목</b> : 입력한 제목 + 가게명 (지역명) 자동 표시</li>
            <li><b>검색 키워드</b> : 예) "왕십리 맛집" → 해당 키워드로 검색</li>
            <li><b>태그</b> : 예) 왕십리, 왕십리맛집, 왕십리맛집후기</li>
            <li><b>블로그 인사말</b> : 문서 상단에 표시될 문구</li>
          </ul>
        </li>
        <li><b>리뷰 수집</b> 버튼 클릭 → 수집된 리뷰가 하단에 표시됩니다.</li>
        <li><b>글 등록</b> 버튼 클릭 → 자동 포스팅 완료!</li>
      </ol>
    </div>

    <!-- 하단 버튼 -->
    <div class="btn-group">
      <button class="cta-btn start" @click="goToStart">🚀 바로 사용하기</button>
      <button class="cta-btn guide" @click="downloadExe">💾 EXE 다운로드</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "TistoryGuide",
  methods: {
    goToStart() {
      this.$router.push("/tistoryce");
    },
    goToReview() {
      this.$router.push("/tistoryreview");
    },
    downloadExe() {
      // 파일 다운로드 실행
      const link = document.createElement("a");
      link.href = "/programlist/download/tistoryKey.zip";
      link.setAttribute("download", "tistoryKey.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style scoped>
.guide-section {
  background-color: #121212; /* 후기 페이지 스타일 */
  color: #fff;
  max-width: 1100px;
  margin: auto;
  border-radius: 12px;
}

.main-title {
  font-size: 2rem;
  font-weight: bold;
  color: #ffc107; /* 노란 포인트 */
  text-align: center;
  margin-bottom: 1.5rem;
}

.sub-hook {
  font-size: 1.1rem;
  color: #ddd;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.video-wrapper {
  margin-bottom: 2rem;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffc107;
  margin-bottom: 1rem;
}

.step-list {
  list-style: decimal;
  padding-left: 1.2rem;
  line-height: 1.85;
}

.sub-list {
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
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

.cta-btn.start {
  background-color: #ffc107;
  color: #121212;
}

.cta-btn.guide {
  background-color: #6c757d;
  color: #fff;
}

.cta-btn.start:hover {
  background-color: #ffca2c;
}

.cta-btn.guide:hover {
  background-color: #5a6268;
}
</style>
