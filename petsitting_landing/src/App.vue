<script setup>
import { ref } from 'vue'
import ReservasView from './components/ReservasView.vue'
import DatosClienteView from './components/DatosClienteView.vue'
import ConfirmacionView from './components/ConfirmacionView.vue'

const currentStep = ref(1)
const formData = ref({
  name: '',
  email: '',
  phone: '',
  serviceType: 'consulta-veterinaria'
})
const reservationData = ref({
  selectedDay: null,
  selectedSlot: null
})

const goToNextStep = (data) => {
  if (currentStep.value === 1) {
    formData.value = { ...data }
  } else if (currentStep.value === 2) {
    reservationData.value = { ...data }
  }
  currentStep.value++
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleFinish = () => {
  currentStep.value = 1
  formData.value = { name: '', email: '', phone: '', serviceType: 'consulta-veterinaria' }
  reservationData.value = { selectedDay: null, selectedSlot: null }
}
</script>

<template>
  <DatosClienteView 
    v-if="currentStep === 1"
    @next="goToNextStep"
    @back="goToPreviousStep"
  />
  <ReservasView 
    v-else-if="currentStep === 2"
    :clientData="formData"
    @next="goToNextStep"
    @back="goToPreviousStep"
  />
  <ConfirmacionView 
    v-else-if="currentStep === 3"
    :clientData="formData"
    :reservationData="reservationData"
    @back="goToPreviousStep"
    @finish="handleFinish"
  />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

:root {
  color-scheme: light dark;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f5f9;
  --color-primary: #fb923c;
  --color-primary-strong: #c2410c;
  --color-accent: #14b8a6;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-border: #e2e8f0;
  --color-border-hover: #cbd5e1;
  --gradient-hero: linear-gradient(135deg, #fb923c33, #f97316);
  --shadow-soft: 0 18px 35px rgba(15, 23, 42, 0.15);
  --shadow-card: 0 4px 12px rgba(15, 23, 42, 0.1);
  font-family: "Manrope", "Noto Sans", system-ui, sans-serif;
}

body[data-theme="dark"] {
  --color-background: #030712;
  --color-surface: #0f172a;
  --color-surface-muted: #1e293b;
  --color-primary: #5eead4;
  --color-primary-strong: #0f766e;
  --color-accent: #f97316;
  --color-text: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --color-border-hover: #475569;
  --gradient-hero: linear-gradient(135deg, #0f172a, #0f766e 65%);
  --shadow-soft: 0 18px 40px rgba(2, 6, 23, 0.6);
  --shadow-card: 0 4px 12px rgba(2, 6, 23, 0.4);
}

body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-text);
  min-height: 100vh;
  font-family: "Noto Sans", system-ui, sans-serif;
  line-height: 1.6;
  transition: background 0.4s ease, color 0.4s ease;
  -webkit-font-smoothing: antialiased;
}
</style>
