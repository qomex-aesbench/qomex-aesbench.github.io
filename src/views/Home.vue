<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="animate__animated animate__fadeInUp">QoMEX 2026-AesBench</h1>
          <p class="subtitle animate__animated animate__fadeInUp animate__delay-1s">
            Expert-Level Image Aesthetics Perception Challenge
          </p>
          <p class="description animate__animated animate__fadeInUp animate__delay-1s">
            The effectiveness of Multimodal Large Language Models (MLLMs) on the highly abstract image aesthetics perception task remains underexplored. Join us to evaluate your models on AesBench, a systematically designed benchmark for evaluating aesthetic perception.
          </p>
          <div class="hero-actions animate__animated animate__fadeInUp animate__delay-2s">
            <template v-if="!isLoggedIn">
              <router-link to="/register" class="btn btn-primary btn-lg">
                Register Now
              </router-link>
            </template>
            <template v-else>
              <router-link to="/submit" class="btn btn-primary btn-lg">
                Submit Results
              </router-link>
            </template>
            <router-link to="/leaderboard" class="btn btn-secondary btn-lg">
              View Leaderboard
            </router-link>
          </div>
        </div>
        <div class="hero-image animate__animated animate__fadeInRight animate__delay-1s">
          <!-- Placeholder for a hero image -->
          <div class="placeholder-image">
            <el-icon :size="120" color="#fff"><Picture /></el-icon>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <div class="section-title">
          <h2>Competition Highlights</h2>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon><DataLine /></el-icon>
            </div>
            <h3>AesBench Dataset</h3>
            <p>2,800 diverse images annotated by experts, spanning natural scenes, artistic works, and AI-generated content.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon><Trophy /></el-icon>
            </div>
            <h3>Multimodal Evaluation</h3>
            <p>Evaluate AesP (Perception), AesE (Empathy), and AesA1 (Assessment) capabilities of MLLMs.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon><UserFilled /></el-icon>
            </div>
            <h3>Advance the Frontier</h3>
            <p>Contribute to advancing the frontier of aesthetic-aware multimodal intelligence.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="timeline-section">
      <div class="container">
        <div class="section-title">
          <h2>Timeline</h2>
        </div>
        <div class="timeline">
          <el-timeline>
            <el-timeline-item timestamp="2026-01-15" placement="top" type="primary">
              <div class="timeline-content">
                <h4>Grand Challenge Start</h4>
                <p>Release of Training Data, etc.</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2026-03-15" placement="top" type="warning">
              <div class="timeline-content">
                <h4>Test Data Released</h4>
                <p>Input Only data released for testing.</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2026-03-22" placement="top" type="danger">
              <div class="timeline-content">
                <h4>Submission Deadline</h4>
                <p>Test Output, Code, and Fact Sheet due.</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2026-04-01" placement="top" type="info">
              <div class="timeline-content">
                <h4>Initial Results Release</h4>
                <p>Preliminary evaluation results.</p>
              </div>
            </el-timeline-item>
             <el-timeline-item timestamp="2026-04-17" placement="top" type="info">
              <div class="timeline-content">
                <h4>Paper Deadline</h4>
                <p>Deadline for challenge paper submission.</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2026-06-15" placement="top" type="success">
              <div class="timeline-content">
                <h4>Winners Announced</h4>
                <p>Final results and winners announcement.</p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)
</script>

<style lang="scss" scoped>
.hero-section {
  background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
  color: white;
  padding: 120px 0 80px;
  min-height: 80vh;
  display: flex;
  align-items: center;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .hero-content {
    flex: 1;

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 20px;
      opacity: 0.9;
    }

    .description {
      font-size: 1.1rem;
      margin-bottom: 40px;
      opacity: 0.8;
      max-width: 600px;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 20px;
    }
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .placeholder-image {
      width: 400px;
      height: 400px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
  }
}

.features-section {
  padding: 80px 0;
  background: #f8f9fa;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-title {
    text-align: center;
    margin-bottom: 60px;

    h2 {
      font-size: 2.5rem;
      color: #333;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  .feature-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: white;
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: #333;
    }

    p {
      color: #666;
      line-height: 1.6;
    }
  }
}

.timeline-section {
  padding: 80px 0;
  background: white;

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-title {
    text-align: center;
    margin-bottom: 60px;
  }

  .timeline-content {
    h4 {
      margin: 0 0 5px;
      font-size: 1.2rem;
    }
    p {
      margin: 0;
      color: #666;
    }
  }
}

@media (max-width: 900px) {
  .hero-section {
    padding: 100px 0 60px;
    
    .container {
      flex-direction: column;
      text-align: center;
    }

    .hero-content {
      h1 {
        font-size: 2.5rem;
      }
      .description {
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        justify-content: center;
      }
    }
  }
}
</style>
