<script setup lang="ts">
//
</script>

<template>
  <main class="playground-container">
    <header>
      <h1>GlassUI Playground</h1>
      <p>Тестирование и отладка компонентов</p>
    </header>

    <section class="component-section">
      <h2>GButton</h2>
      <div class="component-showcase">Скоро!</div>
    </section>
  </main>
</template>

<style lang="scss">
body {
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: sans-serif;
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
  background-color: #242424;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
</style>
