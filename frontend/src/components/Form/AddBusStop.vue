<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent="addBusStop">
      <v-text-field
        v-model="name"
        :rules="[v => !!v || 'Nome da Parada é obrigatória']"
        label="Parada de Ônibus"
        required
      ></v-text-field>

      <v-text-field
        v-model="location"
        label="Local (opcional)"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Adicionar Parada</v-btn>
    </v-form>
  </v-sheet>
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
