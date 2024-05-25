<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

// Define the props
const props = defineProps({
  id: String
})

// State variables to hold user and userAlbums data
const user = ref(null)
const userAlbums = ref([])

// Fetch user and user's albums when the component is mounted
onMounted(async () => {
  try {
    // Fetch user data
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${props.id}`)
    user.value = userResponse.data

    // Fetch user albums
    const albumsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${props.id}`
    )
    userAlbums.value = albumsResponse.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
</script>

<template>
  <main>
    <div v-if="user" class="flex items-center flex-col">
      <p>List of {{ user.name }}'s albums:</p>
      <ul class="mt-4">
        <li
          class="border border-base-content my-2 p-2 rounded-md"
          v-for="album in userAlbums"
          :key="album.id"
        >
          {{ album.title }}
        </li>
      </ul>
    </div>
    <div v-else class="flex items-center flex-col justify-center mt-10 gap-2">
      <p class="loading loading-dots loading-md text-center"></p>
      <span>Loading user data...</span>
    </div>
  </main>
</template>
