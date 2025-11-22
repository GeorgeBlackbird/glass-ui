<template>
  <footer class="g-footer">
    <div v-if="$slots.default" class="g-footer__main">
      <slot />
    </div>

    <div
      v-if="$slots.default && $slots.copyright"
      class="g-footer__divider"
    ></div>

    <div v-if="$slots.copyright" class="g-footer__copyright">
      <slot name="copyright" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/lib/styles/main' as *;

.g-footer {
  @include glassy(16px, $dark-glass-color, $border-color-light);

  width: 100%;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  margin-top: auto;
  position: relative;
  z-index: 10;
  color: #fff;
  bottom: 10px;

  &__main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__divider {
    height: 1px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    margin: 1.5rem 0;
  }

  &__copyright {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    opacity: 0.7;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
