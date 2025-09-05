<template>
  <div class="container bg-dark text-white p-5">
    <h2 class="text-warning text-center mb-4">📌 티스토리 로그인</h2>

    <!-- 공통 로딩 스피너 -->
    <div v-if="isLoading" class="text-center my-4">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="mt-2">{{ loadingMessage }}</div>
    </div>

    <div class="row" :class="{ 'opacity-50': isLoading }">
      <!-- 왼쪽: 로그인 폼 -->
      <div class="col-md-6 border-end">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">아이디</label>
            <input v-model="userId" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">비밀번호</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-warning w-100" :disabled="isLoading">
            {{ isLoading && loadingMessage === "로그인 중..." ? "로그인 중..." : "로그인" }}
          </button>

          <div v-if="responseMessage" class="mt-3 text-success">
            {{ responseMessage }}
          </div>
          <div v-if="errorMessage" class="mt-3 text-danger">
            {{ errorMessage }}
          </div>

          <!-- 크롤링 버튼 -->
          <div class="mt-4" style="display: none;">
            <button @click="handleCrawling" class="btn btn-primary w-100" :disabled="isLoading">
              {{ isLoading && loadingMessage === "리뷰 수집 중..." ? "수집 중..." : "네이버 플레이스 리뷰 수집" }}
            </button>
          </div>
        </form>
      </div>

      <!-- 오른쪽: 글쓰기 및 설정 -->
      <div class="col-md-6 ps-4">
        <div style="display: none;">
          <label class="form-label">크롤링 사이트 선택</label>
          <select v-model="selectedCrawler" class="form-select">
            <option disabled value="">사이트를 선택하세요</option>
            <option value="dcinside">DC인사이드</option>
            <option value="naverplace" selected>네이버 플레이스</option>
          </select>
          <ul v-if="selectedCrawler" class="mt-3">
            <li v-for="(item, index) in sampleData[selectedCrawler]" :key="index">{{ item }}</li>
          </ul>
        </div>

        <div class="mt-3">
          <label class="form-label">사용할 가게 수</label>
          <input v-model.number="shopCount" type="number" class="form-control" />
        </div>

        <div class="mt-3">
          <label class="form-label">등록될 제목</label>
          <input v-model="title" type="text" class="form-control" />
        </div>

        <div class="mt-3">
          <label class="form-label">검색 키워드</label>
          <input v-model="keyword" type="text" class="form-control" />
        </div>

        <div class="mt-3">
          <label class="form-label">태그</label>
          <input v-model="tag" type="text" class="form-control" />
        </div>

        <div class="mt-3">
          <label class="form-label">블로그 인사말</label>
          <textarea v-model="blogSayHello" type="text" class="form-control" />
        </div>

        <div class="mt-3">
          <label class="form-label">카테고리</label>
          <select v-model="category" class="form-select">
            <option value="none">GPT없음</option>
            <option value="gpt">GPT자동포스팅</option>
          </select>
        </div>

        <div class="form-check mt-3">
          <input v-model="removeAds" class="form-check-input" type="checkbox" id="adsCheck">
          <label class="form-check-label" for="adsCheck">하단 광고 제거 (5포인트)</label>
        </div>

        <div class="form-check mt-2 mb-4">
          <input v-model="createToc" class="form-check-input" type="checkbox" id="tocCheck">
          <label class="form-check-label" for="tocCheck">목차 생성 (5포인트)</label>
        </div>

        <button @click="handlePosting" class="btn btn-success w-100" :disabled="isLoading" style="display: none;">
          {{ isLoading && loadingMessage === "글 등록 중..." ? "등록 중..." : "티스토리 글 등록 테스트" }}
        </button>
        <button @click="handleCrawling" class="btn btn-primary w-100" :disabled="isLoading">
              {{ isLoading && loadingMessage === "리뷰 수집 중..." ? "수집 중..." : "네이버 플레이스 리뷰 수집" }}
            </button>
        <button @click="handlePostingFromResults" class="btn btn-warning w-100 mt-2" :disabled="isLoading">
          {{ isLoading && loadingMessage === "수집된 리뷰 글 등록 중..." ? "등록 중..." : "📝 수집한 리뷰 이미지로 글 등록( 50 포인트)" }}
        </button>
      </div>
    </div>

    <!-- 작업 히스토리 로그 -->
    <div class="mt-5">
      <h5 class="text-light">📢 작업 상태 기록</h5>
      <ul class="list-group small">
        <li v-for="(log, index) in historyLogs" :key="index" class="list-group-item py-1" v-html="log"></li>
      </ul>
    </div>

    <!-- 수집된 리뷰 표시 -->
    <div class="mt-5">
      <h4 class="text-info mb-3">📦 수집된 네이버 플레이스 리뷰</h4>

      <div v-if="results.length === 0" class="text-muted">아직 수집된 데이터가 없습니다.</div>

      <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="(place, index) in results" :key="index" class="col">
          <div class="card h-100 text-dark">
            <div class="card-body">
              <h5 class="card-title">{{ place.placeName }}</h5>
              <p class="card-text">
                <strong>ID:</strong> {{ place.placeId }}<br />
                <strong>주소:</strong> {{ place.address || place.roadAddress }}
              </p>
              <hr />
              <h6>📝 리뷰 목록</h6>
              <div v-for="(review, rIdx) in place.reviews" :key="rIdx" class="mb-3">
                <p class="mb-1">📄 {{ review.body }}</p>
                <div v-if="review.imageUrls.length > 0">
                  <img
                    v-for="(img, iIdx) in review.imageUrls"
                    :key="iIdx"
                    :src="img.url"
                    class="img-fluid rounded me-2 mb-1"
                    style="max-width: 100px;"
                    alt="리뷰 이미지"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axiosInstance'  // 토큰 자동 포함된 axios 사용 권장
import { useAuthStore } from '../store/auth'

export default {
  name: "TistoryLogin",
  data() {
    return {
      userId: "",
      password: "",
      responseMessage: "",
      errorMessage: "",
      selectedCrawler: "",
      shopCount: 10,
      reviewCount: 15,
      keyword: "왕십리 맛집",
      title: "",
      tag: "",
      category: "none",
      removeAds: false,
      createToc: false,
      results: [],
      isLoading: false,
      loadingMessage: "",
      historyLogs: [],
      sampleData: {
        dcinside: ["DC 갤 제목1", "DC 갤 제목2", "샘플 글입니다"],
        naverplace: ["강남역 맛집", "홍대 인기카페", "망원동 핫플"]
      }
    };
  },
  methods: {
    addHistoryLog(msg) {
      const time = new Date().toLocaleTimeString();
      this.historyLogs.unshift(`[${time}] ${msg}`);
    },

    async handleLogin() {
      this.responseMessage = "";
      this.errorMessage = "";
      this.loadingMessage = "로그인 중...";
      this.isLoading = true;

      try {
        const res = await axios.post("http://15.165.125.244:8080/admin/api/user/tistoryLogin", {
          userId: this.userId,
          password: this.password,
        });

        const data = res.data;
        if (data.status === "로그인성공" && data.cookies) {
          for (const [key, value] of Object.entries(data.cookies)) {
            localStorage.setItem(`tistory_cookie_${key}`, value);
          }
          this.responseMessage = "로그인 성공! 쿠키 저장 완료.";
          this.addHistoryLog("✅ 로그인 완료 (쿠키 저장됨)");
          this.addHistoryLog("✅ 사용할 가게 수, 등록될 제목, 검색 키워드, 태그 입력 후 리뷰 수집을 해주세요.");
        } else {
          this.errorMessage = "로그인 실패: 응답값이 예상과 다릅니다.";
        }
      } catch (error) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          alert("로그인 후 이용해주세요.");
          //this.$router.push("/login");
        } else {
          this.errorMessage = "포스팅 실패: " + err.message;
          this.addHistoryLog("❌ 리뷰 포스팅 실패");
          console.error(err);
        }
      } finally {
        this.isLoading = false;
      }
    },

    async handleCrawling() {
      this.loadingMessage = "리뷰 수집 중...";
      this.isLoading = true;
      this.results = [];

      try {
        const res = await axios.post("http://15.165.125.244:8080/admin/api/user/nplaceReview", {
          placeCount: this.shopCount,
          searchQuery: this.keyword,       
          reviewCount: this.reviewCount
        });

        this.results = res.data;
        this.addHistoryLog(`✅ 리뷰 수집 완료 (${this.results.length}곳)`);
      } catch (error) {
        console.error("크롤링 실패:", error);
        this.addHistoryLog("❌ 리뷰 수집 실패");
      } finally {
        this.isLoading = false;
      }
    },
    async handlePostingFromResults() {
      this.responseMessage = "";
      this.errorMessage = "";
      this.loadingMessage = "수집된 리뷰 글 등록 중...";
      this.isLoading = true;

      try {
        // 쿠키 조합
        const cookieKeys = ["_T_ANO", "__T_SECURE", "TSSESSION", "__T_", "TOP-XSRF-TOKEN", "IS_TC"];
        const cookies = cookieKeys
          .map(key => `${key}=${localStorage.getItem(`tistory_cookie_${key}`)}`)
          .filter(pair => pair.includes("=") && !pair.endsWith("=null"))
          .join("; ");

        // 📌 여기서 전체 results를 그대로 전달
        const res = await axios.post(
          //"http://15.165.125.244:8080/admin/api/user/tistoryPost",
          "http://localhost:8080/admin/api/user/tistoryPost",
          {
            places: this.results,
            title: this.title,
            tag: this.tag,
            blogSayHello: this.blogSayHello,
            placeCount: this.shopCount
          },
          {
            headers: {
              "X-Tistory-Cookie": cookies
            }
          }
        );

        if (Array.isArray(res.data)) {
          res.data.forEach(entry => {
            const match = entry.match(/등록 성공: (.+)$/);
            if (match) {
              const entryJson = JSON.parse(match[1]);
              const url = entryJson.entryUrl;
              const nameMatch = entry.match(/✅ \[(.*?)\]/);
              const placeName = nameMatch ? nameMatch[1] : "포스팅";

              this.addHistoryLog(`✅ [${placeName}] 등록 성공: <a href="${url}" target="_blank">${url}</a>`);
            } else {
              this.addHistoryLog(`✅ ${entry}`);
            }
          });
        } else {
          this.addHistoryLog(`✅ 포스팅 성공: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        this.errorMessage = "포스팅 실패: " + err.message;
        this.addHistoryLog("❌ 리뷰 포스팅 실패");
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  border-radius: 10px;
}
.border-end {
  border-right: 1px solid #666;
}
.card {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
}
</style>
