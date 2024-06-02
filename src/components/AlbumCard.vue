<script setup lang="ts">
interface Photos {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

const props = defineProps<{
  albumPhotos: Photos[]
}>()
</script>

<template>
  <div
    class="my-2 p-3 rounded-lg shadow-lg flex flex-col items-center bg-white max-w-xs w-full"
    v-for="photo in props.albumPhotos"
    :key="photo.id"
  >
    <div class="flex items-center gap-2 justify-between mb-2 w-full">
      <img :src="photo.thumbnailUrl" class="w-16 h-16 rounded-full object-cover" alt="Thumbnail" />
      <p class="text-sm font-medium text-end">{{ photo.title }}</p>
    </div>
    <img :src="photo.url" class="rounded-md h-48 w-full object-cover mb-2" alt="Photo" />
  </div>
</template>
