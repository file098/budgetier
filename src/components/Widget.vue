<template>
  <div class="widget" :class="{ 'widget--double': doubleWidth }">
    <div class="widget-icon">
      <slot name="icon"/>
    </div>
    <div class="widget-content">
      <slot name="content" />
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
.widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid transparent;
    transition: border 0.3s ease;
    height: 300px;

    &--double {
        grid-column: span 2;
    }

    &:hover {
        border: 1px solid lightgray;
    }

    &-icon {
        font-size: 3rem;
        margin-bottom: 15px;
    }

    &-title {
        font-size: 1.25rem;
        margin: 0;
    }

    &-description {
        font-size: 0.875rem;
        color: #ccc;
    }
}
</style>
