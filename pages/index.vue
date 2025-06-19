<!-- frontend/pages/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col justify-center items-center px-6 py-12">
    <div class="text-center max-w-2xl">
      <h1 class="text-5xl font-extrabold text-black mb-6 drop-shadow">
        🏛️ Timemap India
      </h1>
      <p class="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed">
      Discover India's 5,000-year heritage through an immersive digital experience featuring interactive historical maps and stunning visualizations. Explore iconic monuments like the Taj Mahal with 360° virtual tours, augmented reality reconstructions, and animated timelines that bring ancient empires to life. Uncover hidden architectural gems and historical insights through curated trails, detailed zoomable models, and dynamic presentations of India's glorious past.  
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink to="/map">
          <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition duration-200">
            🗺️ View Map
          </button>
        </NuxtLink>
        <NuxtLink to="/timeline">
          <button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow transition duration-200">
            📅 Explore Timeline
          </button>
        </NuxtLink>
      </div>
    </div>


    <!-- <footer class="mt-20 text-sm text-gray-500">
      Built with ❤️ using Nuxt 3, Directus, Leaflet & D3.js
    </footer> -->
  </div>
</template>

<script setup>
// No logic needed here
</script>
