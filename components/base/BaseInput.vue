<template>
  <input class="input__create" type="text" placeholder="Add new todo..." />
</template>

<style scoped>
.input__create {
  width: 317px;
  border: 1px solid #c7ccd1;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  outline: none;
}

.input__create::placeholder {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
}
</style>