<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IUser, IAlbum } from '../utils/user'
import axios, { type AxiosResponse } from 'axios'

const users = ref<IUser[]>([])
const albums = ref<IAlbum[]>([])
const router = useRouter()

onMounted(async () => {
  const usersResponse: AxiosResponse<IUser[]> = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  )
  users.value = usersResponse.data

  const albumsResponse: AxiosResponse<IAlbum[]> = await axios.get(
    'https://jsonplaceholder.typicode.com/albums'
  )
  albums.value = albumsResponse.data

  users.value.forEach((user) => {
    user.albumCount = albums.value.filter((album) => album.userId === user.id).length
  })
})

function getUser(id: number) {
  router.push(`/user/${id}`)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center pt-24 mb-4" v-if="users">
    <h1 class="text-xl mx-2 text-center font-bold">Number of albums per user</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-3">
      <li
        @click="getUser(user.id)"
        class="my-2 rounded-md border border-base-content p-2 cursor-pointer bg-slate-200"
        v-for="user in users"
        :key="user.id"
      >
        {{ user.name }} ({{ user.albumCount }} albums)
      </li>
    </ul>
  </div>
  <div v-else class="flex items-center flex-col justify-center mt-10 gap-2">
    <p class="loading loading-dots loading-md text-center"></p>
    <span>Loading user data...</span>
  </div>
</template>
