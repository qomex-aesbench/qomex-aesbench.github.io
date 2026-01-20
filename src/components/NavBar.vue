<template>
  <header class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <router-link to="/" class="logo">
        <div class="logo-icon">A</div>
        <span class="logo-text">AesBench</span>
      </router-link>

      <nav class="nav-links" :class="{ 'active': mobileMenuOpen }">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/data" class="nav-link">Data</router-link>
        <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
        <router-link v-if="isLoggedIn" to="/submit" class="nav-link">Submit</router-link>
        <router-link v-if="isLoggedIn" to="/team" class="nav-link">Team</router-link>
      </nav>

      <div class="nav-actions">
        <template v-if="isLoggedIn">
          <el-dropdown @command="handleCommand">
            <div class="user-menu">
              <el-avatar :size="36" :style="{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">
                {{ userInitial }}
              </el-avatar>
              <span class="username">{{ user?.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon> Profile
                </el-dropdown-item>
                <el-dropdown-item command="team">
                  <el-icon><UserFilled /></el-icon> My Team
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon> Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost">Login</router-link>
          <router-link to="/register" class="btn btn-primary">Register</router-link>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
        <el-icon :size="24"><Menu /></el-icon>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.user)
const userInitial = computed(() => user.value?.username?.[0]?.toUpperCase() || 'U')

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function handleCommand(command) {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'team':
      router.push('/team')
      break
    case 'logout':
      userStore.logout()
      router.push('/')
      break
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;

  &.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-bottom-color: rgba(0, 0, 0, 0.05);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    max-width: 1400px;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1.25rem;

  &-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
  }

  &-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;

  .nav-link {
    padding: 8px 16px;
    color: #555;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    &.router-link-active {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 24px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  .username {
    font-weight: 500;
    color: #333;
  }
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: white;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    &.active {
      display: flex;
    }

    .nav-link {
      width: 100%;
      padding: 12px 16px;
    }
  }

  .nav-actions {
    .btn {
      display: none;
    }
  }

  .mobile-menu-btn {
    display: block;
  }
}
</style>
