<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <div class="logo-icon">A</div>
            <span>AesBench</span>
          </div>
          <p class="footer-desc">
            QoMEX 2026 Expert-Level Image Aesthetics Perception Challenge
          </p>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/data">Data</router-link></li>
            <li><router-link to="/leaderboard">Leaderboard</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://arxiv.org/abs/2401.08276" target="_blank">Paper</a></li>
            <li><a href="https://github.com/yipoh/AesBench" target="_blank">GitHub</a></li>
            <li><router-link to="/data">Dataset</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Organizers</h4>
          <ul class="organizers">
            <li>Chang'an University</li>
            <li>Xidian University</li>
            <li>Nanyang Technological University</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 AesBench Challenge. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="mailto:yphuang@chd.edu.cn">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 60px 0 30px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #fff;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 10px;

      a {
        color: rgba(255, 255, 255, 0.7);
        transition: color 0.2s ease;

        &:hover {
          color: #667eea;
        }
      }
    }
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
  }
}

.footer-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 300px;
}

.organizers li {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }
}

.footer-links {
  display: flex;
  gap: 24px;

  a {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    transition: color 0.2s ease;

    &:hover {
      color: #667eea;
    }
  }
}

@media (max-width: 900px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
