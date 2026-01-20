<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-left">
        <div class="auth-brand">
          <router-link to="/" class="logo">
            <div class="logo-icon">A</div>
            <span>AesBench</span>
          </router-link>
        </div>
        <div class="auth-hero">
          <h1>Welcome Back</h1>
          <p>Sign in to access the QoMEX 2026 Expert-Level Image Aesthetics Perception Challenge</p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">2,800</span>
              <span class="stat-label">Images</span>
            </div>
            <div class="stat">
              <span class="stat-value">4</span>
              <span class="stat-label">Dimensions</span>
            </div>
            <div class="stat">
              <span class="stat-value">15+</span>
              <span class="stat-label">MLLMs Tested</span>
            </div>
          </div>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-form-container">
          <h2>Sign In</h2>
          <p class="auth-subtitle">Enter your credentials to continue</p>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            @submit.prevent="handleSubmit"
          >
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                size="large"
                :prefix-icon="Message"
              />
            </el-form-item>

            <el-form-item label="Password" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                size="large"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                native-type="submit"
                size="large"
                :loading="loading"
                class="submit-btn"
              >
                Sign In
              </el-button>
            </el-form-item>
          </el-form>

          <div class="auth-footer">
            <span>Don't have an account?</span>
            <router-link to="/register">Register now</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' }
  ]
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true

  const result = await userStore.login(form.email, form.password)

  loading.value = false

  if (result.success) {
    ElMessage.success('Login successful!')
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-container {
  display: flex;
  min-height: 100vh;
}

.auth-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  color: white;

  .auth-brand {
    margin-bottom: auto;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5rem;
      font-weight: 700;
      color: white;

      .logo-icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .auth-hero {
    margin: auto 0;
    max-width: 500px;

    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-family: 'Playfair Display', serif;
    }

    p {
      font-size: 1.1rem;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 40px;
    }
  }

  .hero-stats {
    display: flex;
    gap: 40px;

    .stat {
      display: flex;
      flex-direction: column;

      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        font-family: 'Playfair Display', serif;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-top: 4px;
      }
    }
  }
}

.auth-right {
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.auth-form-container {
  width: 100%;
  max-width: 400px;

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 8px;
  }

  .auth-subtitle {
    color: #666;
    margin-bottom: 30px;
  }
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  margin-top: 10px;
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
  color: #666;

  a {
    color: #667eea;
    font-weight: 500;
    margin-left: 6px;

    &:hover {
      text-decoration: underline;
    }
  }
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input__wrapper) {
  padding: 4px 15px;
}

@media (max-width: 900px) {
  .auth-container {
    flex-direction: column;
  }

  .auth-left {
    padding: 30px;
    min-height: auto;

    .auth-hero {
      h1 {
        font-size: 2rem;
      }
    }

    .hero-stats {
      gap: 24px;

      .stat-value {
        font-size: 1.8rem;
      }
    }
  }

  .auth-right {
    padding: 30px;
  }
}
</style>
