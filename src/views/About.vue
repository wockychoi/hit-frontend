
<template>
  <div>
    <h1>프로그램 목록</h1>
    <div v-for="program in programs" :key="program.id" class="card" @click="$router.push('/detail/' + program.id)">
      <img :src="program.image" width="200" />
      <h2>{{ program.name }}</h2>
      <p>{{ program.description }}</p>
    </div>
  </div>
</template>

<script>
import programs from '../data'

export default {
  data() {
    return { programs }
  }
}
</script>

<style>
.card { border: 1px solid #ddd; padding: 10px; margin: 10px; cursor: pointer; }
</style>
