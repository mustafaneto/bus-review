<template>
    <form @submit.prevent="addBusStop">
      <input v-model="name" placeholder="Bus Stop Name" required />
      <input v-model="location" placeholder="Location (optional)" />
      <button type="submit">Add Bus Stop</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import supabase from '@/lib/supabaseClient'
  
  const name = ref('')
  const location = ref('')
  
  const addBusStop = async () => {
    const { error } = await supabase.from('bus_stops').insert([
      { name: name.value, location: location.value }
    ])
  
    if (error) {
      alert('Error adding bus stop: ' + error.message)
    } else {
      alert('Bus stop added!')
      name.value = ''
      location.value = ''
    }
  }
  </script>
  