<template>
  <form
    class="form"
    :class="{ empty: !title }"
    @submit.prevent="title && onSubmit()"
  >
    <input
      v-model="title"
      class="input__create"
      type="text"
      placeholder="Add new todo..."
    />
    <BaseButton v-if="title" value="Submit" class="anim" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['on-created-task'])
const title = ref('')

function onSubmit() {
  emit('on-created-task', {
    id: new Date().getTime(),
    title: title.value,
    completed: false,
  })

  title.value = ''
}
</script>

<style scoped>
.form {
  max-width: 410px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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

.empty {
  justify-content: center;
}

.anim {
  animation: 0.5s show ease;
}

@keyframes show {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0px);
  }
}

@media all and (max-width: 485px) {
  .form {
    gap: 20px;
  }
  .input__create {
    width: 100%;
  }
}
</style>
