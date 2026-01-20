<template>
  <div class="team-page">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <el-skeleton :rows="10" animated />
      </div>

      <template v-else>
        <!-- No Team State -->
        <div v-if="!hasTeam" class="no-team-state">
          <div class="state-header">
            <h1>Team Management</h1>
            <p>You are not currently in a team. Create one or join an existing one to participate.</p>
          </div>

          <div class="action-cards">
            <div class="action-card create">
              <div class="icon-wrapper">
                <el-icon><Plus /></el-icon>
              </div>
              <h2>Create a Team</h2>
              <p>Start a new team and invite others to join you.</p>
              
              <el-form :model="createForm" @submit.prevent="handleCreateTeam">
                <el-form-item>
                  <el-input v-model="createForm.name" placeholder="Team Name" />
                </el-form-item>
                <el-button type="primary" class="w-100" @click="handleCreateTeam" :loading="actionLoading">
                  Create Team
                </el-button>
              </el-form>
            </div>

            <div class="divider">OR</div>

            <div class="action-card join">
              <div class="icon-wrapper">
                <el-icon><Connection /></el-icon>
              </div>
              <h2>Join a Team</h2>
              <p>Enter an invite code to join an existing team.</p>
              
              <el-form :model="joinForm" @submit.prevent="handleJoinTeam">
                <el-form-item>
                  <el-input v-model="joinForm.inviteCode" placeholder="Invite Code" />
                </el-form-item>
                <el-button type="success" class="w-100" @click="handleJoinTeam" :loading="actionLoading">
                  Join Team
                </el-button>
              </el-form>
            </div>
          </div>
        </div>

        <!-- Team Dashboard State -->
        <div v-else class="team-dashboard">
          <div class="dashboard-header">
            <div class="team-identity">
              <el-avatar :size="64" class="team-avatar">
                {{ team.name.charAt(0).toUpperCase() }}
              </el-avatar>
              <div>
                <h1>{{ team.name }}</h1>
                <div class="team-meta">
                  <span class="member-count">
                    <el-icon><User /></el-icon> {{ team.members?.length || 1 }} Members
                  </span>
                  <span class="invite-code" v-if="team.invite_code" @click="copyInviteCode">
                    Code: {{ team.invite_code }} <el-icon><CopyDocument /></el-icon>
                  </span>
                </div>
              </div>
            </div>
            
            <div class="team-actions">
              <el-button v-if="isLeader" type="primary" plain @click="regenerateCode">
                New Invite Code
              </el-button>
              <el-button v-if="isLeader" type="danger" plain @click="confirmDisband">
                Disband Team
              </el-button>
              <el-button v-else type="warning" plain @click="confirmLeave">
                Leave Team
              </el-button>
            </div>
          </div>

          <div class="dashboard-content">
            <div class="main-column">
              <div class="section-card members-section">
                <h3>Team Members</h3>
                <el-table :data="team.members" stripe style="width: 100%">
                  <el-table-column label="Member">
                    <template #default="scope">
                      <div class="member-info">
                        <el-avatar :size="32">{{ scope.row.username.charAt(0).toUpperCase() }}</el-avatar>
                        <span>{{ scope.row.username }}</span>
                        <el-tag size="small" v-if="scope.row.id === team.leader_id" type="warning">Leader</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="email" label="Email" />
                  <el-table-column prop="institution" label="Institution" />
                </el-table>
              </div>

              <div class="section-card submissions-section">
                <div class="section-header">
                  <h3>Recent Submissions</h3>
                  <router-link to="/submit" class="btn-link">New Submission</router-link>
                </div>
                <!-- Placeholder for submissions list, could be a separate component or fetched here -->
                <el-empty description="No submissions yet" v-if="!submissions || submissions.length === 0" />
                <el-table v-else :data="submissions" style="width: 100%">
                  <el-table-column prop="id" label="ID" width="80" />
                  <el-table-column prop="filename" label="File" />
                  <el-table-column prop="overall_score" label="Score" />
                  <el-table-column prop="submitted_at" label="Date">
                     <template #default="scope">
                        {{ new Date(scope.row.submitted_at).toLocaleString() }}
                     </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team'
import { useUserStore } from '@/stores/user'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Connection, User, CopyDocument } from '@element-plus/icons-vue'

const teamStore = useTeamStore()
const userStore = useUserStore()

const loading = ref(true)
const actionLoading = ref(false)
const submissions = ref([])

const createForm = reactive({ name: '' })
const joinForm = reactive({ inviteCode: '' })

const team = computed(() => teamStore.team)
const hasTeam = computed(() => teamStore.hasTeam)
const isLeader = computed(() => teamStore.isLeader)

async function loadData() {
  loading.value = true
  await teamStore.fetchMyTeam()
  if (hasTeam.value) {
    try {
      const subRes = await api.submissions.getTeamSubmissions({ limit: 5 })
      submissions.value = subRes.data
    } catch (e) {
      console.error('Failed to load submissions', e)
    }
  }
  loading.value = false
}

async function handleCreateTeam() {
  if (!createForm.name) return ElMessage.warning('Please enter a team name')
  
  actionLoading.value = true
  const result = await teamStore.createTeam(createForm)
  if (result.success) {
    ElMessage.success('Team created successfully')
  } else {
    ElMessage.error(result.message)
  }
  actionLoading.value = false
}

async function handleJoinTeam() {
  if (!joinForm.inviteCode) return ElMessage.warning('Please enter an invite code')
  
  actionLoading.value = true
  const result = await teamStore.joinTeam(joinForm.inviteCode)
  if (result.success) {
    ElMessage.success('Joined team successfully')
    await loadData() // Reload to get full team data
  } else {
    ElMessage.error(result.message)
  }
  actionLoading.value = false
}

async function copyInviteCode() {
  if (team.value?.invite_code) {
    try {
      await navigator.clipboard.writeText(team.value.invite_code)
      ElMessage.success('Invite code copied to clipboard')
    } catch (err) {
      ElMessage.error('Failed to copy')
    }
  }
}

async function regenerateCode() {
  const result = await teamStore.regenerateCode(team.value.id)
  if (result.success) {
    ElMessage.success('Invite code updated')
  } else {
    ElMessage.error(result.message)
  }
}

function confirmLeave() {
  ElMessageBox.confirm(
    'Are you sure you want to leave this team?',
    'Warning',
    {
      confirmButtonText: 'Leave',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    const result = await teamStore.leaveTeam()
    if (result.success) {
      ElMessage.success('Left team')
      // Reset local state if needed
    } else {
      ElMessage.error(result.message)
    }
  })
}

function confirmDisband() {
  ElMessageBox.confirm(
    'Are you sure you want to disband this team? This action cannot be undone.',
    'Warning',
    {
      confirmButtonText: 'Disband',
      cancelButtonText: 'Cancel',
      type: 'error',
    }
  ).then(async () => {
    const result = await teamStore.disbandTeam(team.value.id)
    if (result.success) {
      ElMessage.success('Team disbanded')
    } else {
      ElMessage.error(result.message)
    }
  })
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.team-page {
  padding: 40px 0;
  background: #f4f6f8;
  min-height: 100%;

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.no-team-state {
  max-width: 900px;
  margin: 0 auto;

  .state-header {
    text-align: center;
    margin-bottom: 50px;

    h1 {
      font-size: 2.5rem;
      color: #333;
    }
    p {
      color: #666;
      font-size: 1.1rem;
    }
  }

  .action-cards {
    display: flex;
    align-items: center;
    gap: 30px;

    .divider {
      font-weight: bold;
      color: #999;
    }

    .action-card {
      flex: 1;
      background: white;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

      .icon-wrapper {
        width: 60px;
        height: 60px;
        background: #f0f2f5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 1.5rem;
      }

      h2 {
        margin-bottom: 10px;
        color: #333;
      }
      
      p {
        color: #666;
        margin-bottom: 25px;
        height: 40px; 
      }

      &.create .icon-wrapper { color: #409eff; background: rgba(64, 158, 255, 0.1); }
      &.join .icon-wrapper { color: #67c23a; background: rgba(103, 194, 58, 0.1); }
    }
  }
}

.team-dashboard {
  .dashboard-header {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .team-identity {
      display: flex;
      align-items: center;
      gap: 20px;

      .team-avatar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-size: 1.5rem;
        font-weight: 700;
      }

      h1 {
        margin: 0 0 5px;
        font-size: 2rem;
      }

      .team-meta {
        display: flex;
        gap: 20px;
        color: #666;
        font-size: 0.95rem;

        .invite-code {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          
          &:hover {
            color: #667eea;
          }
        }
      }
    }
  }

  .dashboard-content {
    .section-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      margin-bottom: 30px;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h3 {
          margin: 0;
          font-size: 1.25rem;
        }

        .btn-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          &:hover { text-decoration: underline; }
        }
      }
    }
  }

  .member-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

@media (max-width: 900px) {
  .no-team-state .action-cards {
    flex-direction: column;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    
    .team-identity {
      flex-direction: column;
    }
  }
}
</style>
