<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import CustomButton from '@/components/CustomButton.vue'
import EyeClosed from '../components/icons/EyeClosed.vue'
import EyeOpen from '../components/icons/EyeOpen.vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const passwordError = ref('')
const error = ref('')

const router = useRouter()

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
const register = async () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      // Signed up
      // const user = userCredential.user
      router.push('/home')
      // ...
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-exists':
          error.value = 'Email already exists'
          break
        case 'auth/invalid-email':
          error.value = 'Invalid email'
          break
        case 'auth/invalid-password':
          error.value = 'Password should be at least 6 characters'
          break
        default:
          error.value = 'Invalid email or password'
          break
      }
      // ..
    })
}

const signupWithGoogle = async () => {
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
      <form @submit.prevent="register" class="mx-3 md:mx-0 flex flex-col">
        <p class="text-error text-center text-sm py-1 lg:text-base">{{ error }}</p>
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
          <span v-else>Sign up</span>
        </custom-button>

        <p class="text-zinc-600 text-center my-5 font-bold">OR</p>
      </form>
      <custom-button
        @click="signupWithGoogle"
        class="rounded-full w-full border border-primary px-6 py-2 flex items-center gap-2 justify-center"
        ><img src="../assets/googleIcon.png" class="w-6" alt="Google Icon" />Sign up with
        Google</custom-button
      >
      <p class="mb-2 flex items-center justify-center mt-1 cursor-pointer">
        Already have an account?
        <span @click="$router.push('/login')" class="text-secondary ml-2">Log in</span>
      </p>
    </div>
  </main>
</template>
