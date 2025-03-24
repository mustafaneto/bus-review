<template>
    <button @click="loginWithGoogle">
      Sign in with Google
    </button>
  </template>
  
  <script setup>
  import supabase from '@/lib/supabaseClient'
  
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) {
      console.error('Login error:', error.message)
    }
  }
  </script>
  