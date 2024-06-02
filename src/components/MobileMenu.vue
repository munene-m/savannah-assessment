<script setup>
import { RouterLink } from 'vue-router'
import CustomButton from './CustomButton.vue'
import LogoutIcon from './icons/LogoutIcon.vue'

const props = defineProps({
  isLoggedIn: Boolean
})

defineEmits(['toggleMenu', 'signOut'])
</script>

<template>
  <div class="bg-white w-full px-6 py-2 rounded-md shadow-md fixed md:hidden z-50 top-16">
    <div class="flex flex-col items-center justify-center gap-y-3">
      <div class="w-full">
        <RouterLink
          to="/home"
          @click="$emit('toggleMenu')"
          aria-current="page"
          class="block w-full text-center py-2"
        >
          Home
        </RouterLink>
      </div>
      <div class="w-full">
        <RouterLink to="/photo" @click="$emit('toggleMenu')" class="block w-full text-center py-2">
          Photo
        </RouterLink>
      </div>

      <div class="w-full">
        <custom-button
          v-if="!props.isLoggedIn"
          @click="$emit('toggleMenu')"
          class="bg-white text-black w-full py-0"
        >
          <RouterLink to="/login" class="block w-full text-center py-2">Log in</RouterLink>
        </custom-button>
      </div>

      <div class="w-full">
        <custom-button
          v-if="!props.isLoggedIn"
          @click="$emit('toggleMenu')"
          class="bg-primary text-white w-full py-0"
        >
          <RouterLink to="/signup" class="block w-full text-center py-2">Sign up</RouterLink>
        </custom-button>
      </div>

      <div class="w-full">
        <custom-button
          @click="$emit('signOut')"
          v-if="props.isLoggedIn"
          class="bg-primary text-white w-full flex items-center justify-center gap-2"
        >
          Log out
          <LogoutIcon />
        </custom-button>
      </div>
    </div>
  </div>
</template>
