<template>
    <v-sheet class="mx-auto" width="400">
      <v-form @submit.prevent="handleAdd">
        <v-text-field
          v-model="line_number"
          label="Número da Linha"
          type="number"
          :rules="[v => !!v || 'Informe o número da linha']"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="line_name"
          label="Nome da Linha"
          :rules="[v => !!v || 'Informe o nome da linha']"
          required
        ></v-text-field>
  
        <v-btn type="submit" class="mt-2" block color="primary">
          Adicionar Linha
        </v-btn>
      </v-form>
  
      <v-divider class="my-4"></v-divider>
  
      <v-list>
        <v-list-subheader>Linhas Registradas</v-list-subheader>
        <v-list-item
          v-for="line in busLineStore.busLines"
          :key="line.id"
          :title="`#${line.line_number} - ${line.line_name}`"
        />
      </v-list>
    </v-sheet>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useBusLineStore } from '@/stores/busLineStore'
  
  const line_number = ref('')
  const line_name = ref('')
  
  const busLineStore = useBusLineStore()
  
  onMounted(() => {
    busLineStore.fetchBusLines()
  })
  
  const handleAdd = async () => {
    try {
      await busLineStore.addBusLine(parseInt(line_number.value), line_name.value)
      alert('Linha adicionada com sucesso!')
      line_number.value = ''
      line_name.value = ''
    } catch {
      alert('Erro ao adicionar linha.')
    }
  }
  </script>
  