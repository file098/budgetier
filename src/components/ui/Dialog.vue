<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="modelValue" class="dialog-overlay" @click="closeDialog">
        <div class="dialog-content" @click.stop>
          <header class="dialog-header">
            <slot name="header">
              <h2><slot name="title">Dialog Title</slot></h2>
            </slot>
            <button class="close-button" @click="closeDialog">&times;</button>
          </header>
          <main class="dialog-body">
            <slot name="body"></slot>
          </main>
          <footer class="dialog-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const modelValue = defineModel();

const closeDialog = () => {
  modelValue.value = false;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/colors" as *;

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: $background-color;
  border-radius: 8px;
  padding: 1rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
}

.dialog-body {
  margin-bottom: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Transitions */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
