import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/lib/supabaseClient'

export const useBusStopStore = defineStore('busStop', () => {
  const busStops = ref([])

  const fetchBusStops = async () => {
    const { data, error } = await supabase.from('bus_stops').select('id, name')
    if (error) {
      console.error('Error fetching bus stops:', error.message)
    } else {
      busStops.value = data
    }
  }

  return { busStops, fetchBusStops }
})
