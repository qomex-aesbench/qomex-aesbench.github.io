<template>
  <div class="not-found-page">
    <div class="content">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <router-link to="/" class="btn btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
  padding: 20px;

  .error-code {
    font-size: 8rem;
    font-weight: 900;
    color: #e0e0e0;
    line-height: 1;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
}
</style>
