<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const props = defineProps({
  clientData: {
    type: Object,
    default: () => ({})
  },
  reservationData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['back', 'finish'])
const themeStore = useThemeStore()
const isSubmitting = ref(false)
const submitError = ref(null)

const toggleTheme = () => {
  themeStore.toggle()
}

const submitAppointment = async () => {
  isSubmitting.value = true
  submitError.value = null

  const payload = {
    tipoServicio: props.clientData.serviceType || 'consulta-veterinaria',
    fecha: '2025-01-17',
    horaInicio: '11:30',
    clienteNombre: props.clientData.name || '',
    petsitterEmail: 'camelia.gonzalez.olivares@gmail.com',
    mascotaNombre: 'Michi',
    notas: 'Control post-operatorio',
    contacto: {
      tutorEmail: props.clientData.email || '',
      wsp: props.clientData.phone || ''
    }
  }

  try {
    const response = await fetch('https://n8n.ebachmann.dev/webhook/4dd41f49-3a21-4a76-92dc-49c14096d69f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    console.log('Appointment submitted successfully')
  } catch (error) {
    console.error('Error submitting appointment:', error)
    submitError.value = error.message
  } finally {
    isSubmitting.value = false
  }
}

const handleFinish = () => {
  emit('finish')
}

onMounted(() => {
  themeStore.init()
  submitAppointment()
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

    <main class="content-section">
      <div class="success-icon">
        <span class="material-symbols-outlined">check_circle</span>
      </div>

      <h1 class="title">¡Solicitud Enviada!</h1>
      
      <p class="subtitle">
        Tu solicitud de agendamiento ha sido recibida exitosamente.
      </p>

      <div class="info-card">
        <div class="info-header">
          <span class="material-symbols-outlined">schedule</span>
          <h2>Próximos pasos</h2>
        </div>
        <ul class="info-list">
          <li>
            <span class="material-symbols-outlined">person</span>
            <div>
              <strong>Contacto del petsitter</strong>
              <p>Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.</p>
            </div>
          </li>
          <li>
            <span class="material-symbols-outlined">pets</span>
            <div>
              <strong>Detalles de tu mascota</strong>
              <p>Coordinaremos los últimos detalles sobre el cuidado y necesidades especiales.</p>
            </div>
          </li>
          <li>
            <span class="material-symbols-outlined">calendar_month</span>
            <div>
              <strong>Confirmación final</strong>
              <p>Recibirás un mensaje de confirmación con todos los detalles de la visita.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="contact-card">
        <span class="material-symbols-outlined">mail</span>
        <div class="contact-info">
          <p class="contact-label">Te contactaremos en:</p>
          <p class="contact-value">{{ clientData.email || 'tu correo' }}</p>
          <p class="contact-value">{{ clientData.phone || 'tu teléfono' }}</p>
        </div>
      </div>

      <div class="tip-card">
        <span class="material-symbols-outlined">lightbulb</span>
        <p>
          <strong>Consejo:</strong> Mantén tu teléfono cerca para recibir la llamada de nuestro equipo.
        </p>
      </div>
    </main>

    <div class="cta-section">
      <button class="btn-cta" @click="handleFinish">
        <span>Finalizar</span>
        <span class="material-symbols-outlined">home</span>
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

.content-section {
  flex: 1;
  padding: 2rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success-icon {
  margin-bottom: 1.5rem;
}

.success-icon .material-symbols-outlined {
  font-size: 5rem;
  color: var(--color-primary);
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.title {
  font-size: 2rem;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  max-width: 24rem;
}

.info-card {
  width: 100%;
  background: var(--color-surface);
  border-radius: 1.25rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-card);
  text-align: left;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.info-header .material-symbols-outlined {
  font-size: 1.75rem;
  color: var(--color-primary);
}

.info-header h2 {
  font-size: 1.25rem;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  color: var(--color-text);
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-list li .material-symbols-outlined {
  font-size: 1.5rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.info-list li div {
  flex: 1;
}

.info-list li strong {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.info-list li p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.contact-card {
  width: 100%;
  background: var(--color-surface);
  border-radius: 1rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-card);
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.contact-card .material-symbols-outlined {
  font-size: 2rem;
  color: var(--color-primary);
  flex-shrink: 0;
}

.contact-info {
  flex: 1;
}

.contact-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.contact-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.tip-card {
  width: 100%;
  background: var(--color-surface-muted);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.tip-card .material-symbols-outlined {
  font-size: 1.5rem;
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.tip-card p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.tip-card strong {
  color: var(--color-text);
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

.btn-cta:active {
  transform: scale(0.98);
}
</style>
