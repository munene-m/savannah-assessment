<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from '@/components/CustomButton.vue'
import EyeClosed from '../components/icons/EyeClosed.vue'
import EyeOpen from '../components/icons/EyeOpen.vue'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth
} from 'firebase/auth'
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const passwordError = ref('')
const errorMsg = ref('')
const router = useRouter()

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
const login = async () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      console.log(user)
      router.push('/home')
      // ...
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMsg.value = 'Account with the provided email not found'
          break
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid email'
          break
        case 'auth/invalid-credential':
          errorMsg.value = 'Invalid email or password'
          break
        default:
          errorMsg.value = 'Invalid email or password'
          break
      }
      // ..
    })
}
const signinWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      router.push('/user')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <main>
    <div class="bg-white rounded-lg p-4 max-w-md m-auto mt-24">
      <form @submit.prevent="login" class="mx-3 md:mx-0 flex flex-col">
        <p class="text-red-500 text-center text-sm lg:text-base">
          {{ errorMsg }}
        </p>
        <h1 class="font-bold text-xl text-center my-2">Welcome back!</h1>
        <label for="paymail" class="block mx-3 md:mx-0 mb-1">Email</label>
        <input
          type="email"
          placeholder="johndoe@email.com"
          required
          v-model="email"
          class="text-base px-3 py-2 w-full mb-10 outline-slate-300 border dark:text-[#343a40] outline-none border-slate-300 bg-slate-200 rounded-lg"
        />
        <label for="password" class="block mx-3 mb-1 md:mx-0">Password</label>
        <div class="relative flex gap-1">
          <input
            v-if="!showPassword"
            type="password"
            placeholder="******"
            required
            v-model="password"
            class="text-base px-3 py-2 w-full outline-slate-300 border outline-none dark:text-[#343a40] border-slate-300 bg-slate-200 rounded-lg pr-10"
          />
          <input
            v-else
            type="text"
            placeholder="******"
            required
            v-model="password"
            class="text-base px-3 py-2 w-full outline-slate-300 border outline-none dark:text-[#343a40] border-slate-300 bg-slate-200 rounded-lg pr-10"
          />
          <p
            @click.prevent="toggleShowPassword"
            class="absolute inset-y-0 right-2 rounded-r-lg flex items-center cursor-pointer"
          >
            <eyeClosed v-if="!showPassword" class="dark:text-black" />
            <eyeOpen v-else class="dark:text-black" />
          </p>
        </div>
        <p class="text-red-500 py-1 text-sm relative block md:text-base">{{ passwordError }}</p>

        <custom-button
          type="submit"
          :class="{ 'pointer-events-none opacity-70': loading }"
          class="w-full mt-10 flex items-center justify-center bg-primary text-white"
          ><span v-if="loading" class="loading loading-bars loading-sm"></span>
          <span v-else>Login</span>
        </custom-button>

        <p class="text-zinc-600 text-center my-5 font-bold">OR</p>
      </form>
      <custom-button
        @click="signinWithGoogle"
        class="rounded-full w-full border border-primary px-6 py-2 flex items-center gap-2 justify-center"
        ><img src="../assets/googleIcon.png" class="w-6" alt="Google Icon" />Sign in with
        Google</custom-button
      >
      <p class="mb-2 flex items-center justify-center mt-1 cursor-pointer">
        Don't have an account?
        <span @click="$router.push('/signup')" class="text-secondary ml-2">Create an account</span>
      </p>
    </div>
  </main>
</template>
