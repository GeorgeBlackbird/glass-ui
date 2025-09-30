<script setup lang="ts">
import { ref } from 'vue'
import { GButton } from '../lib'

const textStyle = ref<'white' | 'gradient'>('gradient')
const disabled = ref(false)
const loading = ref(false)
const showIcon = ref(true)
</script>

<template>
  <main class="playground-container">
    <header>
      <h1>GlassUI Playground</h1>
      <p>Тестирование и отладка компонентов</p>
    </header>

    <section class="component-section">
      <h2>GButton</h2>
      <div class="component-controls">
        <label>
          Стиль текста:
          <select v-model="textStyle">
            <option value="white">Белый</option>
            <option value="gradient">Градиент</option>
          </select>
        </label>
        <label>
          Выключена:
          <input v-model="disabled" type="checkbox" />
        </label>
        <label>
          Загрузка:
          <input v-model="loading" type="checkbox" />
        </label>
        <label>
          Иконка:
          <input v-model="showIcon" type="checkbox" />
        </label>
      </div>
      <div class="component-showcase">
        <GButton
          :text-style="textStyle"
          :disabled="disabled"
          :loading="loading"
          @click="() => console.log('Вы нажали на кнопку.')"
        >
          <template v-if="showIcon" #icon>
            <img src="@/playground/assets/img/smile.svg" class="smile" />
          </template>
          Пример кнопки
        </GButton>
      </div>
      <div class="component-description">
        <p>Компонент GButton поддерживает следующие пропсы:</p>
        <ul>
          <li>
            <strong>textStyle:</strong> 'white' (белый текст) или 'gradient'
            (градиентный текст)
          </li>
          <li><strong>disabled:</strong> Отключает кнопку</li>
          <li><strong>loading:</strong> Показывает состояние загрузки</li>
          <li>
            <strong>icon:</strong> Слот для иконки (поддерживает SVG, IMG и
            другие элементы)
          </li>
        </ul>
        <p>
          Используйте контролы выше, чтобы в реальном времени видеть изменения.
          Фон с градиентом имитирует окружение для демонстрации эффекта
          глассморфизма (размытие и прозрачность).
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
body {
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family:
    'SF Pro Display',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  margin: 0;
  line-height: 1.5;
}

.playground-container {
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0.5rem 0 0;
  }
}

.component-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin-bottom: 1rem;
  }
}

.component-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);

    select,
    input[type='checkbox'] {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }

    select {
      appearance: none;
    }
  }
}

.component-showcase {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 212, 255, 0.3) 50%,
    rgba(255, 0, 150, 0.3) 100%
  );
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}

.component-description {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;

    li {
      margin-bottom: 0.25rem;
    }
  }
}

.smile {
  width: 14px;
  height: 14px;
}
</style>
