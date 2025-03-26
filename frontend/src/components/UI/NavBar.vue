<template>
  <v-card>
    <v-layout>
      <v-app-bar color="indigo-darken-1">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Avalia FAOL</v-toolbar-title>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-menu>
          <template #activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
          </template>

          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
            @click="drawer = false"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main min-height="100vh">
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import supabase from '@/lib/supabaseClient'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Início',
        to: '/',
      },
      {
        title: 'Avaliações',
        to: '/reviews',
      },
      {
        title: 'Ônibus',
        to: '/bus',
      },
      {
        title: 'Ponto de Ônibus',
        to: '/stop',
      },
      {
        title: 'Horário de Chegada',
        to: '/arrival',
      },
      {
        title: 'Horário de Partida',
        to: '/departure',
      },
      {
        title: 'Linha',
        to: '/line',
      }
    ],
  }),

  setup() {
    const router = useRouter()

    const logout = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error.message)
      } else {
        router.push('/') 
      }
    }

    return { logout }
  },

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
