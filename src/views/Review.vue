<template>
  <section class="youtube-review py-5 px-4 bg-dark text-white">
    <h2 class="text-center mb-4">🎬 사용자 후기 영상</h2>

    <!-- 메인 영상 플레이어 -->
    <div v-if="selectedVideoId" class="video-player mb-4">
      <iframe
        width="100%"
        height="450"
        :src="`https://www.youtube.com/embed/${selectedVideoId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 썸네일 리스트 -->
    <div class="thumbnail-grid">
      <div
        class="thumb"
        v-for="video in videos"
        :key="video.id"
        @click="selectVideo(video.id)"
      >
        <img :src="`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`" />
        <p class="title">{{ video.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "YouTubeReview",
  data() {
    return {
      selectedVideoId: null,
      videos: [
        // 이 부분에 재생목록 영상의 video ID와 제목을 넣어주세요

        { id: "Pue6Ibu6dxg", title: "후기 영상 #11" },
        { id: "Vka0xaLx17M", title: "후기 영상 #10" },
        { id: "wHBBcYHoTZQ", title: "후기 영상 #9" },
        { id: "OwVrfkZqtyI", title: "후기 영상 #8" },
        { id: "U8lbXdcOFao", title: "후기 영상 #7" },
        { id: "jmWYNSDcvlU", title: "후기 영상 #6" },
        { id: "w7UoXlm1JKg", title: "후기 영상 #5" },
        { id: "BlhlAvDxmlc", title: "후기 영상 #4" },
        { id: "Egoy0orHesY", title: "후기 영상 #3" },
        { id: "lxtl27M63so", title: "후기 영상 #2" },
        { id: "rtiPe4AWCsE", title: "후기 영상 #1" }
      ]
    };
  },
  methods: {
    selectVideo(id) {
      this.selectedVideoId = id;
    }
  }
};
</script>

<style scoped>
.youtube-review {
  background-color: #121212;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
  color: #ffc107;
}

.video-player {
  text-align: center;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  justify-items: center;
}

.thumb {
  cursor: pointer;
  transition: transform 0.2s ease;
  text-align: center;
}

.thumb img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.3);
}

.thumb:hover {
  transform: scale(1.05);
}

.title {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #fff;
}
</style>
