<template>
  <div class="illustration">
    <img
      class="illustration__img"
      src="../assets/img/Illustration.png"
      alt="Illustration"
    />
    <h1 class="illustration__title">Today I need to</h1>
  </div>
</template>

<style scoped>
.illustration {
  max-width: 410px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 52px;
}
.illustration__img {
  margin-bottom: 48px;
}

@media all and (max-width: 485px) {
  .illustration {
    margin-bottom: 20px;
  }
  .illustration__img {
    width: 140px;
    margin-bottom: 18px;
  }
}
</style>
