<template>
  <v-sheet class="mx-auto" width="400">
    <v-form @submit.prevent="addBusArrival">
      <v-select
        v-model="stopId"
        :items="busStopStore.busStops"
        item-title="name"
        item-value="id"
        label="Parada de Ônibus"
        :rules="[v => !!v || 'Parada de Ônibus é obrigatória']"
        required
      ></v-select>

      <v-select
        v-model="lineId"
        :items="busLineStore.busLines"
        item-title="line_name"
        item-value="id"
        label="Linha"
        :rules="[(v) => !!v || 'Selecione uma linha']"
        required
      ></v-select>

      <v-text-field
        v-model="arrivalTime"
        label="Horário de Chegada"
        type="datetime-local"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Registrar Hora de Chegada</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBusStopStore } from '@/stores/busStopStore'
import { useBusLineStore } from '@/stores/busLineStore'
import supabase from '@/lib/supabaseClient'

const stopId = ref('')
const lineId = ref('')
const arrivalTime = ref('')

const busStopStore = useBusStopStore()
const busLineStore = useBusLineStore()

onMounted(() => {
  if (busStopStore.busStops.length === 0) {
    busStopStore.fetchBusStops()
  }
  if (busLineStore.busLines.length === 0) {
    busLineStore.fetchBusLines()
  }
})

const addBusArrival = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert('Você precisa estar logado para registrar a hora de chegada.')
    return
  }

  const parsedArrivalTime = arrivalTime.value
    ? new Date(arrivalTime.value)
    : new Date()

  const { error } = await supabase.from('bus_arrivals_time').insert([
    {
      stop_id: parseInt(stopId.value),
      user_id: user.id,
      line_id: parseInt(lineId.value),
      arrival_time: parsedArrivalTime
    }
  ])

  if (error) {
    alert('Erro: ' + error.message)
  } else {
    alert('Hora registrada!')
  }
}
</script>
