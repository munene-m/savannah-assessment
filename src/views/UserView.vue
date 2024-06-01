<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: String
})

const user = ref(null)
const userAlbums = ref([])

onMounted(async () => {
  try {
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${props.id}`)
    user.value = userResponse.data

    const albumsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${props.id}`
    )
    userAlbums.value = albumsResponse.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
function getAlbum(id) {
  router.push(`/album/${id}`)
}
</script>

<template>
  <main>
    <div v-if="user" class="flex items-center flex-col px-4 mb-4 pt-24">
      <h1 class="text-xl mx-2 text-center font-bold">List of {{ user.name }}'s albums:</h1>
      <ul class="mt-4">
        <li
          @click="getAlbum(album.id)"
          class="border border-base-content my-2 p-2 rounded-md cursor-pointer"
          v-for="album in userAlbums"
          :key="album.id"
        >
          {{ album.title }}
        </li>
      </ul>
    </div>
    <div v-else class="flex items-center flex-col justify-center gap-2 pt-24">
      <p class="loading loading-dots loading-md text-center"></p>
      <span>Loading user data...</span>
    </div>
  </main>
</template>
