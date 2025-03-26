// stores/busLineStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/lib/supabaseClient'

export const useBusLineStore = defineStore('busLine', () => {
  const busLines = ref([])

  const fetchBusLines = async () => {
    const { data, error } = await supabase
      .from('bus_lines')
      .select('id, line_number, line_name')

    if (error) {
      console.error('Erro ao buscar linhas:', error.message)
    } else {
      busLines.value = data
    }
  }

  const addBusLine = async (line_number, line_name) => {
    const { error } = await supabase.from('bus_lines').insert({
      line_number,
      line_name
    })

    if (error) {
      console.error('Erro ao adicionar linha:', error.message)
      throw error
    }

    await fetchBusLines()
  }

  return {
    busLines,
    fetchBusLines,
    addBusLine
  }
})
