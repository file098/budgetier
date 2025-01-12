<template>
  <div class="widget" :class="{ 
    'widget--double': doubleWidth, 
    'ignore-double-width-mobile': ignoreDoubleWidthOnMobile 
  }">
    <WidgetSkeleton v-if="loading" :double-width="doubleWidth" />
    <template v-else>
      <div class="widget-header">
        <slot name="header" />
      </div>
      <div class="widget-content">
        <slot name="content" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import WidgetSkeleton from "@/components/ui/skeletons/WidgetSkeleton.vue";

defineProps({
  doubleWidth: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  ignoreDoubleWidthOnMobile: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  &-header {
    display: flex;
    justify-content: center;
    font-size: 1rem;
    margin: 0;
    padding: 0;
    width: 100%;

    :deep(h1) {
      margin: 0;
      margin-bottom: 1rem;
      padding: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }
  }

  &-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    &.ignore-double-width-mobile {
      grid-column: span 1;
    }
  }
}
</style>
