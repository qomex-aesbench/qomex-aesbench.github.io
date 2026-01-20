<template>
  <div class="leaderboard-page">
    <div class="container">
      <div class="page-header">
        <h1>Leaderboard</h1>
        <p>Top performing teams in the AesBench Challenge</p>
      </div>

      <div class="stats-cards" v-if="stats">
        <div class="stat-card">
          <div class="value">{{ stats.total_teams }}</div>
          <div class="label">Total Teams</div>
        </div>
        <div class="stat-card">
          <div class="value">{{ stats.total_submissions }}</div>
          <div class="label">Total Submissions</div>
        </div>
        <div class="stat-card">
          <div class="value">{{ stats.top_score }}</div>
          <div class="label">Latest Top Score</div>
        </div>
      </div>

      <div class="leaderboard-table-container">
        <el-table 
          :data="leaderboardData" 
          style="width: 100%" 
          v-loading="loading"
          stripe
        >
          <el-table-column prop="rank" label="Rank" width="80" align="center">
            <template #default="scope">
              <div class="rank-badge" :class="getRankClass(scope.row.rank)">
                {{ scope.row.rank }}
              </div>
            </template>
          </el-table-column>
          
          <el-table-column label="Team" min-width="200">
            <template #default="scope">
              <div class="team-info">
                <el-avatar :size="32" :src="scope.row.avatar_url">
                  {{ scope.row.team_name.charAt(0).toUpperCase() }}
                </el-avatar>
                <span class="team-name">{{ scope.row.team_name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="overall_score" label="Overall" width="120" sortable align="right">
            <template #default="scope">
              <span class="score">{{ formatScore(scope.row.overall_score) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="aesp_score" label="AesP" width="90" sortable align="right">
            <template #default="scope">
              <span class="score-detail">{{ formatScore(scope.row.aesp_score) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="aese_score" label="AesE" width="90" sortable align="right">
            <template #default="scope">
              <span class="score-detail">{{ formatScore(scope.row.aese_score) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="aesa1_score" label="AesA1" width="90" sortable align="right">
            <template #default="scope">
              <span class="score-detail">{{ formatScore(scope.row.aesa1_score) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="submission_count" label="Submissions" width="100" align="center" />

          <el-table-column prop="last_submission_at" label="Last Submission" width="180" align="right">
            <template #default="scope">
              {{ formatDate(scope.row.last_submission_at) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const leaderboardData = ref([])
const stats = ref(null)

// Mock data until API is fully ready or returns empty
const mockData = [
  { rank: 1, team_name: 'PixelPerfect', overall_score: 98.5, aesp_score: 97.0, aese_score: 99.0, aesa1_score: 99.5, submission_count: 12, last_submission_at: '2026-02-20T14:30:00' },
  { rank: 2, team_name: 'AestheticAI', overall_score: 97.2, aesp_score: 96.5, aese_score: 98.0, aesa1_score: 97.1, submission_count: 8, last_submission_at: '2026-02-19T10:15:00' },
  { rank: 3, team_name: 'VisionaryView', overall_score: 95.4, aesp_score: 94.0, aese_score: 96.0, aesa1_score: 96.2, submission_count: 23, last_submission_at: '2026-02-21T09:45:00' },
]

async function fetchLeaderboard() {
  loading.value = true
  try {
    const response = await api.leaderboard.get()
    // Backend returns { entries: [...], total: ..., updated_at: ... }
    leaderboardData.value = response.data.entries || response.data || []

    // Fallback to mock data if API returns empty list (for demo purposes)
    if (leaderboardData.value.length === 0) {
       // leaderboardData.value = mockData
    }

    const statsResponse = await api.leaderboard.getStats()
    stats.value = statsResponse.data
  } catch (error) {
    console.error('Failed to fetch leaderboard', error)
    // ElMessage.error('Failed to load leaderboard data') // Optional: suppress error on init if backend not ready
  } finally {
    loading.value = false
  }
}

function getRankClass(rank) {
  if (rank === 1) return 'rank-1'
  if (rank === 2) return 'rank-2'
  if (rank === 3) return 'rank-3'
  return ''
}

function formatScore(score) {
  return Number(score).toFixed(4)
}

function formatDate(dateString) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  fetchLeaderboard()
})
</script>

<style lang="scss" scoped>
.leaderboard-page {
  padding: 40px 0;
  background: #f8f9fa;
  min-height: 100%;

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .value {
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 5px;
    }

    .label {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
}

.leaderboard-table-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.rank-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0 auto;

  &.rank-1 {
    background: #ffd700;
    color: white;
    box-shadow: 0 2px 5px rgba(255, 215, 0, 0.4);
  }

  &.rank-2 {
    background: #c0c0c0;
    color: white;
  }

  &.rank-3 {
    background: #cd7f32;
    color: white;
  }
}

.team-info {
  display: flex;
  align-items: center;
  gap: 12px;

  .team-name {
    font-weight: 500;
    color: #333;
  }
}

.score {
  font-family: monospace;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.score-detail {
  font-family: monospace;
  font-weight: 500;
  font-size: 0.95rem;
  color: #666;
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
