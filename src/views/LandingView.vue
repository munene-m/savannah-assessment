<script setup>
import CustomButton from '@/components/CustomButton.vue'
import ArrowIcon from '../components/icons/ArrowIcon.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <header class="w-full py-3 text-white text-center text-2xl font-bold">
      Welcome to Album Showcase
    </header>

    <main class="flex flex-col items-center justify-center w-full px-4 mt-10">
      <div class="text-center max-w-2xl">
        <h1 class="text-3xl font-bold mb-5">Discover Amazing Albums</h1>
        <p class="text-lg">
          This site allows you to browse through user albums and their photos. You can also view
          details about each user and their respective albums. To get started, simply sign in with
          Google.
        </p>
      </div>

      <div class="my-10">
        <img src="../assets/albums.jpg" alt="Albums" class="max-w-xl w-full h-1/2 object-cover" />
        <custom-button class="bg-secondary m-auto flex items-center justify-center mt-5">
          <RouterLink to="/signup" class="flex items-center gap-2 text-white">
            Get started <ArrowIcon />
          </RouterLink>
        </custom-button>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="w-full py-5 bg-accent text-white text-center mt-auto">
      © 2024 Album Showcase
    </footer>
  </div>
</template>
