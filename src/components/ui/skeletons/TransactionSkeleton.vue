<template>
  <div class="transaction-skeleton">
    <div class="transaction-skeleton__dot"></div>
    <div class="transaction-skeleton__line"></div>
    <div class="transaction-skeleton__line"></div>
    <div class="transaction-skeleton__line"></div>
  </div>
</template>

<style lang="scss" scoped>
.transaction-skeleton {
  display: grid;
  grid-template-columns: 2rem 1fr 1fr 1fr;
  place-items: center;
  gap: 10px;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(110deg, #2a2a2a 8%, #3a3a3a 18%, #2a2a2a 33%);
    background-size: 200% 100%;
    animation: shine 1.5s linear infinite;
  }

  &__line {
    width: 100%;
    max-width: 15rem;
    height: 20px;
    background: linear-gradient(110deg, #2a2a2a 8%, #3a3a3a 18%, #2a2a2a 33%);
    background-size: 200% 100%;
    animation: shine 1.5s linear infinite;
    border-radius: 4px;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;

    &__line {
      width: 100%;
    }
  }
}
</style>
