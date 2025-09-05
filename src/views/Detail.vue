<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <router-link class="navbar-brand" to="/">My Shop</router-link>
      </div>
    </nav>

    <!-- Product Detail -->
    <section class="py-5" v-if="product">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5">
          <div class="col-12 text-center mb-4">
            <img class="img-fluid" :src="product.image" alt="Product Image" />
          </div>
          <div class="col-12 text-center">
            <h1 class="display-5 fw-bolder">{{ product.title }}</h1>
            <div class="fs-5 mb-5">
              <span class="text-decoration-line-through" v-if="product.originalPrice">{{ product.originalPrice }}</span>
              <span>{{ product.price }}</span>
            </div>
            <p class="lead" v-html="product.description"></p>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-outline-warning" @click="kakaoOpen">
                프로그램 제작 문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Not Found -->
    <section v-else class="py-5">
      <div class="container text-center">
        <h2>Product not found.</h2>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-5 bg-dark mt-5">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Your Website 2025</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      products: {
        1: {
          title: '티스토리 자동포스팅 프로그램',
          description: `
            <p><strong>티스토리 자동포스팅 프로그램</strong>은 <span style="color:red;">키워드 기반</span>으로 자동 글 등록이 가능한 프로그램입니다.</p>
            <p>✅ 프로그램 소개</p>
            <p>✔️ 1. 원하는 정보를 '자동 크롤링'</p>
            <p>인터넷 상의 양질의 콘텐츠를 지정한 키워드에 맞춰 자동 수집합니다.</p>
            <p>예: 트렌드 뉴스, IT 정보, 건강 팁 등 주제 선택 가능</p>
            <p>✔️ 2. '자동 포스팅' 버튼 한 번이면 끝</p>
            <p>제목, 본문, 태그까지 자동 세팅되어 검색 유입 증가</p>
            <p>✔️ 3. 애드센스와 연결해 수익화</p>
            <p>광고 수익 자동 발생 구조 가능</p>
            <p>💡 이런 분께 추천:</p>
            <p>📌 글쓰기 시간 0분, 하루 3분 자동 업로드</p>
            <p>📌 애드센스 승인까지 자동화</p>
            <p>📌 추가 수익 창출 가능</p>
            <p>🎯 핵심: 질 좋은 자동 콘텐츠 + 꾸준한 유입 설계</p>
            <p>✅ 수익 예시</p>
            <img src="/programlist/tistory/tistory_ad.png" style="width:100%; height:300px" />
            <p>📺 구동 영상</p>
            <iframe width="100%" height="315" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
            <p>✅ 프로그램 사용방법</p>
            <p>✔️ 계정 입력 → 키워드 입력 → 수집 → 글쓰기</p>
          `,
          image: '/programlist/tistory/tistory_main.png',
          price: '40,000원',
          originalPrice: '80,000원'
        },
        2: {
          title: '카카오톡 채팅 봇',
          description: `
            <p><strong>카카오톡 채팅 자동화 프로그램</strong>은 지정된 메시지를 설정된 시간 간격으로 특정 채팅방에 자동 발송해주는 프로그램입니다.</p>
            <p>✅ 주요 기능</p>
            <p>✔️ 원하는 시간에 원하는 메시지를 자동 전송</p>
            <p>✔️ 여러 채팅방 동시 지원</p>
            <p>✔️ 반복 주기 설정, 다중 메시지 큐잉</p>
            <p>💬 예: 고객 응대, 예약 확인, 광고 문구 자동 전달</p>
            <p>🎯 활용 사례</p>
            <p>📌 소상공인의 고객안내 자동화</p>
            <p>📌 단체방 알림 메시지 반복 전송</p>
            <p>📌 고객센터 자동 응답</p>
            <p>⚙️ 작동 방식: 사전 등록 → 메시지 큐 세팅 → 전송 시작</p>
            <p>📺 프로그램 시연 영상 및 사용 가이드 제공</p>
          `,
          image: '/programlist/kakao/kakaobot_home.png',
          price: '10,000원(30일)',
          originalPrice: ''
        },
        3: {
          title: '블로그 댓글 매크로',
          description: `
            <p><strong>블로그 댓글 자동 등록 프로그램</strong>은 타겟 블로그에 빠르게 댓글을 작성해주는 홍보용 매크로입니다.</p>
            <p>✅ 기능 설명</p>
            <p>✔️ 신규 포스트 실시간 감지</p>
            <p>✔️ 사전 등록한 문구 자동 작성</p>
            <p>✔️ 댓글 순번 유지, 반복 댓글 방지 기능 포함</p>
            <p>🎯 마케팅 활용 예시</p>
            <p>📌 네이버 블로그 신규글 댓글 자동 작성</p>
            <p>📌 블로그 체험단/홍보용 댓글 자동화</p>
            <p>💡 고급 옵션: 댓글 회전 DB, 랜덤 시간 설정</p>
            <p>📺 데모 영상 및 설치법 제공</p>
          `,
          image: '/programlist/blog/blog_home.png',
          price: '20,000원(30일)',
          originalPrice: ''
        },
        4: {
          title: '카페 댓글 매크로',
          description: `
            <p><strong>카페 댓글 매크로</strong>는 주요 커뮤니티(네이버 카페 등)에 반복적으로 댓글을 등록해주는 자동화 도구입니다.</p>
            <p>✅ 기능 구성</p>
            <p>✔️ 특정 게시글에 자동 댓글 작성</p>
            <p>✔️ 댓글 리스트 DB 회전 기능 포함</p>
            <p>✔️ IP 우회, 시간 랜덤 조절 기능</p>
            <p>💡 활용 예</p>
            <p>📌 카페 홍보 댓글 자동 삽입</p>
            <p>📌 이벤트 댓글 대량 등록</p>
            <p>📌 광고 효과 극대화</p>
            <p>⚙️ 설정: 카페 URL → 댓글 템플릿 → 실행</p>
            <p>📺 실전 사용 영상 및 매뉴얼 포함</p>
          `,
          image: '/programlist/cafe/cafe_comment.png',
          price: '20,000원(30일)',
          originalPrice: ''
        },
        5: {
          title: '밴드 댓글 매크로',
          description: `
            <p><strong>밴드 댓글 자동 등록 프로그램</strong>은 밴드(BAND) 게시글에 댓글을 반복 작성하여 노출을 극대화합니다.</p>
            <p>✅ 특징</p>
            <p>✔️ 신규 게시물 실시간 감지</p>
            <p>✔️ 댓글 DB 랜덤 회전</p>
            <p>✔️ 멀티 밴드 지원</p>
            <p>🎯 마케팅 사례</p>
            <p>📌 자사 제품 홍보용 댓글 삽입</p>
            <p>📌 커뮤니티 기반 노출 극대화</p>
            <p>📺 간단한 설정 후 즉시 사용 가능</p>
          `,
          image: '/programlist/band/band_comment.png',
          price: '30,000원(30일)',
          originalPrice: ''
        },
        6: {
          title: '밴드 댓글 매크로(막힘→허용)',
          description: `
            <p><strong>밴드 막힘 해제용 댓글 매크로</strong>는 막힌 게시판에도 자동으로 댓글을 작성할 수 있도록 우회 기능을 포함한 고급 버전입니다.</p>
            <p>✅ 차별점</p>
            <p>✔️ 막힌 글에도 댓글 우회 등록</p>
            <p>✔️ 허용 설정 감지 기능</p>
            <p>✔️ 사용자 맞춤 커스텀 대응</p>
            <p>⚙️ 고급 운영자 대상 기능 제공</p>
            <p>📺 실습 영상 포함</p>
          `,
          image: '/programlist/band/band_unblock.png',
          price: '30,000원(30일)',
          originalPrice: ''
        },
        7: {
          title: '블로그 추출기',
          description: `
            <p><strong>블로그 추출 프로그램</strong>은 네이버 블로그 내에서 키워드 기반으로 게시글 목록 및 링크를 추출합니다.</p>
            <p>✅ 기능</p>
            <p>✔️ 특정 키워드로 블로그 검색 결과 크롤링</p>
            <p>✔️ 글 제목, 링크, 작성자 추출</p>
            <p>✔️ CSV 다운로드 지원</p>
            <p>📌 분석/마케팅용 데이터 확보에 최적화</p>
            <p>📺 실시간 추출 영상 포함</p>
          `,
          image: '/programlist/blog/blog_extract.png',
          price: '30,000원(30일)',
          originalPrice: ''
        },
        8: {
          title: '카페 추출기',
          description: `
            <p><strong>카페 게시글 추출기</strong>는 주요 커뮤니티에서 특정 키워드에 해당하는 글을 자동으로 수집합니다.</p>
            <p>✅ 기능</p>
            <p>✔️ 네이버 카페 검색 자동화</p>
            <p>✔️ 게시글 제목, 작성자, 날짜 추출</p>
            <p>✔️ 엑셀 저장 기능 포함</p>
            <p>📌 리서치/광고 타겟 분석에 최적</p>
          `,
          image: '/programlist/cafe/cafe_extract.png',
          price: '30,000원(30일)',
          originalPrice: ''
        },
        9: {
          title: '유튜브 댓글 추출기',
          description: `
            <p><strong>유튜브 댓글 추출기</strong>는 특정 영상의 댓글 데이터를 자동으로 수집해 분석 및 응답 활용이 가능합니다.</p>
            <p>✅ 주요 기능</p>
            <p>✔️ 영상 URL 기반 댓글 전체 추출</p>
            <p>✔️ 작성자, 내용, 좋아요 수 추출</p>
            <p>✔️ CSV 또는 JSON으로 저장</p>
            <p>📌 브랜드 반응 조사, 악성 댓글 필터링 등에 유용</p>
          `,
          image: '/programlist/youtube/youtube_comments.png',
          price: '30,000원(30일)',
          originalPrice: ''
        },
        10: {
          title: '블로그 수급 프로그램',
          description: `
            <p><strong>블로그 수급 자동화 프로그램</strong>은 신규 블로그 계정을 확보하고, 자동으로 관리·운영할 수 있게 해주는 도구입니다.</p>
            <p>✅ 기능</p>
            <p>✔️ 블로그 개설 자동화</p>
            <p>✔️ 초기 글 작성 및 커버 이미지 세팅</p>
            <p>✔️ 계정별 관리 지원</p>
            <p>📌 블로그 마케팅 사업자 전용</p>
          `,
          image: '/programlist/blog/blog_manage.png',
          price: '50,000원(30일)',
          originalPrice: ''
        },
        11: {
          title: '골프장, 테니스장 예약 프로그램',
          description: `
            <p><strong>골프장/테니스장 자동 예약 프로그램</strong>은 인기 예약 사이트에서 자동으로 예약을 시도하여 성공 확률을 높이는 프로그램입니다.</p>
            <p>✅ 기능</p>
            <p>✔️ 예약 시간 감지 및 실시간 갱신</p>
            <p>✔️ 자동 로그인 및 예약 시도</p>\n    <p>✔️ 다양한 사이트 연동 가능</p>
            <p>📌 예약 성공률 극대화를 위한 필수 도구</p>
            <p>※ 예약 제한 시 우회 설정 가능</p>
          `,
          image: '/programlist/reservation/golf_tennis.png',
          price: '상담 후 결정',
          originalPrice: ''
        }

      },
      product: null
    };
  },
  mounted() {
    const id = this.$route.params.productId;
    if (id && this.products[id]) {
      this.product = this.products[id];
    }
  },
  methods: {
    kakaoOpen() {
      const url = 'https://open.kakao.com/o/s42fyCqh';
      window.open(url, '문의하기', 'width=800,height=500,scrollbars=yes');
    }
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
}
</style>
