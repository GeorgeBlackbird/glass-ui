<script setup lang="ts">
import { GButton } from '../lib'
</script>

<template>
  <main class="playground-container">
    <header>
      <h1>GlassUI Playground</h1>
      <p>Тестирование и отладка компонентов</p>
    </header>

    <section class="component-section">
      <h2>GButton</h2>
      <div class="component-showcase">
        <GButton style="height: 120px; width: 300px; font-size: xx-large"
          >Default</GButton
        >
        <GButton theme="secondary">Primary</GButton>
        <GButton disabled>Disabled</GButton>
        <GButton theme="primary">
          <template #icon>
            <span>🚀</span>
          </template>
          With Icon
        </GButton>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
body {
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: 'SF Pro Display';
  margin: 0;
}

.playground-container {
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
}

.component-section {
  margin-bottom: 2rem;

  h2 {
    color: #00dc82;
  }
}

.component-showcase {
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
</style>
