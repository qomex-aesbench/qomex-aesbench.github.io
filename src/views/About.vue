<template>
  <div class="about-page">
    <div class="container">
      <div class="content-card">
        <h1>About the Competition</h1>
        
        <div class="section">
          <h2>Overview</h2>
          <p>
            The QoMEX 2026-AesBench Competition introduces AesBench, a systematically designed benchmark for evaluating the aesthetic perception abilities of Multimodal Large Language Models (MLLMs). It challenges participants to use MLLMs to perform tasks related to aesthetic perception, empathy, and assessment on a diverse collection of 2,800 expert-annotated images.
          </p>
        </div>

        <div class="section">
          <h2>Goals</h2>
          <ul>
            <li>Evaluate MLLM performance on aesthetic perception (AesP), empathy (AesE), and assessment (AesA1).</li>
            <li>Foster innovation in computational aesthetics and aesthetic-aware multimodal intelligence.</li>
            <li>Promote the development of novel evaluation frameworks integrating Quality of Multimedia Experience (QoME).</li>
          </ul>
        </div>

        <div class="section">
          <h2>Organizers</h2>
          <div class="organizers-grid">
            <div class="organizer-card">
              <div class="organizer-info">
                <h3>Yipo Huang</h3>
                <p class="affiliation">Chang'an University</p>
                <a href="mailto:yphuang@chd.edu.cn" class="email">yphuang@chd.edu.cn</a>
                <a href="https://js.chd.edu.cn/sjkxyrgzn/hyp1/list.htm" target="_blank" class="link">Homepage</a>
              </div>
            </div>
            <div class="organizer-card">
              <div class="organizer-info">
                <h3>Pengfei Chen</h3>
                <p class="affiliation">Xidian University</p>
                <a href="mailto:chenpengfei@xidian.edu.cn" class="email">chenpengfei@xidian.edu.cn</a>
                <a href="https://scholar.google.com.hk/citations?user=LXEuY3IAAAAJ&hl=zh-CN" target="_blank" class="link">Homepage</a>
              </div>
            </div>
            <div class="organizer-card">
              <div class="organizer-info">
                <h3>Xiangfei Sheng</h3>
                <p class="affiliation">Xidian University</p>
                <a href="mailto:xiangfeisheng@gmail.com" class="email">xiangfeisheng@gmail.com</a>
                <a href="https://github.com/sxfly99" target="_blank" class="link">Homepage</a>
              </div>
            </div>
             <div class="organizer-card">
              <div class="organizer-info">
                <h3>Zhichao Yang</h3>
                <p class="affiliation">Xidian University</p>
                <a href="mailto:yangzhichao@stu.xidian.edu.cn" class="email">yangzhichao@stu.xidian.edu.cn</a>
                <a href="https://github.com/yzc-ippl" target="_blank" class="link">Homepage</a>
              </div>
            </div>
          </div>
        </div>

        <div class="section contact">
          <h2>Contact Us</h2>
          <p>
            For more information, please refer to the paper <a href="https://arxiv.org/abs/2401.08276" target="_blank">arXiv:2401.08276</a> or contact the organizers listed above.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  padding: 40px 0;
  background: #f4f6f8;
  min-height: 100%;

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.content-card {
  background: white;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    text-align: center;
    color: #333;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.5rem;
      color: #444;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
    }

    p {
      color: #555;
      line-height: 1.8;
      font-size: 1.1rem;
    }

    ul {
      list-style-type: disc;
      padding-left: 20px;
      color: #555;
      line-height: 1.8;
      font-size: 1.1rem;

      li {
        margin-bottom: 10px;
      }
    }
  }

  .prizes-grid {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 30px;

    .prize-card {
      text-align: center;
      padding: 30px;
      border-radius: 10px;
      width: 150px;
      background: #f9f9f9;
      border: 1px solid #eee;

      &.gold {
        color: #d4af37;
        border-color: #d4af37;
        background: rgba(212, 175, 55, 0.05);
      }
      &.silver {
        color: #c0c0c0;
        border-color: #c0c0c0;
        background: rgba(192, 192, 192, 0.05);
      }
      &.bronze {
        color: #cd7f32;
        border-color: #cd7f32;
        background: rgba(205, 127, 50, 0.05);
      }

      h3 {
        margin: 15px 0 5px;
        font-size: 1.2rem;
      }

      p {
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }

  .organizers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .organizer-card {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      border: 1px solid #eee;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        border-color: #667eea;
      }

      h3 {
        margin: 0 0 5px;
        font-size: 1.2rem;
        color: #333;
      }

      .affiliation {
        color: #666;
        font-size: 0.95rem;
        margin-bottom: 15px;
        font-weight: 500;
      }

      a {
        display: block;
        color: #667eea;
        text-decoration: none;
        font-size: 0.9rem;
        margin-bottom: 5px;
        
        &:hover {
          text-decoration: underline;
        }

        &.email {
          color: #555;
          margin-bottom: 8px;
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

  .contact {
    text-align: center;
    margin-top: 60px;
    
    a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .content-card {
    padding: 30px;

    .prizes-grid {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
