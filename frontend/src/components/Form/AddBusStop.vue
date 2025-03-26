<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent="handleAdd">
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
import { useBusStopStore } from '@/stores/busStopStore'

const name = ref('')
const location = ref('')
const busStopStore = useBusStopStore()

const handleAdd = async () => {
  try {
    await busStopStore.addBusStop(name.value, location.value)
    alert('Parada adicionada com sucesso!')
    name.value = ''
    location.value = ''
  } catch (error) {
    alert('Erro ao adicionar parada: ' + error.message)
  }
}
</script>
