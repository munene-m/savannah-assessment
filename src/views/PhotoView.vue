<template>
  <div v-if="photo" class="flex items-center justify-center flex-col pt-24">
    <h1>{{ photo.title }}</h1>
    <img :src="photo.url" alt="Photo" class="rounded-full w-32 h-32" />
    <div v-if="isEditing" class="flex items-center justify-center flex-col mt-4">
      <input
        v-model="newTitle"
        class="bg-slate-300 md:bg-slate-200 text-sm md:text-base w-full p-3 mt-1 rounded-lg outline-transparent"
      />
      <button
        @click="saveTitle"
        class="text-center bg-primary text-white px-6 py-2 mt-2 rounded-md"
      >
        Save
      </button>
    </div>
    <button v-else @click="startEditing" class="flex items-center gap-1 mt-2 justify-center">
      Edit Title <EditIcon />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, get, update } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import EditIcon from '../components/icons/EditIcon.vue'

const db = getDatabase()
const auth = getAuth()

const photoId = 'photo1'
const photo = ref(null)
const isEditing = ref(false)
const newTitle = ref('')

onMounted(async () => {
  const user = auth.currentUser
  if (!user) {
    console.error('User not authenticated')
    return
  }

  const photoRef = dbRef(db, `photos/${photoId}`)
  const snapshot = await get(photoRef)
  if (snapshot.exists()) {
    photo.value = snapshot.val()
    newTitle.value = photo.value.title
  } else {
    console.error('Photo not found')
  }
})

function startEditing() {
  isEditing.value = true
}

async function saveTitle() {
  if (newTitle.value && photo.value) {
    const user = auth.currentUser
    if (!user) {
      console.error('User not authenticated')
      return
    }

    const photoRef = dbRef(db, `photos/${photoId}`)
    await update(photoRef, { title: newTitle.value })
    photo.value.title = newTitle.value
    isEditing.value = false
  }
}
</script>
