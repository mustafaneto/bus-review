// stores/busDepartureStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/lib/supabaseClient'

export const useBusDepartureStore = defineStore('busDeparture', () => {
  const departures = ref([])

  const fetchDepartures = async () => {
    const { data, error } = await supabase
      .from('bus_departures_time')
      .select('*')

    if (error) {
      console.error('Erro ao buscar horários:', error.message)
    } else {
      departures.value = data
    }
  }

  const addDeparture = async (line_id, direction, departure_time) => {
    const { error } = await supabase.from('bus_departures_time').insert({
      line_id,
      direction,
      departure_time
    })

    if (error) {
      console.error('Erro ao adicionar horário:', error.message)
      throw error
    }

    await fetchDepartures()
  }

  return {
    departures,
    fetchDepartures,
    addDeparture
  }
})
