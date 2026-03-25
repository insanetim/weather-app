<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  min-width: 360px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .container {
    max-width: 100%;
  }
}
</style>
