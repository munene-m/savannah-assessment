<script setup>
import AlbumCard from '@/components/AlbumCard.vue'
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
      <h1 class="text-xl mx-2 text-center font-bold">
        List of {{ album.title }}'s photos and its details:
      </h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto"
      >
        <AlbumCard :albumPhotos="albumPhotos" />
      </div>
    </div>
    <div v-else class="flex items-center flex-col justify-center mt-10 gap-2 pt-24">
      <p class="loading loading-dots loading-md text-center"></p>
      <span>Loading album data...</span>
    </div>
  </main>
</template>
