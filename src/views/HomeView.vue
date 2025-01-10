<template>
  <Header />
  <section class="widget-container">
    <Widget :doubleWidth="true">
      <template #icon>
        <h1>test</h1>
      </template>
      <template #content>
        <h1>test</h1>
      </template>
    </Widget>
    <Widget :doubleWidth="false">
      <template #content>
        <h1>test</h1>
      </template>
    </Widget>
    <Widget :doubleWidth="false">
      <template #content>
        <h1>test</h1>
      </template>
    </Widget>
    <Widget :doubleWidth="false">
      <template #content>
        <h1>test</h1>
      </template>
    </Widget>
    <Widget :doubleWidth="false">
      <template #content>
        <h1>test</h1>
      </template>
    </Widget>

  </section>
</template>

<script setup lang="ts">
import Header from '@/layout/Header.vue'
import Widget from '@/components/Widget.vue'
</script>

<style scoped lang="scss">
.widget-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
  margin: 0 5rem;
}
</style>