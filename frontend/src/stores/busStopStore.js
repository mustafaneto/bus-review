// stores/busStopStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/lib/supabaseClient'

export const useBusStopStore = defineStore('busStop', () => {
  const busStops = ref([])

  const fetchBusStops = async () => {
    const { data, error } = await supabase
      .from('bus_stops')
      .select('id, name')

    if (error) {
      console.error('Error fetching bus stops:', error.message)
    } else {
      busStops.value = data
    }
  }

  const addBusStop = async (name, location) => {
    const { data, error } = await supabase
      .from('bus_stops')
      .insert([{ name, location }])
      .select('id, name')

    if (error) {
      console.error('Error adding bus stop:', error.message)
      throw error
    }

    if (data && data.length > 0) {
      busStops.value.push(data[0])
    }
  }

  return {
    busStops,
    fetchBusStops,
    addBusStop
  }
})
