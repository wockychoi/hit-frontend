<template>
  <div>
    <!-- Header -->
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h1 class="display-4 fw-bolder text-white text-center">
            프로그램은 프로그램 다워야 한다!<br>개발에 대한 신념입니다.
          </h1>
          <p class="lead fw-normal text-white-50 text-center mb-4">
            With this program list homepage template
          </p>

          <div class="text-center mb-4">
            <button type="button" class="btn btn-warning btn-lg px-4" @click="kakaoOpen">
              💬 프로그램 제작 문의하기
            </button>
          </div>

          <div class="text-center text-white">
            <div class="mb-2">
              <span @click="youtubeOpen" class="text-decoration-none text-info fw-bold"  style=" cursor: pointer;">
                📺 프로그램 영상 확인하기 Click
              </span>
            </div>
            <div class="text-white-50">
              📱 프로그램 문의 (KAKAO Talk): <span class="text-warning fw-bold">nglemfk8</span>
            </div>
          </div>
          

          
        </div>
      </div>
    </header>

    <!-- Products -->
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          <div class="col mb-5" v-for="product in products" :key="product.id">
            <div class="card h-100">
              <div v-if="product.sale" class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
              <img class="card-img-top" :src="product.image" alt="상품 이미지" />
              <div class="card-body p-4">
                <div class="text-center">
                  <h5 class="fw-bolder">{{ product.name }}</h5>
                  <div v-if="product.stars" class="d-flex justify-content-center small text-warning mb-2">
                    <div v-for="n in product.stars" :key="n" class="bi-star-fill"></div>
                  </div>
                  <div v-if="product.oldPrice">
                    {{ product.price }}
                    <span class="text-muted text-decoration-line-through">{{ product.oldPrice }}</span>
                  </div>
                  <div v-else>
                    {{ product.price }}
                  </div>
                  <div v-if="product.review">
                    <p v-html="product.review"></p>
                  </div>
                </div>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <button class="btn btn-outline-dark mt-auto" @click="openPopup(product.id)">
                    {{ product.buttonText }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      products: [
        {
          id: 1,
          name: '티스토리 자동포스팅',
          price: '25,000원(30일)',
          oldPrice: '30,000(30일)',
          image: '/programlist/tistory/tistory_home.png',
          sale: false,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><strong>티스토리 자동포스팅 프로그램</strong>은 <span style="color:red;">키워드 기반</span>으로 자동 글 등록이 가능한 프로그램</span>'
        },
        {
          id: 2,
          name: '카카오톡 채팅 봇',
          price: '10,000원(30일)',
          
          image: '/programlist/kakao/kakaobot_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">지정한 카카오톡 채팅방을</span> 등록한 문구를 자동으로 보내는 프로그램</span>'
        },
        {
          id: 3,
          name: '블로그 댓글 매크로',
          price: '20,000원(30일)',          
          image: '/programlist/blog/blog_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">신규글에 </span>빠르게 댓글을 등록하는 프로그램</span>'
        },
        {
          id: 4,
          name: '카페 댓글 매크로',
          price: '20,000원(30일)',          
          image: '/programlist/cafe/cafe_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">신규글에 </span>빠르게 댓글을 등록하는 프로그램</span>'
        },
        {
          id: 5,
          name: '밴드 댓글 매크로',
          price: '30,000원(30일)',          
          image: '/programlist/band/band_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">신규글에 </span>빠르게 댓글을 등록하는 프로그램</span>'
        },
        {
          id: 6,
          name: '밴드 댓글 매크로(막힘->허용)',
          price: '30,000원(30일)',          
          image: '/programlist/bandOption/bandOption_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">기존 댓글이 막혀있는 게시글에</span> 빠르게 댓글을 등록하는 프로그램</span>'
        },
        {
          id: 7,
          name: '블로그 추출기',
          price: '30,000원(30일)',          
          image: '/programlist/blogExtract/blogExtract_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">키워드 기반으로</span>블로그를 추출하는 프로그램</span>'
        },
        {
          id: 8,
          name: '카페 추출기',
          price: '30,000원(30일)',          
          image: '/programlist/cafeExtract/cafeExtract_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">입력한 카페를</span> 추출하는 프로그램</span>'
        },
        {
          id: 9,
          name: '유투브 댓글 추출기',
          price: '30,000원(30일)',          
          image: '/programlist/youtube/youtube_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">유투브 댓글, 대댓글</span> 추출하는 프로그램</span>'
        },
        {
          id: 10,
          name: '블로그 수급 프로그램',
          price: '50,000원(30일)',          
          image: '/programlist/blogSugup/blogSugup_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">최적화, 준최적화 블로그</span> 수급하는 프로그램</span>'
        },
        {
          id: 11,
          name: '골프장,테니스 예약 프로그램',
          price: 'N/A',          
          image: '/programlist/macro/macro_home.png',
          sale: true,
          stars: 5,
          buttonText: 'View detail',
          review: '<span style="font-size:0.9rem"><span style="color:red;">각종 골프장, 테니스 사이트</span> 예약하는 프로그램</span>'
        },
        
        // 추가 아이템도 원하면 넣을 수 있어요
      ]
    }
  },
  methods: {
    openPopup(productId) {
    this.$router.push({ name: 'Detail', params: { productId } });
    },
    kakaoOpen() {
      const url = 'https://open.kakao.com/o/sWcxAaFh';
      window.open(url, '문의하기', 'width=800,height=500,scrollbars=yes');
    },
    youtubeOpen(){
      const url = "https://www.youtube.com/@wakcro9648"
      window.open(url, '문의하기', 'width=1000,height=800,scrollbars=yes');      
    }
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');

body {
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
  color: #333;
}
.text-center a:hover {
  text-decoration: underline;
  color: #ffc107;
}
</style>
