<template>
  <div>
    <h1>블로그 검색 결과</h1>
    <ul>
      <li v-for="(item, index) in blogList" :key="index">
        {{ item.title }}  <!-- 예: item 안에 title 필드가 있다고 가정 -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],  // API에서 받아온 결과 리스트 저장용
    };
  },
  methods: {
    fetchBlogData() {
  const temp_search_subject = "호주"; // 실제 검색어
  const encode_temp_search_subject = encodeURIComponent(temp_search_subject);
  const num = 1; // 페이지 번호

  const url = `https://m.blog.naver.com/api/search/post?keyword=${encode_temp_search_subject}&page=${num}&sortType=sim`;

  fetch(url, {
    method: "GET",
    headers: {
      'accept': "application/json, text/plain, */*",
      'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'referer': 'https://m.blog.naver.com/SectionPostSearch.naver?orderType=sim&searchValue=car'
    },
    credentials: "include"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 응답 오류");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.blogList = data.posts || [];
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
},

  },
  mounted() {
    this.fetchBlogData();  // 컴포넌트가 로드되면 API 호출
  },
};
</script>
