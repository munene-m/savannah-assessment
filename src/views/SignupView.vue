<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import CustomButton from '@/components/CustomButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const signupWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push('/home')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <main class="flex items-center justify-center min-h-[60vh]">
    <div class="bg-white rounded-lg mx-4 max-w-md m-auto py-10">
      <h1 class="text-xl font-bold text-center my-4 mt-32">Create an account</h1>

      <custom-button
        @click="signupWithGoogle"
        class="rounded-md w-full border border-primary px-6 py-2 flex items-center gap-2 justify-center"
        ><img src="../assets/googleIcon.png" class="w-6" alt="Google Icon" />Sign up with
        Google</custom-button
      >
      <p class="mb-2 flex items-center justify-center mt-1 cursor-pointer">
        Already have an account?
        <span @click="$router.push('/login')" class="text-info ml-2">Log in</span>
      </p>
    </div>
  </main>
</template>
