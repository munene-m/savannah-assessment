<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from './CustomButton.vue'
import MenuIcon from './icons/MenuIcon.vue'
import MenuClose from './icons/MenuClose.vue'

import { RouterLink } from 'vue-router'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import LogoutIcon from './icons/LogoutIcon.vue'

const router = useRouter()
const showMenu = ref(false)
const isLoggedIn = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignout = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}

function toggleMenuIcon() {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav
    class="flex items-center justify-between py-3 px-2 bg-light mx-4 rounded-md bg-primary text-white shadow-md my-4"
  >
    <div class="flex items-center gap-6">
      <RouterLink to="/"><p>Album-app</p></RouterLink>
      <div class="hidden md:flex">
        <ul class="flex items-center justify-center gap-x-5">
          <RouterLink to="/home" aria-current="page">Home</RouterLink>
        </ul>
      </div>
    </div>

    <div class="md:flex hidden">
      <custom-button v-if="!isLoggedIn"
        ><router-link to="/login">Log in</router-link></custom-button
      >
      <custom-button v-if="!isLoggedIn" class="bg-primary text-white"
        ><router-link to="/signup">Sign up</router-link></custom-button
      >

      <custom-button
        v-if="isLoggedIn"
        @click="handleSignout"
        class="bg-primary text-white flex items-center gap-2"
        >Log out<LogoutIcon
      /></custom-button>
    </div>
    <menu-icon class="md:hidden flex" @click="toggleMenuIcon" v-if="!showMenu" />
    <menu-close v-if="showMenu" @click="toggleMenuIcon" class="md:hidden flex" />
  </nav>
  <div
    v-if="showMenu"
    class="bg-white w-fit px-6 py-2 rounded-md shadow-md absolute right-4 md:hidden z-50"
  >
    <ul class="flex flex-col items-center justify-center gap-y-3">
      <RouterLink to="/home" aria-current="page">Home</RouterLink>

      <custom-button v-if="!isLoggedIn" class="bg-white text-black w-full"
        ><RouterLink to="/login">Log in</RouterLink></custom-button
      >
      <custom-button v-if="!isLoggedIn" class="bg-primary text-white w-full"
        ><RouterLink to="/signup">Sign up</RouterLink></custom-button
      >
      <custom-button
        @click="handleSignout"
        v-if="isLoggedIn"
        class="bg-primary text-white w-full flex items-center gap-2"
        >Log out<LogoutIcon
      /></custom-button>
    </ul>
  </div>
</template>

<style scoped>
ul li {
  cursor: pointer;
}
.router-link-exact-active {
  position: relative;
  text-decoration: none;
}

.router-link-exact-active:hover::before {
  transform: scaleX(1);
}
</style>
