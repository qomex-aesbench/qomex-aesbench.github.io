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
          <h1>Join the Challenge</h1>
          <p>Register to participate in the QoMEX 2026 Expert-Level Image Aesthetics Perception Challenge</p>
          <div class="hero-features">
            <div class="feature">
              <el-icon><Check /></el-icon>
              <span>Access benchmark datasets</span>
            </div>
            <div class="feature">
              <el-icon><Check /></el-icon>
              <span>Submit your model results</span>
            </div>
            <div class="feature">
              <el-icon><Check /></el-icon>
              <span>Compete on the leaderboard</span>
            </div>
          </div>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-form-container">
          <h2>Create Account</h2>
          <p class="auth-subtitle">Fill in your details to get started</p>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            @submit.prevent="handleRegister"
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

            <el-form-item prop="username">
              <template #label>
                <span>Username</span>
                <el-tooltip placement="top">
                  <template #content>
                    <div class="tooltip-content">
                      <p>Username requirements:</p>
                      <ul>
                        <li>3-20 characters</li>
                        <li>Only letters, numbers, and underscores</li>
                        <li>No spaces or special characters</li>
                      </ul>
                    </div>
                  </template>
                  <el-icon class="info-icon"><InfoFilled /></el-icon>
                </el-tooltip>
              </template>
              <el-input
                v-model="form.username"
                placeholder="your_username"
                size="large"
                :prefix-icon="User"
              />
              <div class="field-hint">
                <span :class="{ valid: usernameChecks.length }">3-20 characters</span>
                <span :class="{ valid: usernameChecks.chars }">Letters, numbers, underscores only</span>
              </div>
            </el-form-item>

            <el-form-item prop="password">
              <template #label>
                <span>Password</span>
                <el-tooltip placement="top">
                  <template #content>
                    <div class="tooltip-content">
                      <p>Password requirements:</p>
                      <ul>
                        <li>8-50 characters</li>
                        <li>At least one letter</li>
                        <li>At least one number</li>
                      </ul>
                    </div>
                  </template>
                  <el-icon class="info-icon"><InfoFilled /></el-icon>
                </el-tooltip>
              </template>
              <el-input
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                size="large"
                :prefix-icon="Lock"
                show-password
              />
              <div class="field-hint">
                <span :class="{ valid: passwordChecks.length }">8-50 characters</span>
                <span :class="{ valid: passwordChecks.hasLetter }">Contains letter</span>
                <span :class="{ valid: passwordChecks.hasNumber }">Contains number</span>
              </div>
            </el-form-item>

            <el-form-item label="Confirm Password" prop="confirmPassword">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm your password"
                size="large"
                :prefix-icon="Lock"
                show-password
              />
              <div class="field-hint" v-if="form.confirmPassword">
                <span :class="{ valid: form.password === form.confirmPassword }">
                  {{ form.password === form.confirmPassword ? 'Passwords match' : 'Passwords do not match' }}
                </span>
              </div>
            </el-form-item>

            <el-form-item label="Full Name (Optional)" prop="full_name">
              <el-input
                v-model="form.full_name"
                placeholder="Your full name"
                size="large"
              />
            </el-form-item>

            <el-form-item label="Institution (Optional)" prop="institution">
              <el-input
                v-model="form.institution"
                placeholder="Your university or organization"
                size="large"
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
                Create Account
              </el-button>
            </el-form-item>
          </el-form>

          <div class="auth-footer">
            <span>Already have an account?</span>
            <router-link to="/login">Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { Message, User, Lock, Check, InfoFilled } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  full_name: '',
  institution: ''
})

// Real-time validation checks
const usernameChecks = computed(() => ({
  length: form.username.length >= 3 && form.username.length <= 20,
  chars: /^[a-zA-Z0-9_]*$/.test(form.username) && form.username.length > 0
}))

const passwordChecks = computed(() => ({
  length: form.password.length >= 8 && form.password.length <= 50,
  hasLetter: /[A-Za-z]/.test(form.password),
  hasNumber: /\d/.test(form.password)
}))

// Validation rules
const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Please enter username'))
  } else if (value.length < 3) {
    callback(new Error('Username must be at least 3 characters'))
  } else if (value.length > 20) {
    callback(new Error('Username must be at most 20 characters'))
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback(new Error('Username can only contain letters, numbers and underscores'))
  } else {
    callback()
  }
}

const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Please enter password'))
  } else if (value.length < 8) {
    callback(new Error('Password must be at least 8 characters'))
  } else if (value.length > 50) {
    callback(new Error('Password must be at most 50 characters'))
  } else if (!/[A-Za-z]/.test(value)) {
    callback(new Error('Password must contain at least one letter'))
  } else if (!/\d/.test(value)) {
    callback(new Error('Password must contain at least one number'))
  } else {
    if (form.confirmPassword) {
      formRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Please confirm your password'))
  } else if (value !== form.password) {
    callback(new Error('Passwords do not match'))
  } else {
    callback()
  }
}

const rules = {
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  username: [
    { required: true, validator: validateUsername, trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

async function handleRegister() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true

  const result = await userStore.register({
    email: form.email,
    username: form.username,
    password: form.password,
    full_name: form.full_name || null,
    institution: form.institution || null
  })

  loading.value = false

  if (result.success) {
    ElMessage.success('Registration successful! Please login.')
    router.push('/login')
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
      margin-bottom: 30px;
    }
  }

  .hero-features {
    .feature {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      font-size: 1rem;

      .el-icon {
        width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
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
  overflow-y: auto;
}

.auth-form-container {
  width: 100%;
  max-width: 440px;

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

.info-icon {
  margin-left: 6px;
  color: #909399;
  cursor: help;
}

.tooltip-content {
  p {
    margin-bottom: 8px;
    font-weight: 500;
  }
  ul {
    margin: 0;
    padding-left: 16px;
    li {
      margin-bottom: 4px;
    }
  }
}

.field-hint {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
  font-size: 12px;

  span {
    color: #909399;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: '○';
      font-size: 8px;
    }

    &.valid {
      color: #67c23a;

      &::before {
        content: '●';
      }
    }
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
  display: flex;
  align-items: center;
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
  }

  .auth-right {
    padding: 30px;
  }
}
</style>
