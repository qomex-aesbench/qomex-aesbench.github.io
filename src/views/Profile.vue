<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-section">
            <el-avatar :size="100" class="profile-avatar">
              {{ form.username.charAt(0).toUpperCase() }}
            </el-avatar>
          </div>
          <h1>{{ form.username }}</h1>
          <p class="role-badge">Participant</p>
        </div>

        <div class="profile-form">
          <el-form :model="form" label-position="top">
            <div class="form-grid">
              <el-form-item label="Username">
                <el-input v-model="form.username" disabled />
              </el-form-item>
              
              <el-form-item label="Email">
                <el-input v-model="form.email" disabled />
              </el-form-item>

              <el-form-item label="Full Name">
                <el-input v-model="form.full_name" placeholder="Your Full Name" />
              </el-form-item>

              <el-form-item label="Institution">
                <el-input v-model="form.institution" placeholder="University or Company" />
              </el-form-item>
              
              <el-form-item label="Country">
                 <el-input v-model="form.country" placeholder="Country" />
              </el-form-item>
            </div>

            <el-form-item label="Bio">
              <el-input 
                v-model="form.bio" 
                type="textarea" 
                :rows="4" 
                placeholder="Tell us a bit about yourself..." 
              />
            </el-form-item>

            <div class="form-actions">
              <el-button type="primary" :loading="loading" @click="saveProfile">
                Save Changes
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  username: '',
  email: '',
  full_name: '',
  institution: '',
  country: '',
  bio: ''
})

onMounted(() => {
  if (userStore.user) {
    Object.assign(form, userStore.user)
  }
})

async function saveProfile() {
  loading.value = true
  const result = await userStore.updateProfile({
    full_name: form.full_name,
    institution: form.institution,
    country: form.country,
    bio: form.bio
  })
  
  if (result.success) {
    ElMessage.success('Profile updated successfully')
  } else {
    ElMessage.error(result.message)
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 40px 0;
  background: #f4f6f8;
  min-height: 100%;

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.profile-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .profile-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 40px 20px 30px;
    text-align: center;
    color: white;

    .profile-avatar {
      background: white;
      color: #667eea;
      font-size: 2.5rem;
      font-weight: 700;
      border: 4px solid rgba(255, 255, 255, 0.3);
      margin-bottom: 15px;
    }

    h1 {
      margin: 0 0 5px;
      font-size: 2rem;
    }

    .role-badge {
      opacity: 0.8;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }
  }

  .profile-form {
    padding: 40px;

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-actions {
      margin-top: 30px;
      text-align: right;
    }
  }
}

@media (max-width: 600px) {
  .profile-form .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
