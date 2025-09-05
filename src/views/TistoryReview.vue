<template>
  <section class="image-review py-5 px-4 bg-dark text-white">
    <h2 class="text-center mb-4">애드센스 후기 모음</h2>

    <!-- 메인 이미지 뷰어 -->
    <div v-if="selectedImage" class="image-viewer mb-4">
      <img
        :src="selectedImage"
        alt="메인 후기 이미지"
        class="main-image"
      />
    </div>

    <!-- 썸네일 리스트 -->
    <div class="thumbnail-grid">
      <div
        class="thumb"
        v-for="(image, index) in images"
        :key="index"
        @click="selectImage(image.src)"
      >
        <img :src="image.src" :alt="image.title" />
        <p class="title">{{ image.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ImageReview",
  data() {
    return {
      selectedImage: null,
      images: [
        { src: "/programlist/adsense/tistory_ad1.png", title: "후기 이미지 #1" },
        { src: "/programlist/adsense/tistory_ad2.png", title: "후기 이미지 #2" },
        { src: "/programlist/adsense/tistory_ad3.png", title: "후기 이미지 #3" }
      ]
    };
  },
  methods: {
    selectImage(src) {
      this.selectedImage = src;
    }
  }
};
</script>

<style scoped>
.image-review {
  background-color: #121212;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
  color: #ffc107;
}

.image-viewer {
  text-align: center;
}

.main-image {
  max-width: 100%;
  max-height: 450px;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(255, 193, 7, 0.4);
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
