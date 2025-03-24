<template>
    <form @submit.prevent="addBusArrival">
      <input v-model="stopId" placeholder="Bus Stop ID" required />
      <input v-model="linha" placeholder="Linha" required />
  
      <label>
        Arrival Time (optional):
        <input type="datetime-local" v-model="arrivalTime" />
      </label>
  
      <button type="submit">Register Arrival</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import supabase from '@/lib/supabaseClient'
  
  const stopId = ref('')
  const linha = ref('')
  const arrivalTime = ref('')
  
  const addBusArrival = async () => {
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
      alert('You must be logged in')
      return
    }
  
    const parsedArrivalTime = arrivalTime.value
      ? new Date(arrivalTime.value)
      : new Date() // fallback to now
  
    const { error } = await supabase.from('bus_arrivals').insert([
      {
        stop_id: parseInt(stopId.value),
        user_id: user.id,
        linha: parseInt(linha.value),
        arrival_time: parsedArrivalTime
      }
    ])
  
    if (error) {
      alert('Error adding arrival: ' + error.message)
    } else {
      alert('Arrival logged!')
      stopId.value = ''
      linha.value = ''
      arrivalTime.value = ''
    }
  }
  </script>
  