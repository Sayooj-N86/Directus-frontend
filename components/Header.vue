<template>
  <header class="bg-blue-700 text-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-2xl">🗺️</span>
          <h1 class="text-xl font-bold">Timemap India</h1>
        </NuxtLink>

        <!-- Desktop Nav (visible on md and up) -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink 
            to="/" 
            class="px-3 py-2 font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
            active-class="bg-blue-800"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/map" 
            class="px-3 py-2 font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
            active-class="bg-blue-800"
          >
            Map
          </NuxtLink>
          <NuxtLink 
            to="/timeline" 
            class="px-3 py-2 font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
            active-class="bg-blue-800"
          >
            Timeline
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button (hidden on md and up) -->
        <button 
          @click="toggle" 
          class="md:hidden p-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle menu"
        >
          <svg 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Nav (only visible on small screens when menu open) -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div 
          v-if="open" 
          class="md:hidden mt-4 pb-4 space-y-2"
        >
          <NuxtLink 
            to="/" 
            class="block px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            active-class="bg-blue-800"
            @click="close"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/map" 
            class="block px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            active-class="bg-blue-800"
            @click="close"
          >
            Map
          </NuxtLink>
          <NuxtLink 
            to="/timeline" 
            class="block px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            active-class="bg-blue-800"
            @click="close"
          >
            Timeline
          </NuxtLink>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
const open = ref(false)

const toggle = () => {
  open.value = !open.value
}

const close = () => {
  open.value = false
}
</script>