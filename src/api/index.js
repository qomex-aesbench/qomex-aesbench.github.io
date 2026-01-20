import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

const api = {
  auth: {
    register: (data) => instance.post('/auth/register', data),
    login: (data) => instance.post('/auth/login', data),
    logout: () => instance.post('/auth/logout')
  },
  users: {
    getMe: () => instance.get('/users/me'),
    updateMe: (data) => instance.put('/users/me', data),
    getUser: (id) => instance.get(`/users/${id}`)
  },
  teams: {
    list: (params) => instance.get('/teams', { params }),
    create: (data) => instance.post('/teams', data),
    getMyTeam: () => instance.get('/teams/my-team'),
    update: (id, data) => instance.put(`/teams/${id}`, data),
    join: (inviteCode) => instance.post('/teams/join', { invite_code: inviteCode }),
    leave: () => instance.post('/teams/leave'),
    regenerateCode: (id) => instance.post(`/teams/${id}/regenerate-code`),
    disband: (id) => instance.delete(`/teams/${id}`)
  },
  submissions: {
    submit: (file) => {
      const formData = new FormData()
      formData.append('file', file)
      return instance.post('/submissions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    },
    list: (params) => instance.get('/submissions', { params }),
    getTeamSubmissions: (params) => instance.get('/submissions/team', { params }),
    get: (id) => instance.get(`/submissions/${id}`),
    getRemainingToday: () => instance.get('/submissions/remaining-today')
  },
  leaderboard: {
    get: (params) => instance.get('/leaderboard', { params }),
    getTeamRank: (teamId) => instance.get(`/leaderboard/team/${teamId}`),
    getStats: () => instance.get('/leaderboard/stats')
  },
  data: {
    getInfo: () => instance.get('/data/info'),
    getSample: () => instance.get('/data/sample'),
    download: (filename) => instance.get(`/data/download/${filename}`, { responseType: 'blob' }),
    getTemplate: () => instance.get('/data/submission-template', { responseType: 'blob' })
  }
}

export default api
