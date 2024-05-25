<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

const album = reactive({})
onMounted(async () => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
  console.log(response.data)
})
defineProps({
  id: String
})
</script>

<template>
  <main>
    <p>Album page</p>
  </main>
</template>
