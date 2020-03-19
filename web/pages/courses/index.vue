<template>
  <div>
    <div class="text-center">
      <h3 class="pa-3">热门课程</h3>
    </div>
    <div class="px-3">
      <v-row>
        <v-col v-for="(course, index) in courses" :key="index" :md="4">
          <v-card :to="`/courses/${course._id}`">
            <div class="pa-2">
              <v-img :src="course.cover" height="200px"></v-img>
            </div>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ course.name }}</div>
                <span class="red--text">{{ course.createdAt }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn text>text</v-btn>
              <v-btn text color="primary">text</v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text>
                hidden text
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const res = await $axios.$get('/courses')
    return {
      courses: res.courses
    }
  }
}
</script>
