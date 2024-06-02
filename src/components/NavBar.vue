<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from './CustomButton.vue'
import MenuIcon from './icons/MenuIcon.vue'
import MenuClose from './icons/MenuClose.vue'
import MobileMenu from './MobileMenu.vue'
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
  showMenu.value = !showMenu.value
}

function toggleMenuIcon() {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav
    class="flex items-center justify-between py-3 px-2 bg-light rounded-md bg-primary text-white shadow-md m-2 fixed left-0 right-0"
  >
    <div class="flex items-center gap-6">
      <RouterLink to="/"><p>Album-app</p></RouterLink>
      <div class="hidden md:flex">
        <ul class="flex items-center justify-center gap-x-5">
          <li><RouterLink to="/home" aria-current="page">Home</RouterLink></li>
          <li><RouterLink to="/photo">Photo</RouterLink></li>
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
  <mobile-menu
    :isLoggedIn="isLoggedIn"
    @sign-out="handleSignout"
    v-if="showMenu"
    @toggle-menu="toggleMenuIcon"
  />
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
