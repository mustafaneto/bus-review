<template>
  <v-sheet class="mx-auto" width="400">
    <v-form @submit.prevent="handleAdd">
      <v-select
        v-model="form.line"
        :items="busLineStore.busLines"
        item-title="line_name"
        item-value="id"
        label="Linha"
        :rules="[(v) => !!v || 'Selecione uma linha']"
        required
      ></v-select>

      <v-select 
        v-model="form.direction"
        :items="directions"
        label="Direção"
        :rules="[(v) => !!v || 'Selecione uma direção']"
        required
      ></v-select>

      <v-text-field
        v-model="form.departure_time"
        label="Horário de Partida"
        type="time"
        :rules="[(v) => !!v || 'Informe o horário']"
        required
      ></v-text-field>

      <v-btn type="submit" class="mt-2" block color="primary"> Adicionar Horário </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBusLineStore } from '@/stores/busLineStore'
import { useBusDepartureStore } from '@/stores/busDepartureStore'

const form = ref({
  line: '',
  direction: '',
  departure_time: '',
})

const directions = [
  { title: 'CENTRO', value: 'to_downtown' },
  { title: 'BAIRRO', value: 'to_neighborhood' },
]

const busLineStore = useBusLineStore()
const busDepartureStore = useBusDepartureStore()

onMounted(() => {
  if (busLineStore.busLines.length === 0) {
    busLineStore.fetchBusLines()
  }
})

const handleAdd = async () => {
  try {
    await busDepartureStore.addDeparture(
      parseInt(form.value.line),
      form.value.direction,
      form.value.departure_time,
    )
    alert('Horário adicionado com sucesso!')
  } catch {
    alert('Erro ao adicionar horário.')
  }
}
</script>
