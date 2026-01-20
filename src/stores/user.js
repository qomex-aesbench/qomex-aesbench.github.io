import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value)
  const hasTeam = computed(() => !!user.value?.team_id)

  async function login(email, password) {
    loading.value = true
    try {
      const response = await api.auth.login({ email, password })
      token.value = response.data.access_token
      localStorage.setItem('token', token.value)
      await fetchUser()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Login failed'
      }
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    try {
      await api.auth.register(userData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Registration failed'
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const response = await api.users.getMe()
      user.value = response.data
    } catch (error) {
      if (error.response?.status === 401) {
        logout()
      }
    }
  }

  async function updateProfile(data) {
    try {
      const response = await api.users.updateMe(data)
      user.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Update failed'
      }
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  // Initialize - fetch user if token exists
  if (token.value) {
    fetchUser()
  }

  return {
    user,
    token,
    loading,
    isLoggedIn,
    hasTeam,
    login,
    register,
    fetchUser,
    updateProfile,
    logout
  }
})
