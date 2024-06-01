<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const props = defineProps({
  id: String
})

const album = ref(null)
const albumPhotos = ref([])
const loadingStates = ref([])

onMounted(async () => {
  try {
    const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${props.id}`)
    album.value = albumResponse.data

    const photosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${props.id}`
    )
    albumPhotos.value = photosResponse.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
  loadingStates.value = albumPhotos.value.map(() => true)
})
</script>

<template>
  <main class="container mx-auto pb-8 pt-24">
    <div v-if="album" class="px-4 my-2">
      <h1 class="text-xl mx-2 text-center font-bold">List of {{ album.title }}'s photos:</h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto"
      >
        <div
          class="my-2 p-3 rounded-lg shadow-lg flex flex-col items-center bg-white max-w-xs w-full"
          v-for="photo in albumPhotos"
          :key="photo.id"
        >
          <div class="flex items-center gap-2 justify-between mb-2 w-full">
            <img
              :src="photo.thumbnailUrl"
              class="w-16 h-16 rounded-full object-cover"
              alt="Thumbnail"
            />
            <p class="text-sm font-medium text-end">{{ photo.title }}</p>
          </div>
          <img :src="photo.url" class="rounded-md h-48 w-full object-cover mb-2" alt="Photo" />
        </div>
      </div>
    </div>
    <div v-else class="flex items-center flex-col justify-center mt-10 gap-2 pt-24">
      <p class="loading loading-dots loading-md text-center"></p>
      <span>Loading album data...</span>
    </div>
  </main>
</template>
