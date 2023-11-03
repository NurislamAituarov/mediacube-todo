<template>
  <div class="wrapper">
    <div>
      <TheIllustration />
      <FormCreate />
    </div>

    <div class="control">
      <p class="control__notice">Congrat, you have no more tasks to do</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 730px;
  min-height: 719px;
  background-color: #ffffff;
  border-radius: 24px;
  margin: 90px auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.control {
}
.control__notice {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  text-align: center;
  color: #8f99a3;
}
</style>
