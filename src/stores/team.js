import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

export const useTeamStore = defineStore('team', () => {
  const team = ref(null)
  const loading = ref(false)

  const hasTeam = computed(() => !!team.value)
  const isLeader = computed(() => {
    if (!team.value) return false
    const userStore = useUserStore()
    return team.value.leader_id === userStore.user?.id
  })

  async function fetchMyTeam() {
    loading.value = true
    try {
      const response = await api.teams.getMyTeam()
      team.value = response.data
      return { success: true }
    } catch (error) {
      if (error.response?.status === 404) {
        team.value = null
      }
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to fetch team'
      }
    } finally {
      loading.value = false
    }
  }

  async function createTeam(teamData) {
    loading.value = true
    try {
      const response = await api.teams.create(teamData)
      team.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to create team'
      }
    } finally {
      loading.value = false
    }
  }

  async function joinTeam(inviteCode) {
    loading.value = true
    try {
      const response = await api.teams.join(inviteCode)
      team.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to join team'
      }
    } finally {
      loading.value = false
    }
  }

  async function leaveTeam() {
    loading.value = true
    try {
      await api.teams.leave()
      team.value = null
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to leave team'
      }
    } finally {
      loading.value = false
    }
  }

  async function updateTeam(teamId, data) {
    loading.value = true
    try {
      const response = await api.teams.update(teamId, data)
      team.value = { ...team.value, ...response.data }
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to update team'
      }
    } finally {
      loading.value = false
    }
  }

  async function regenerateCode(teamId) {
    try {
      const response = await api.teams.regenerateCode(teamId)
      if (team.value) {
        team.value.invite_code = response.data.invite_code
      }
      return { success: true, code: response.data.invite_code }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to regenerate code'
      }
    }
  }

  async function disbandTeam(teamId) {
    loading.value = true
    try {
      await api.teams.disband(teamId)
      team.value = null
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to disband team'
      }
    } finally {
      loading.value = false
    }
  }

  function clearTeam() {
    team.value = null
  }

  return {
    team,
    loading,
    hasTeam,
    isLeader,
    fetchMyTeam,
    createTeam,
    joinTeam,
    leaveTeam,
    updateTeam,
    regenerateCode,
    disbandTeam,
    clearTeam
  }
})

import { useUserStore } from './user'
