<template>
  <header class="header">
    <div class="logo">
      <img
        src="/weather-app.png"
        alt="Weather App"
        class="logo-image"
      />
      <h1>Weather App</h1>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg);
  box-shadow: var(--shadow);
  padding: 16px 0;
}

.logo {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.logo-image {
  max-height: 40px;
  width: auto;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-h);
}
</style>
