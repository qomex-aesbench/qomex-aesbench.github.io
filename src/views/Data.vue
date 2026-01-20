<template>
  <div class="data-page">
    <div class="container">
      <div class="page-header">
        <h1>Datasets</h1>
        <p>Download the AesBench datasets for aesthetic perception evaluation</p>
      </div>

      <div class="content-wrapper">
        <div class="data-section">
          <h2>Dataset Information</h2>
          <p>
            AesBench is a systematically designed benchmark for evaluating the aesthetic perception abilities of Multimodal Large Language Models (MLLMs). It is constructed from a diverse collection of 2,800 images, spanning natural scenes, artistic works, and AI-generated content.
          </p>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Total Images:</span>
              <span class="value">2,800</span>
            </div>
            <div class="info-item">
              <span class="label">Annotation:</span>
              <span class="value">Expert-Level</span>
            </div>
            <div class="info-item">
              <span class="label">Dimensions:</span>
              <span class="value">AesP, AesE, AesA1</span>
            </div>
            <div class="info-item">
              <span class="label">Format:</span>
              <span class="value">JSON / JPG</span>
            </div>
          </div>
        </div>

        <div class="downloads-section">
          <h2>Downloads</h2>
          <div class="download-cards">
            <div class="download-card">
              <div class="icon-wrapper">
                <el-icon><Box /></el-icon>
              </div>
              <div class="card-content">
                <h3>AesBench Testing Data</h3>
                <p>A single compressed package containing both the <code>images/</code> folder and <code>AesBench_evaluation.json</code>.</p>
                <div class="meta">Size: ~500 MB | Format: .zip or .tar.gz</div>
              </div>
              <el-button type="primary" @click="handleDownload('AesBench_test_data.zip')">
                <el-icon><Download /></el-icon> Download Package
              </el-button>
            </div>

            <div class="download-card template">
              <div class="icon-wrapper">
                <el-icon><Files /></el-icon>
              </div>
              <div class="card-content">
                <h3>Submission Example</h3>
                <p>JSON structure template (<code>result.json</code>) for your model's predicted results.</p>
                <div class="meta">Size: 10 KB</div>
              </div>
              <el-button type="success" @click="handleDownloadTemplate">
                <el-icon><Download /></el-icon> Download Example
              </el-button>
            </div>
          </div>
        </div>

        <div class="license-section">
          <h3>Terms of Use</h3>
          <p>
            The AesBench dataset is released for the QoMEX 2026 Grand Challenge. 
            Participants are required to follow the submission guidelines strictly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage } from 'element-plus'

async function handleDownload(filename) {
  try {
    const response = await api.data.download(filename)

    // Check if response contains a download_url (COS mode)
    if (response.data && response.data.download_url) {
      // Open the signed URL in a new tab or trigger download
      window.open(response.data.download_url, '_blank')
      ElMessage.success('Download started')
      return
    }

    // Fallback: direct file download (local mode)
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    ElMessage.error(error.response?.data?.detail || 'Failed to download file. Please try again later.')
    console.error(error)
  }
}

async function handleDownloadTemplate() {
  try {
    const response = await api.data.getTemplate()
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'result.json')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    ElMessage.error('Failed to download template.')
  }
}
</script>

<style lang="scss" scoped>
.data-page {
  padding: 40px 0;
  background: #f4f6f8;
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

.content-wrapper {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.data-section {
  margin-bottom: 50px;

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  p {
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .label {
        font-size: 0.9rem;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        font-weight: 600;
        color: #333;
        font-size: 1.1rem;
      }
    }
  }
}

.downloads-section {
  margin-bottom: 40px;

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .download-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .download-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
    transition: all 0.2s ease;

    &:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.02);
    }

    .icon-wrapper {
      width: 50px;
      height: 50px;
      background: #f0f2f5;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667eea;
      font-size: 1.5rem;
    }

    .card-content {
      flex: 1;

      h3 {
        margin: 0 0 5px;
        font-size: 1.1rem;
        color: #333;
      }

      p {
        margin: 0 0 5px;
        color: #666;
        font-size: 0.95rem;
      }

      .meta {
        font-size: 0.85rem;
        color: #999;
      }
    }
  }
}

.license-section {
  text-align: center;
  padding-top: 20px;
  border-top: 1px dashed #eee;

  h3 {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 10px;
  }

  p {
    color: #777;
    font-size: 0.9rem;
  }
}
</style>
