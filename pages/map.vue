<template>
  <div id="map" style="height: 600px;"></div>
</template>

<script setup>
definePageMeta({
  ssr: false // disables SSR on this page
})

import { onMounted } from 'vue'

onMounted(async () => {
  // ✅ Import leaflet only on client side
  const L = await import('leaflet')

  const map = L.map('map').setView([20.5937, 78.9629], 5)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  try {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl

   const response = await $fetch(`${apiUrl}/items/arifact`)
    const data = response?.data || []

    data.forEach(item => {
      if (item.latitude && item.longitude) {
        L.marker([item.latitude, item.longitude])
          .addTo(map)
          .bindPopup(`
            <b>${item.title}</b><br>${item.description}<br>
            <i>${new Date(item.date).toLocaleDateString()}</i>
          `)
      }
    })
  } catch (error) {
    console.error('Error loading markers:', error)
    document.getElementById('map').innerHTML = `<p style="color:red;">Failed to load data: ${error.message}</p>`
  }
})
</script>

<style scoped>
#map {
  height: 600px;
}
</style>
