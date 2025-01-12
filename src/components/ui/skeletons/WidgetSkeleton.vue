<template>
  <div class="widget-skeleton">
    <div class="widget-skeleton__icon"></div>
    <div class="widget-skeleton__content">
      <div class="widget-skeleton__line"></div>
      <div class="widget-skeleton__line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  doubleWidth: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.widget-skeleton {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(110deg, #2a2a2a 8%, #3a3a3a 18%, #2a2a2a 33%);
    background-size: 200% 100%;
    animation: shine 1.5s linear infinite;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__line {
    height: 20px;
    background: linear-gradient(110deg, #2a2a2a 8%, #3a3a3a 18%, #2a2a2a 33%);
    background-size: 200% 100%;
    animation: shine 1.5s linear infinite;
    border-radius: 4px;

    &:last-child {
      width: 60%;
    }
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
