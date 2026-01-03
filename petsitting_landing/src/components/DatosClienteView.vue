<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const emit = defineEmits(['next', 'back'])
const themeStore = useThemeStore()
const formData = ref({
  name: '',
  email: '',
  phone: '',
  serviceType: 'consulta-veterinaria'
})

const serviceTypes = [
  { value: 'paseo-30min', label: 'Paseo de 30 minutos' },
  { value: 'paseo-1hora', label: 'Paseo de 1 hora' },
  { value: 'petsitting-8horas', label: 'Pet Sitting (8 horas)' },
  { value: 'consulta-veterinaria', label: 'Control sano veterinario' }
]

const toggleTheme = () => {
  themeStore.toggle()
}

const handleSubmit = () => {
  emit('next', formData.value)
}

const handleBack = () => {
  emit('back')
}

onMounted(() => {
  themeStore.init()
})
</script>

<template>
  <div class="container">
    <div class="header-section">
      <div class="header-spacer"></div>
      <span class="header-label">Agendar Petsitting</span>
      <button class="btn-theme" @click="toggleTheme">
        <span class="material-symbols-outlined">
          {{ themeStore.current === 'light' ? 'dark_mode' : 'light_mode' }}
        </span>
      </button>
    </div>

    <div class="title-section">
      <div class="title-row">
        <h1>Tus Datos</h1>
        <span class="step-badge">Paso 1 de 3</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>

    <main class="no-scrollbar">
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-group">
          <label for="serviceType">Tipo de servicio</label>
          <div class="input-wrapper">
            <div class="input-icon">
              <span class="material-symbols-outlined">pets</span>
            </div>
            <select
              id="serviceType"
              v-model="formData.serviceType"
              class="form-input form-select"
            >
              <option v-for="service in serviceTypes" :key="service.value" :value="service.value">
                {{ service.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="name">Nombre de dueño</label>
          <div class="input-wrapper">
            <div class="input-icon">
              <span class="material-symbols-outlined">person</span>
            </div>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="Ej. Juan Pérez"
              class="form-input"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <div class="input-wrapper">
            <div class="input-icon">
              <span class="material-symbols-outlined">mail</span>
            </div>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="juan@ejemplo.com"
              class="form-input"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Teléfono de contacto</label>
          <div class="input-wrapper">
            <div class="input-icon">
              <span class="material-symbols-outlined">call</span>
            </div>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              placeholder="+56 9 1234 5678"
              class="form-input"
            />
          </div>
          <p class="input-hint">Para coordinar detalles sobre tu mascota.</p>
        </div>
      </form>
    </main>

    <div class="cta-section">
      <button class="btn-cta" @click="handleSubmit">
        <span>Siguiente</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.container {
  position: relative;
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  max-width: 28rem;
  margin: 0 auto;
  overflow: hidden;
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 1.5rem 1rem;
  flex-shrink: 0;
  z-index: 20;
}

.header-spacer {
  width: 2.5rem;
}

.header-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.btn-theme {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-theme:hover {
  background: var(--color-primary);
  color: var(--color-surface);
}

.title-section {
  padding: 0.5rem 1.5rem 2rem;
  flex-shrink: 0;
}

.title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title-row h1 {
  font-size: 1.875rem;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  line-height: 1.2;
}

.step-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--color-primary);
}

body[data-theme="light"] .step-badge {
  background: rgba(251, 146, 60, 0.1);
}

body[data-theme="dark"] .step-badge {
  background: rgba(94, 234, 212, 0.1);
}

.progress-bar {
  width: 100%;
  height: 0.375rem;
  background: var(--color-surface-muted);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 9999px;
  width: 33.33%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px var(--color-primary);
}

main {
  flex: 1;
  padding: 0 1.5rem 6rem;
  overflow-y: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-left: 0.25rem;
  transition: color 0.2s ease;
}

.form-group:focus-within label {
  color: var(--color-primary);
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  pointer-events: none;
}

.input-icon .material-symbols-outlined {
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.form-group:focus-within .input-icon .material-symbols-outlined {
  color: var(--color-primary);
}

.form-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 1rem;
  border: none;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.5;
  box-shadow: 0 0 0 1px var(--color-border);
  transition: all 0.2s ease;
}

.form-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.6;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23475569' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5rem;
  padding-right: 3rem;
  cursor: pointer;
}

body[data-theme="dark"] .form-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%2394a3b8' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
}

.input-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-left: 0.25rem;
  margin-top: 0.25rem;
}

.cta-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, var(--color-background), var(--color-background), transparent);
  z-index: 20;
  max-width: 28rem;
  margin: 0 auto;
  pointer-events: none;
}

.btn-cta {
  pointer-events: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  height: 3.5rem;
  background: var(--color-primary);
  color: var(--color-surface);
  font-size: 1.125rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(251, 146, 60, 0.3);
}

body[data-theme="dark"] .btn-cta {
  box-shadow: 0 8px 20px rgba(94, 234, 212, 0.3);
}

.btn-cta:hover {
  filter: brightness(1.1);
}

.btn-cta:hover .material-symbols-outlined {
  transform: translateX(0.25rem);
}

.btn-cta:active {
  transform: scale(0.98);
}

.btn-cta .material-symbols-outlined {
  transition: transform 0.2s ease;
}
</style>
