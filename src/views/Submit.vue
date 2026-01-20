<template>
  <div class="submit-page">
    <div class="container">
      <div class="page-header">
        <h1>Submit Results</h1>
        <p>Upload your prediction file to evaluate your model on AesBench</p>
      </div>

      <div class="guidelines-card">
        <h2>Submission Guidelines</h2>
        
        <div class="rules-section">
          <h3><el-icon><Warning /></el-icon> Rules & Requirements</h3>
          <ul>
            <li><strong>Daily Limit:</strong> Each team can submit up to <strong>30 times per day</strong>.</li>
            <li><strong>File Format:</strong> Only <code>.json</code> files are accepted.</li>
            <li><strong>File Size:</strong> Maximum file size is <strong>50MB</strong>.</li>
            <li><strong>Final Submission:</strong> By March 22, 2026, you must submit your Test Output, Code, and Fact Sheet.</li>
          </ul>
        </div>

        <div class="step">
          <h3>1. Prepare Your Results</h3>
          <p>
            Download the testing data package. It contains the <code>images/</code> folder and <code>AesBench_evaluation.json</code>. 
            Generate predictions for all 2,800 images using your MLLM.
          </p>
        </div>

        <div class="step">
          <h3>2. Format Your Submission</h3>
          <p>
            Your submission file must be named <code>result.json</code> and strictly follow the format below. 
            Ensure each image key matches the filename in the dataset.
          </p>
          <div class="code-block">
<pre>{
  "baid_18347.jpg": {
    "AesP": "D) Because it employs an S-shaped composition with natural lighting...",
    "AesE": "B) Because the image portrays a serene environment...",
    "AesA1": "high"
  },
  "para_iaa_pub10205_.jpg": {
    "AesP": "C) The image appears dim and the overall tone fails...",
    "AesE": "B) No",
    "AesA1": "medium"
  },
  ...
}</pre>
          </div>
        </div>

        <div class="step">
          <h3>3. Evaluation Metrics</h3>
          <p>
            <strong>Choice Accuracy:</strong> For multiple-choice questions (AesP, AesE), the prediction is correct only if it exactly matches the reference answer (Option + Text).
          </p>
          <p>
            <strong>Level Accuracy:</strong> For rating questions (AesA1), the prediction is correct only if the assigned level (e.g., 'high', 'medium', 'low') matches the expert annotation exactly.
          </p>
        </div>
      </div>

      <div class="submit-card">
        <div class="remaining-info" v-if="remainingInfo">
          <el-alert
            :type="remainingInfo.remaining > 0 ? 'info' : 'warning'"
            :closable="false"
          >
            <template #title>
              <span v-if="remainingInfo.remaining > 0">
                Today's submissions: <strong>{{ remainingInfo.used }}</strong> / {{ remainingInfo.limit }}
                (<strong>{{ remainingInfo.remaining }}</strong> remaining)
              </span>
              <span v-else>
                Daily submission limit reached ({{ remainingInfo.limit }}). Try again tomorrow.
              </span>
            </template>
          </el-alert>
        </div>

        <div class="upload-area">
          <el-upload
            class="upload-dragger"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
            accept=".json"
            v-if="!file"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop <code>result.json</code> here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                Supported format: .json. Max size: 50MB.
              </div>
            </template>
          </el-upload>

          <div v-else class="selected-file">
            <div class="file-info">
              <el-icon><Document /></el-icon>
              <span>{{ file.name }}</span>
              <small>({{ formatSize(file.size) }})</small>
            </div>
            <el-button type="danger" circle @click="file = null">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>

          <div class="submit-actions" v-if="file">
            <el-button 
              type="primary" 
              size="large" 
              :loading="uploading"
              @click="submitFile"
            >
              Submit Solution
            </el-button>
          </div>
        </div>
      </div>

      <div class="history-section">
        <h2>Submission History</h2>
        <el-table :data="submissions" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" width="80" align="center" />
          <el-table-column prop="filename" label="Filename" min-width="150" />
          <el-table-column prop="status" label="Status" width="120" align="center">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="overall_score" label="Score" width="120" align="right">
            <template #default="scope">
              <span v-if="scope.row.overall_score !== null" class="score">{{ formatScore(scope.row.overall_score) }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="submitted_at" label="Submitted At" width="180" align="right">
            <template #default="scope">
              {{ new Date(scope.row.submitted_at).toLocaleString() }}
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
import { UploadFilled, Document, Close, Warning } from '@element-plus/icons-vue'

const file = ref(null)
const uploading = ref(false)
const loading = ref(false)
const submissions = ref([])
const remainingInfo = ref(null)

function handleFileChange(uploadFile) {
  file.value = uploadFile.raw
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatScore(score) {
  return Number(score).toFixed(4)
}

function getStatusType(status) {
  switch (status) {
    case 'success': return 'success'
    case 'failed': return 'danger'
    case 'processing': return 'warning'
    default: return 'info'
  }
}

async function submitFile() {
  if (!file.value) return

  // Check if submissions remaining
  if (remainingInfo.value && remainingInfo.value.remaining <= 0) {
    ElMessage.warning('Daily submission limit reached. Try again tomorrow.')
    return
  }

  uploading.value = true
  try {
    const response = await api.submissions.submit(file.value)
    ElMessage.success('File submitted successfully')
    file.value = null
    await fetchSubmissions()
    await fetchRemainingToday()
  } catch (error) {
    ElMessage.error(error.response?.data?.detail || 'Submission failed')
  } finally {
    uploading.value = false
  }
}

async function fetchSubmissions() {
  loading.value = true
  try {
    const response = await api.submissions.list({ limit: 10 })
    submissions.value = response.data
  } catch (error) {
    console.error('Failed to fetch submissions')
  } finally {
    loading.value = false
  }
}

async function fetchRemainingToday() {
  try {
    const response = await api.submissions.getRemainingToday()
    remainingInfo.value = response.data
  } catch (error) {
    console.error('Failed to fetch remaining submissions')
  }
}

onMounted(() => {
  fetchSubmissions()
  fetchRemainingToday()
})
</script>

<style lang="scss" scoped>
.submit-page {
  padding: 40px 0;
  background: #f4f6f8;
  min-height: 100%;

  .container {
    max-width: 900px;
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
  }
}

.guidelines-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;

  h2 {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 1.5rem;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
  }

  .rules-section {
    background: #fffdf0;
    border: 1px solid #ffe58f;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;

    h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #d48806;
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 15px;
    }

    ul {
      margin: 0;
      padding-left: 20px;
      color: #555;
      
      li {
        margin-bottom: 8px;
        line-height: 1.5;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .step {
    margin-bottom: 25px;

    h3 {
      font-size: 1.1rem;
      color: #444;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 10px;

      code {
        background: #f1f3f5;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
        color: #e83e8c;
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    
    pre {
      margin: 0;
      color: #f8f9fa;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.submit-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 50px;

  .remaining-info {
    margin-bottom: 25px;

    strong {
      color: #409eff;
    }
  }

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.selected-file {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  justify-content: space-between;

  .file-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  }
}

.history-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    margin: 0 0 20px;
    font-size: 1.5rem;
    color: #333;
  }

  .score {
    font-family: monospace;
    font-weight: 600;
  }
}
</style>
