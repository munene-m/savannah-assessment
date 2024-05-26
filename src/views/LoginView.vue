<script setup>
import { useRouter } from 'vue-router'
import CustomButton from '@/components/CustomButton.vue'
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
const router = useRouter()

const signinWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push('/home')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <main class="flex items-center justify-center min-h-[60vh]">
    <div class="bg-white rounded-lg p-4 mx-4 max-w-md m-auto py-10">
      <h1 class="text-xl font-bold text-center my-4 mt-32">Welcome back!</h1>

      <custom-button
        @click="signinWithGoogle"
        class="rounded-md w-full border border-primary px-6 py-2 flex items-center gap-2 justify-center"
        ><img src="../assets/googleIcon.png" class="w-6" alt="Google Icon" />Sign in with
        Google</custom-button
      >
      <p class="mb-2 flex items-center justify-center mt-1 cursor-pointer">
        Don't have an account?
        <span @click="$router.push('/signup')" class="ml-2 text-info">Create an account</span>
      </p>
    </div>
  </main>
</template>
