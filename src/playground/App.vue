<script setup lang="ts">
import { ref } from 'vue'
import {
  GButton,
  GInput,
  GTextarea,
  GSelect,
  GCard,
  GContainer,
  GHeader,
  GFooter,
  GModal,
  GCheckbox,
} from '../lib'

// GButton
const textStyle = ref<'white' | 'gradient'>('gradient')
const disabled = ref(false)
const loading = ref(false)
const showIcon = ref(true)
const textStyleOptions = ref([
  { value: 'white', label: 'Белый' },
  { value: 'gradient', label: 'Градиент' },
])

// GInput
const inputValue = ref('')
const placeholder = ref('Вводите...')
const autoWidth = ref(false)
const required = ref(false)
const isInvalid = ref(false)
const errorMessage = ref('Ошибка заполнения!')

// GTextarea
const textareaValue = ref('')
const textareaPlaceholder = ref('Это кастомный GTextarea.')
const autoHeight = ref(false)
const readonly = ref(false)
const textareaErrorMessage = ref('Ошибка для Textarea!')

// GSelect
const selectValue = ref<string | string[]>('')
const selectPlaceholder = ref('Выберитe...')
const selectAutoWidth = ref(false)
const selectRequired = ref(false)
const selectIsInvalid = ref(false)
const selectErrorMessage = ref('Это поле обязательно!')
const selectMultiple = ref(false)
const options = ref([
  { value: 'option1', label: 'Очень длинная опция. Что скажешь?' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' },
])

// GCard
const cardImgSrc = ref('https://picsum.photos/400/220')
const cardImgAlt = ref('Пример изображения')
const cardBlur = ref(20)
const cardBgOpacity = ref(0.1)
const cardHeaderTextStyle = ref<'white' | 'gradient'>('gradient')
const cardBodyTextStyle = ref<'white' | 'gradient'>('white')
const cardShowImageSlot = ref(false)
const cardHeaderSlot = ref('Заголовок GCard')
const cardBodySlot = ref(
  'Это основной текст карточки, демонстрирующий возможности компонента GCard в UI Kit.'
)

// GContainer
const containerPadding = ref<string>('md')
const containerBlur = ref(16)
const containerBgOpacity = ref(0.15)
const containerTag = ref('div')
const paddingOptions = ref([
  { value: 'none', label: 'None (0)' },
  { value: 'sm', label: 'Small (1rem)' },
  { value: 'md', label: 'Medium (1.5rem)' },
  { value: 'lg', label: 'Large (2rem)' },
])

// GModal
const showModal = ref(false)
const modalCloseOutside = ref(true)
const modalCloseEsc = ref(true)
const modalShowCloseBtn = ref(true)

// GCheckbox
const checkboxValue = ref(false)
const checkboxGroup = ref<string[]>(['vue'])
const checkboxDisabled = ref(false)
</script>

<template>
  <GHeader :sticky="true" style="margin: 0 auto; padding: 2rem; width: 95vw">
    <template #brand>
      <span
        style="
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        "
      >
        🧊 GlassUI
        <span style="opacity: 0.5; font-weight: 400; font-size: 1em"
          >Playground</span
        >
      </span>
    </template>

    <template #nav>
      <a href="#" class="nav-link active">Компоненты</a>
      <a href="#" class="nav-link">under construction</a>
      <a href="#" class="nav-link">under construction</a>
    </template>

    <template #actions>
      <a href="https://github.com/GeorgeBlackbird/glass-ui" target="_blank">
        <GButton style="font-size: 0.85rem; padding: 0.4rem 1rem">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.655-3.81-1.275-4.065-1.92-.15-.36-.75-1.485-1.29-1.785-.45-.24-1.095-.825-.015-.84 1.02-.015 1.74.945 1.98 1.155 1.155 1.98 3.03 1.41 3.765 1.08.12-.84.45-1.41.825-1.74-2.655-.3-5.445-1.32-5.445-5.91 0-1.305.465-2.385 1.23-2.94-.12-.3-.54-1.41.12-3.21 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.545 3.3-1.23 3.3-1.23.66 1.8.24 2.91.12 3.21.765.555 1.23 1.635 1.23 2.94 0 4.605-2.805 5.61-5.475 5.91.465.405.885 1.2.885 2.415 0 1.74-.015 3.15-.015 3.57 0 .315.225.69.84.57A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </template>
          GitHub
        </GButton>
      </a>
    </template>
  </GHeader>

  <main class="playground-container">
    <section class="component-section">
      <h2>GButton</h2>
      <div class="component-controls">
        <label>
          Стиль текста:
          <GSelect
            v-model="textStyle"
            :options="textStyleOptions"
            placeholder="Выберите стиль"
            class="input"
          />
        </label>
        <label>
          <GCheckbox v-model="disabled">Выключена</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="loading">Загрузка</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="showIcon">Иконка</GCheckbox>
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

    <section class="component-section">
      <h2>GInput</h2>
      <div class="component-controls">
        <label>
          Плейсхолдер:
          <GInput v-model="placeholder" class="input" />
        </label>
        <label>
          <GCheckbox v-model="autoWidth">Автоматическая ширина</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="disabled">Выключен</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="required">Обязателен</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="isInvalid">Неправильный ввод</GCheckbox>
        </label>
        <label>
          Сообщение об ошибке:
          <GInput v-model="errorMessage" class="input" />
        </label>
      </div>
      <div class="component-showcase">
        <GInput
          v-model="inputValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :auto-width="autoWidth"
          :style="autoWidth ? '' : 'width: 180px'"
          :required="required"
          :is-invalid="isInvalid"
          :error-message="errorMessage"
          min-width="50px"
          max-width="250px"
        />
      </div>
      <div class="component-description">
        <p>Компонент GInput поддерживает следующие пропсы:</p>
        <ul>
          <li>
            <strong>v-model:</strong> Связывает значение инпута с переменной.
          </li>
          <li>
            <strong>placeholder:</strong> Текст-подсказка (отображается, когда
            инпут пуст).
          </li>
          <li>
            <strong>disabled:</strong> Отключает инпут (блокирует ввод и
            взаимодействие).
          </li>
          <li>
            <strong>autoWidth:</strong> Автоматически подстраивает ширину инпута
            под его содержимое.
          </li>
          <li>
            <strong>required:</strong> Помечает поле как обязательное (валидация
            срабатывает при потере фокуса).
          </li>
          <li>
            <strong>readonly:</strong> Делает инпут доступным только для чтения.
          </li>
          <li>
            <strong>isInvalid:</strong> Принудительно переводит инпут в
            состояние ошибки.
          </li>
          <li>
            <strong>errorMessage:</strong> Текст, который отображается под
            инпутом при ошибке.
          </li>
        </ul>
        <p>
          Используйте контролы выше, чтобы в реальном времени видеть изменения.
          Фон с градиентом имитирует окружение для демонстрации эффекта
          глассморфизма (размытие и прозрачность).
        </p>
      </div>
    </section>

    <section class="component-section">
      <h2>GTextarea</h2>
      <div class="component-controls">
        <label>
          Плейсхолдер:
          <GInput v-model="textareaPlaceholder" class="input" />
        </label>
        <label>
          <GCheckbox v-model="autoHeight">Автоматическая высота</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="disabled">Выключен</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="readonly">Только чтение</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="required">Обязателен</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="isInvalid">Неправильный ввод</GCheckbox>
        </label>
        <label>
          Сообщение об ошибке:
          <GInput v-model="textareaErrorMessage" class="input" />
        </label>
      </div>
      <div class="component-showcase">
        <GTextarea
          v-model="textareaValue"
          :placeholder="textareaPlaceholder"
          :disabled="disabled"
          :auto-height="autoHeight"
          :required="required"
          :readonly="readonly"
          :is-invalid="isInvalid"
          :error-message="textareaErrorMessage"
          rows="3"
          style="width: 30%"
        />
      </div>
      <div class="component-description">
        <p>Компонент GTextarea поддерживает следующие пропсы:</p>
        <ul>
          <li>
            <strong>v-model:</strong> Связывает значение textarea с переменной.
          </li>
          <li>
            <strong>placeholder:</strong> Текст-подсказка (отображается, когда
            поле пустое).
          </li>
          <li>
            <strong>disabled:</strong> Отключает textarea (блокирует ввод и
            взаимодействие).
          </li>
          <li>
            <strong>autoHeight:</strong> Автоматически подстраивает высоту
            textarea под содержимое.
          </li>
          <li>
            <strong>required:</strong> Помечает поле как обязательное (валидация
            срабатывает при потере фокуса).
          </li>
          <li>
            <strong>readonly:</strong> Делает поле доступным только для чтения.
          </li>
          <li>
            <strong>isInvalid:</strong> Принудительно переводит поле в состояние
            ошибки.
          </li>
          <li>
            <strong>errorMessage:</strong> Текст, который отображается под полем
            при ошибке.
          </li>
          <li>
            <strong>rows:</strong> Задает базовое количество отображаемых строк
            (по умолчанию 3).
          </li>
        </ul>
        <p>
          Контролы "Выключен", "Обязателен" и "Неправильный ввод"
          синхронизированы с GInput для удобства тестирования.
        </p>
      </div>
    </section>

    <section class="component-section">
      <h2>GSelect</h2>
      <div class="component-controls">
        <label>
          Плейсхолдер:
          <GInput v-model="selectPlaceholder" class="input" />
        </label>
        <label>
          <GCheckbox v-model="selectAutoWidth">Автоматическая ширина</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="disabled">Выключен</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="selectRequired">Обязателен</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="selectIsInvalid">Неправильный ввод</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="selectMultiple">Мультивыбор</GCheckbox>
        </label>
        <label>
          Сообщение об ошибке:
          <GInput v-model="selectErrorMessage" class="input" />
        </label>
      </div>
      <div class="component-showcase">
        <GSelect
          v-model="selectValue"
          :options="options"
          :placeholder="selectPlaceholder"
          :disabled="disabled"
          :auto-width="selectAutoWidth"
          :required="selectRequired"
          :is-invalid="selectIsInvalid"
          :error-message="selectErrorMessage"
          :multiple="selectMultiple"
        />
      </div>
      <div class="component-description">
        <p>Компонент GSelect поддерживает следующие пропсы:</p>
        <ul>
          <li>
            <strong>v-model:</strong> Связывает выбранное значение (или массив
            значений при multiple) с переменной.
          </li>
          <li>
            <strong>options:</strong> Массив объектов { value, label } для опций
            выпадающего списка.
          </li>
          <li>
            <strong>placeholder:</strong> Текст-подсказка (отображается, когда
            ничего не выбрано).
          </li>
          <li>
            <strong>disabled:</strong> Отключает выбор (блокирует
            взаимодействие).
          </li>
          <li>
            <strong>autoWidth:</strong> Автоматически подстраивает ширину под
            выбранное значение.
          </li>
          <li>
            <strong>required:</strong> Помечает поле как обязательное (валидация
            срабатывает при потере фокуса).
          </li>
          <li>
            <strong>isInvalid:</strong> Принудительно переводит поле в состояние
            ошибки.
          </li>
          <li>
            <strong>errorMessage:</strong> Текст, который отображается под полем
            при ошибке.
          </li>
          <li>
            <strong>multiple:</strong> Разрешает выбор нескольких опций
            (возвращает массив).
          </li>
        </ul>
        <p>
          Используйте контролы выше, чтобы в реальном времени видеть изменения.
          Фон с градиентом имитирует окружение для демонстрации эффекта
          глассморфизма (размытие и прозрачность). Дропдаун телепортируется в
          body для корректного позиционирования.
        </p>
      </div>
    </section>

    <section class="component-section">
      <h2>GCard</h2>
      <div class="component-controls">
        <label>
          Image URL (imgSrc):
          <GInput v-model="cardImgSrc" class="input" />
        </label>
        <label>
          Стиль заголовка:
          <GSelect
            v-model="cardHeaderTextStyle"
            :options="textStyleOptions"
            class="input"
          />
        </label>
        <label>
          Стиль текста:
          <GSelect
            v-model="cardBodyTextStyle"
            :options="textStyleOptions"
            class="input"
          />
        </label>
        <label>
          <GCheckbox v-model="cardShowImageSlot"
            >Кастомный слот #image</GCheckbox
          >
        </label>
        <label>
          Текст заголовка (#header):
          <GInput v-model="cardHeaderSlot" class="input" />
        </label>
        <label>
          Основной текст (#default):
          <GInput v-model="cardBodySlot" class="input" />
        </label>
      </div>
      <div class="component-showcase" style="align-items: flex-start">
        <GCard
          :img-src="!cardShowImageSlot ? cardImgSrc : undefined"
          :img-alt="cardImgAlt"
          :blur="cardBlur"
          :bg-opacity="cardBgOpacity"
          :header-text-style="cardHeaderTextStyle"
          :body-text-style="cardBodyTextStyle"
          style="width: 320px"
        >
          <template v-if="cardShowImageSlot" #image>
            <img
              src="https://picsum.photos/400/221"
              alt="Кастомный слот"
              style="border-bottom: 1px solid rgba(255, 255, 255, 0.2)"
            />
          </template>
          <template #header>
            <h2>{{ cardHeaderSlot }}</h2>
          </template>
          <template #default>
            <p>{{ cardBodySlot }}</p>
          </template>
        </GCard>
      </div>
      <div class="component-description">
        <p>Компонент GCard поддерживает следующие пропсы:</p>
        <ul>
          <li>
            <strong>imgSrc:</strong> URL изображения для карточки (игнорируется,
            если используется слот #image).
          </li>
          <li><strong>imgAlt:</strong> Атрибут 'alt' для изображения.</li>
          <li><strong>blur:</strong> Степень размытия фона (в пикселях).</li>
          <li><strong>bgOpacity:</strong> Прозрачность фона (от 0 до 1).</li>
          <li>
            <strong>headerTextStyle:</strong> 'white' или 'gradient' для
            заголовка.
          </li>
          <li>
            <strong>bodyTextStyle:</strong> 'white' или 'gradient' для основного
            текста.
          </li>
        </ul>
        <p>Компонент также поддерживает 3 слота:</p>
        <ul>
          <li>
            <strong>#image:</strong> Для кастомного контента изображения
            (например, тег <code>&lt;picture&gt;</code>). Перекрывает
            <code>imgSrc</code>.
          </li>
          <li><strong>#header:</strong> Для заголовка карточки.</li>
          <li><strong>#default:</strong> Для основного содержимого.</li>
        </ul>
      </div>
    </section>

    <section class="component-section">
      <h2>GContainer</h2>
      <div class="component-controls">
        <label>
          Тег (tag):
          <GInput
            v-model="containerTag"
            class="input"
            style="width: 100px !important"
          />
        </label>
        <label>
          Отступ (paddingSize):
          <GSelect
            v-model="containerPadding"
            :options="paddingOptions"
            class="input"
          />
        </label>
      </div>
      <div class="component-showcase">
        <GContainer
          :tag="containerTag"
          :padding-size="containerPadding"
          :blur="containerBlur"
          :bg-opacity="containerBgOpacity"
          style="width: 80%"
        >
          <template v-if="containerTag === 'details'">
            <summary style="cursor: pointer">Это тег &lt;details&gt;</summary>
            <p style="margin-top: 1rem">Какой-то скрытый по умолчанию текст.</p>
          </template>
          <template v-else>
            <h3>Контент внутри GContainer</h3>
            <p>
              Это просто параграф. Компонент GContainer используется как
              универсальная "стеклянная" обертка.
            </p>
          </template>
        </GContainer>
      </div>
      <div class="component-description">
        <p>
          Компонент GContainer — это базовый строительный блок для создания
          "стеклянных" панелей и секций.
        </p>
        <ul>
          <li>
            <strong>tag:</strong> Семантический HTML-тег для корневого элемента
            (например, 'div', 'section', 'aside', 'details').
          </li>
          <li>
            <strong>paddingSize:</strong> Управляет внутренними отступами
            ('none', 'sm', 'md', 'lg').
          </li>
          <li><strong>blur:</strong> Степень размытия фона (в пикселях).</li>
          <li><strong>bgOpacity:</strong> Прозрачность фона (от 0 до 1).</li>
        </ul>
      </div>
    </section>

    <section class="component-section">
      <h2>GModal</h2>
      <div class="component-controls">
        <label>
          <GCheckbox v-model="modalCloseOutside"
            >Закрывать по клику вне</GCheckbox
          >
        </label>
        <label>
          <GCheckbox v-model="modalCloseEsc">Закрывать по Esc</GCheckbox>
        </label>
        <label>
          <GCheckbox v-model="modalShowCloseBtn">Крестик</GCheckbox>
        </label>
      </div>

      <div class="component-showcase">
        <GButton text-style="white" @click="showModal = true">
          Открыть модальное окно
        </GButton>
      </div>

      <GModal
        v-model="showModal"
        :click-outside="modalCloseOutside"
        :close-on-esc="modalCloseEsc"
        :close-button="modalShowCloseBtn"
        width="400px"
      >
        <h2 style="margin-top: 0; color: white">Подтверждение</h2>
        <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6">
          Вы действительно хотите выполнить это действие? Эффект стекла
          применяется поверх всего интерфейса.
        </p>

        <div
          style="
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
          "
        >
          <GButton
            text-style="white"
            style="
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
            "
            @click="showModal = false"
          >
            Отмена
          </GButton>
          <GButton @click="showModal = false"> Принять </GButton>
        </div>
      </GModal>

      <div class="component-description">
        <p>
          GModal использует Teleport для рендеринга в body. Поддерживает
          блокировку скролла, анимации появления и закрытие по Esc/клику вне
          области.
        </p>
      </div>
    </section>

    <section class="component-section">
      <h2>GCheckbox</h2>
      <div class="component-controls">
        <label>
          <GCheckbox v-model="checkboxDisabled">Задизейблить</GCheckbox>
        </label>
      </div>

      <div
        class="component-showcase"
        style="flex-direction: column; gap: 2rem; align-items: flex-start"
      >
        <div>
          <h4
            style="
              margin: 0 0 1rem 0;
              color: white;
              font-weight: normal;
              opacity: 0.7;
            "
          >
            Boolean Model: {{ checkboxValue }}
          </h4>
          <GCheckbox v-model="checkboxValue" :disabled="checkboxDisabled">
            Согласен с условиями "Swag Policy"
          </GCheckbox>
        </div>

        <div>
          <h4
            style="
              margin: 0 0 1rem 0;
              color: white;
              font-weight: normal;
              opacity: 0.7;
            "
          >
            Array Model: {{ checkboxGroup }}
          </h4>
          <div style="display: flex; gap: 1.5rem">
            <GCheckbox
              v-model="checkboxGroup"
              value="html"
              :disabled="checkboxDisabled"
            >
              HTML5
            </GCheckbox>
            <GCheckbox
              v-model="checkboxGroup"
              value="scss"
              :disabled="checkboxDisabled"
            >
              SCSS
            </GCheckbox>
            <GCheckbox
              v-model="checkboxGroup"
              value="vue"
              :disabled="checkboxDisabled"
            >
              Vue 3
            </GCheckbox>
          </div>
        </div>
      </div>

      <div class="component-description">
        <p>
          GCheckbox поддерживает работу как с <code>boolean</code>, так и с
          массивами. Использует SVG-анимацию <code>stroke-dashoffset</code> для
          отрисовки галочки.
        </p>
      </div>
    </section>
  </main>

  <GFooter style="margin: 0 auto; padding: 2rem; width: 97.5vw">
    <div class="footer-column">
      <h4>О Проекте</h4>
      <p>
        GlassUI — это современная библиотека компонентов на Vue 3, вдохновленная
        эстетикой macOS и Windows 11.
      </p>
    </div>

    <div class="footer-column">
      <h4>Навигация</h4>
      <a href="#">under construction</a>
      <a href="#">under construction</a>
      <a href="https://github.com/GeorgeBlackbird/glass-ui" target="_blank"
        >GitHub</a
      >
    </div>

    <div class="footer-column">
      <h4>Контакты</h4>
      <p>dev.georgiy.drozdov@gmail.com</p>
      <p>@maad_kid</p>
    </div>

    <template #copyright>
      <span>&copy; 2025 George Blackbird</span>
    </template>
  </GFooter>
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

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

    select {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
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

.input {
  width: 250px !important;
}

.nav-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 6px;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: #fff;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
  }
}

.footer-column {
  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #fff;
    font-weight: 600;
  }

  p,
  a {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.5rem;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }
}
</style>
