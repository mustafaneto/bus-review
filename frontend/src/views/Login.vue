<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/lib/supabaseClient'

const router = useRouter()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      router.push('/home')
    }
  })
})

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) console.error('Login error:', error.message)
}
</script>

<template>
  <button @click="loginWithGoogle">Sign in with Google</button>
</template>
