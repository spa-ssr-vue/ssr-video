<template>
  <div class="pa-3">
    <h5>{{ course.name }}</h5>
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((item, i) => ({ text: item.name, value: i }))"
    ></v-select>
    <div>
      <video :src="episode.file" width="100%" controls></video>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const { course } = await $axios.$get(`/courses/${id}`)
    console.log(course)
    return {
      id,
      course
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>
