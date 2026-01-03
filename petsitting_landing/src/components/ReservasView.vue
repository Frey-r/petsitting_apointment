<script setup>
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const props = defineProps({
  clientData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['next', 'back'])
const themeStore = useThemeStore()
const selectedSlot = ref(1)
const selectedDay = ref(0)
const currentDate = ref(new Date())
const showMonthYearPicker = ref(false)
const selectedYear = ref(currentDate.value.getFullYear())
const selectedMonth = ref(currentDate.value.getMonth())
const startDateOffset = ref(0) // Días a saltar desde hoy
const bookedSlots = ref([]) // Horarios ocupados desde la API

const monthName = computed(() => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return months[selectedMonth.value]
})

const years = computed(() => {
  const today = new Date()
  const currentYear = today.getFullYear()
  const maxYear = maxDate.value.getFullYear()
  
  // Solo incluir años que tengan días dentro del rango de 60 días
  const availableYears = []
  for (let year = currentYear; year <= maxYear; year++) {
    availableYears.push(year)
  }
  
  return availableYears
})

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const maxDate = computed(() => {
  const today = new Date()
  const max = new Date(today)
  max.setDate(max.getDate() + 60)
  return max
})

const availableDays = computed(() => {
  const days = []
  const today = new Date()
  const availableWeekDays = [3, 4, 6] // Miércoles, Jueves, Sábado
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  
  // Encontrar el primer día disponible desde el offset
  let currentDate = new Date(today)
  let daysSkipped = 0
  
  // Saltar días hasta alcanzar el offset
  while (daysSkipped < startDateOffset.value && currentDate <= maxDate.value) {
    currentDate.setDate(currentDate.getDate() + 1)
    const dayOfWeek = currentDate.getDay()
    if (availableWeekDays.includes(dayOfWeek)) {
      daysSkipped++
    }
  }
  
  // Determinar el mes a mostrar basado en la fecha de inicio
  const targetMonth = currentDate.getMonth()
  const targetYear = currentDate.getFullYear()
  
  // Actualizar el mes mostrado
  selectedMonth.value = targetMonth
  selectedYear.value = targetYear
  
  let count = 0
  
  // Buscar hasta 6 días disponibles solo dentro del mes objetivo y límite de 60 días
  while (count < 6 && currentDate <= maxDate.value) {
    const dayOfWeek = currentDate.getDay()
    
    // Solo agregar si es día disponible Y está en el mes objetivo
    if (availableWeekDays.includes(dayOfWeek) && currentDate.getMonth() === targetMonth) {
      days.push({
        name: dayNames[dayOfWeek],
        number: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        fullDate: new Date(currentDate)
      })
      count++
    }
    
    // Si cambiamos de mes, detener la búsqueda
    if (currentDate.getMonth() !== targetMonth) {
      break
    }
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return days
})

const toggleTheme = () => {
  themeStore.toggle()
}

const selectSlot = (index) => {
  // No permitir seleccionar slots deshabilitados
  if (availableSlots.value[index]?.disabled) return
  selectedSlot.value = index
}

const selectDay = (index) => {
  selectedDay.value = index
}

const toggleMonthYearPicker = () => {
  showMonthYearPicker.value = !showMonthYearPicker.value
}

const hasAvailableDaysInMonth = (month, year) => {
  const today = new Date()
  const availableWeekDays = [3, 4, 6]
  
  // Determinar fecha de inicio
  let startDate = new Date(year, month, 1)
  if (year === today.getFullYear() && month === today.getMonth()) {
    startDate = new Date(today)
  }
  
  // Si la fecha de inicio es mayor al límite, no hay días disponibles
  if (startDate > maxDate.value) return false
  
  // Buscar si hay al menos un día disponible en el mes
  let searchDate = new Date(startDate)
  while (searchDate.getMonth() === month && searchDate <= maxDate.value) {
    const dayOfWeek = searchDate.getDay()
    if (availableWeekDays.includes(dayOfWeek)) {
      return true
    }
    searchDate.setDate(searchDate.getDate() + 1)
  }
  
  return false
}

const selectMonthYear = (month, year) => {
  const today = new Date()
  const availableWeekDays = [3, 4, 6]
  
  // Buscar el primer día disponible del mes seleccionado
  let firstDayOfMonth = new Date(year, month, 1)
  
  // Si el mes seleccionado es el mes actual, empezar desde hoy
  if (year === today.getFullYear() && month === today.getMonth()) {
    firstDayOfMonth = new Date(today)
  }
  
  // Buscar el primer día disponible en el mes seleccionado
  let searchDate = new Date(firstDayOfMonth)
  let foundFirstAvailable = false
  
  while (searchDate.getMonth() === month && searchDate <= maxDate.value) {
    const dayOfWeek = searchDate.getDay()
    if (availableWeekDays.includes(dayOfWeek)) {
      foundFirstAvailable = true
      break
    }
    searchDate.setDate(searchDate.getDate() + 1)
  }
  
  // Solo cambiar si encontramos un día disponible en ese mes
  if (foundFirstAvailable && searchDate.getMonth() === month) {
    // Calcular el offset: contar días disponibles desde hoy hasta el primer día del mes seleccionado
    let currentDate = new Date(today)
    let offset = 0
    
    while (currentDate < searchDate) {
      const dayOfWeek = currentDate.getDay()
      if (availableWeekDays.includes(dayOfWeek)) {
        offset++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    startDateOffset.value = offset
    selectedMonth.value = month
    selectedYear.value = year
    showMonthYearPicker.value = false
    selectedDay.value = 0
    selectedSlot.value = 0
  }
}

const navigateDays = (direction) => {
  if (direction > 0) {
    // Navegar hacia adelante: saltar al siguiente día después del último visible
    const newOffset = startDateOffset.value + availableDays.value.length
    
    // Verificar que el nuevo offset no exceda el rango de 60 días
    const today = new Date()
    let testDate = new Date(today)
    let daysSkipped = 0
    const availableWeekDays = [3, 4, 6]
    
    while (daysSkipped < newOffset && testDate <= maxDate.value) {
      const dayOfWeek = testDate.getDay()
      if (availableWeekDays.includes(dayOfWeek)) {
        daysSkipped++
      }
      if (daysSkipped < newOffset) {
        testDate.setDate(testDate.getDate() + 1)
      }
    }
    
    // Solo navegar si la fecha resultante está dentro del rango
    if (testDate <= maxDate.value) {
      startDateOffset.value = newOffset
    }
  } else {
    // Navegar hacia atrás: retroceder 6 días disponibles
    startDateOffset.value = Math.max(0, startDateOffset.value - 6)
  }
  selectedDay.value = 0 // Reset to first day
  selectedSlot.value = 0 // Reset slot selection
}

const canNavigatePrev = computed(() => {
  return startDateOffset.value > 0
})

const canNavigateNext = computed(() => {
  // Verificar si hay más días disponibles después de los actuales
  if (availableDays.value.length === 0) return false
  
  const lastVisibleDay = availableDays.value[availableDays.value.length - 1]
  return lastVisibleDay.fullDate < maxDate.value
})

const availableSlots = computed(() => {
  if (!availableDays.value[selectedDay.value]) return []
  
  const selectedDayData = availableDays.value[selectedDay.value]
  const dayOfWeek = selectedDayData.fullDate.getDay()
  
  // Miércoles (3) y Jueves (4): 10:30-13:30 y 14:30-19:30
  // Sábado (6): 9:30-13:30 y 14:30-18:30
  
  const slots = []
  
  if (dayOfWeek === 3 || dayOfWeek === 4) {
    // Miércoles y Jueves
    slots.push(
      { time: '10:30', period: 'AM', description: 'Sesión matutina' },
      { time: '11:30', period: 'AM', description: 'Media mañana' },
      { time: '12:30', period: 'PM', description: 'Antes del almuerzo' },
      { time: '14:30', period: 'PM', description: 'Tarde temprano' },
      { time: '15:30', period: 'PM', description: 'Media tarde' },
      { time: '16:30', period: 'PM', description: 'Tarde' },
      { time: '17:30', period: 'PM', description: 'Final de tarde' },
      { time: '18:30', period: 'PM', description: 'Última hora' }
    )
  } else if (dayOfWeek === 6) {
    // Sábado
    slots.push(
      { time: '09:30', period: 'AM', description: 'Temprano en la mañana' },
      { time: '10:30', period: 'AM', description: 'Media mañana' },
      { time: '11:30', period: 'AM', description: 'Antes del mediodía' },
      { time: '12:30', period: 'PM', description: 'Mediodía' },
      { time: '14:30', period: 'PM', description: 'Tarde temprano' },
      { time: '15:30', period: 'PM', description: 'Media tarde' },
      { time: '16:30', period: 'PM', description: 'Tarde' },
      { time: '17:30', period: 'PM', description: 'Final de tarde' }
    )
  }
  
  // Verificar cuáles slots están ocupados
  return slots.map(slot => {
    const isBooked = isSlotBooked(selectedDayData.fullDate, slot.time)
    return {
      ...slot,
      disabled: isBooked
    }
  })
})

const isSlotBooked = (date, time) => {
  // Formatear la fecha del slot seleccionado
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const slotDateTime = `${year}-${month}-${day}T${time}:00-03:00`
  
  // Calcular la hora de fin del slot (1 hora después)
  const [hours, minutes] = time.split(':')
  const slotStart = new Date(date)
  slotStart.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  const slotEnd = new Date(slotStart)
  slotEnd.setHours(slotEnd.getHours() + 1)
  
  // Verificar si hay alguna reserva que se solape con este horario
  const isBooked = bookedSlots.value.some(booking => {
    const bookingStart = new Date(booking.start)
    const bookingEnd = new Date(booking.end)
    
    // Hay conflicto si:
    // 1. La reserva empieza durante nuestro slot
    // 2. La reserva termina durante nuestro slot
    // 3. La reserva cubre completamente nuestro slot
    const hasConflict = (
      (bookingStart >= slotStart && bookingStart < slotEnd) || // Empieza durante
      (bookingEnd > slotStart && bookingEnd <= slotEnd) ||     // Termina durante
      (bookingStart <= slotStart && bookingEnd >= slotEnd)     // Cubre completamente
    )
    
    return hasConflict
  })
  
  // Debug: mostrar comparaciones
  if (bookedSlots.value.length > 0) {
    console.log('Checking slot:', slotDateTime, 'to', slotEnd.toISOString())
    console.log('Booked slots:', bookedSlots.value.map(b => `${b.start} to ${b.end}`))
    console.log('Is booked:', isBooked)
  }
  
  return isBooked
}

const fetchBookedSlots = async () => {
  try {
    const response = await fetch('https://n8n.ebachmann.dev/webhook/aa1bca29-c8d5-4fb4-b853-62abeb5bb84a')
    const data = await response.json()
    bookedSlots.value = data
    console.log('Fetched booked slots:', data)
  } catch (error) {
    console.error('Error fetching booked slots:', error)
    bookedSlots.value = []
  }
}

const handleBack = () => {
  emit('back')
}

const handleContinue = () => {
  emit('next', {
    selectedDay: selectedDay.value,
    selectedSlot: selectedSlot.value
  })
}

onMounted(() => {
  themeStore.init()
  fetchBookedSlots()
})
</script>

<template>
  <div class="container">
    <header>
      <button class="btn-back" @click="handleBack">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1>Agendar Visita</h1>
      <button class="btn-theme" @click="toggleTheme">
        <span class="material-symbols-outlined">
          {{ themeStore.current === 'light' ? 'dark_mode' : 'light_mode' }}
        </span>
      </button>
    </header>

    <div class="progress-section">
      <div class="progress-info">
        <span class="progress-label">Paso 2 de 3</span>
        <span class="progress-percent">66%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>

    <main class="no-scrollbar">
      <section class="calendar-section">
        <div class="calendar-header">
          <h2 @click="toggleMonthYearPicker" class="month-year-selector">{{ monthName }} {{ selectedYear }}</h2>
          <div class="calendar-nav">
            <button class="btn-nav" @click="navigateDays(-1)" :disabled="!canNavigatePrev">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="btn-nav" @click="navigateDays(1)" :disabled="!canNavigateNext">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div v-if="showMonthYearPicker" class="month-year-picker">
          <div class="picker-section">
            <h3>Año</h3>
            <div class="year-grid">
              <button 
                v-for="year in years" 
                :key="year"
                @click="selectMonthYear(selectedMonth, year)"
                :class="{ active: year === selectedYear }"
                class="picker-btn"
              >
                {{ year }}
              </button>
            </div>
          </div>
          <div class="picker-section">
            <h3>Mes</h3>
            <div class="month-grid">
              <button 
                v-for="(month, index) in months" 
                :key="index"
                @click="selectMonthYear(index, selectedYear)"
                :class="{ active: index === selectedMonth }"
:disabled="!hasAvailableDaysInMonth(index, selectedYear)"
                class="picker-btn"
              >
                {{ month }}
              </button>
            </div>
          </div>
        </div>

        <div class="calendar-days no-scrollbar">
          <div 
            v-for="(day, index) in availableDays"
            :key="`${day.year}-${day.month}-${day.number}`"
            class="day-card"
            :class="{ active: selectedDay === index }"
            @click="selectDay(index)"
          >
            <span class="day-name">{{ day.name }}</span>
            <span class="day-number">{{ day.number }}</span>
            <div v-if="selectedDay === index" class="day-indicator"></div>
          </div>
        </div>
      </section>

      <section class="slots-section">
        <h3>Horarios Disponibles</h3>
        <div class="slots-list">
          <div 
            v-for="(slot, index) in availableSlots"
            :key="index"
            class="slot-card"
            :class="{ selected: selectedSlot === index, disabled: slot.disabled }"
            @click="selectSlot(index)"
          >
            <div class="slot-info">
              <div class="slot-time-row">
                <span class="slot-time">{{ slot.time }} {{ slot.period }}</span>
                <span v-if="slot.disabled" class="slot-badge unavailable">Ocupado</span>
              </div>
              <p class="slot-description">{{ slot.disabled ? 'No disponible' : slot.description }}</p>
            </div>
            <div class="slot-radio">
              <span class="material-symbols-outlined">check</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div class="cta-section">
      <button class="btn-cta" @click="handleContinue">
        <span>Continuar</span>
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

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 1rem;
  z-index: 20;
}

.btn-back {
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

.btn-back:hover {
  background: var(--color-surface);
  border-color: var(--color-border-hover);
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

header h1 {
  font-size: 1.125rem;
  font-weight: 700;
  font-family: "Manrope", sans-serif;
}

.progress-section {
  padding: 0 1.5rem 2rem;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-info span {
  font-size: 0.875rem;
  font-weight: 500;
}

.progress-info .progress-label {
  color: var(--color-text-muted);
}

.progress-info .progress-percent {
  font-weight: 700;
  color: var(--color-primary);
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
  width: 66%;
  transition: width 0.3s ease;
}

main {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem 6rem;
}

.calendar-section {
  margin-bottom: 2rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.calendar-header h2 {
  font-size: 1.5rem;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
}

.month-year-selector {
  cursor: pointer;
  transition: color 0.2s ease;
}

.month-year-selector:hover {
  color: var(--color-primary);
}

.calendar-nav {
  display: flex;
  gap: 0.5rem;
}

.btn-nav {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-nav:hover:not(:disabled) {
  background: var(--color-surface-muted);
  border-color: var(--color-border-hover);
}

.btn-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.month-year-picker {
  background: var(--color-surface);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border);
}

.picker-section {
  margin-bottom: 1.5rem;
}

.picker-section:last-child {
  margin-bottom: 0;
}

.picker-section h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.year-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.picker-btn {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.picker-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--color-surface);
}

.picker-btn.active {
  background: var(--color-primary);
  color: var(--color-surface);
  border-color: var(--color-primary);
}

.picker-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.calendar-days {
  display: flex;
  justify-content: flex-start;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.day-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 3.5rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.day-card:hover {
  border-color: var(--color-border-hover);
}

.day-card.active {
  background: var(--color-primary);
  color: var(--color-surface);
  border-color: var(--color-primary);
  box-shadow: 0 8px 20px rgba(251, 146, 60, 0.3);
}

[data-theme="dark"] .day-card.active {
  box-shadow: 0 8px 20px rgba(94, 234, 212, 0.3);
}

.day-card .day-name {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.day-card .day-number {
  font-size: 1.125rem;
  font-weight: 700;
}

.day-card.active .day-name {
  font-weight: 700;
}

.day-card.active .day-number {
  font-weight: 800;
}

.day-card .day-indicator {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background: currentColor;
  margin-top: 0.25rem;
}

.slots-section h3 {
  font-size: 1.125rem;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  margin-bottom: 1rem;
}

.slots-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slot-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s ease;
}

.slot-card:hover {
  border-color: var(--color-border-hover);
}

.slot-card.selected {
  border-color: var(--color-primary);
  background: var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-strong));
  color: var(--color-surface);
}

[data-theme="dark"] .slot-card.selected {
  background: linear-gradient(135deg, var(--color-primary-strong), var(--color-primary));
}

.slot-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.slot-info {
  flex: 1;
}

.slot-time-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.slot-time {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: "Manrope", sans-serif;
}

.slot-card.disabled {
  background: var(--color-surface-muted);
  border-color: var(--color-border);
}

.slot-card.disabled .slot-time {
  color: var(--color-text-muted);
}

.slot-card.disabled .slot-description {
  color: var(--color-text-muted);
}

.slot-card.disabled:hover {
  border-color: var(--color-border);
  transform: none;
}

.slot-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.slot-badge.duration {
  background: var(--color-surface-muted);
  color: var(--color-text-muted);
}

.slot-card.selected .slot-badge.duration {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-surface);
}

.slot-badge.popular {
  background: var(--color-primary);
  color: var(--color-surface);
}

.slot-card.selected .slot-badge.popular {
  background: rgba(255, 255, 255, 0.3);
  color: var(--color-surface);
}

.slot-badge.unavailable {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.slot-description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.slot-card.selected .slot-description {
  color: rgba(255, 255, 255, 0.9);
}

.slot-card.disabled .slot-description {
  color: var(--color-text-muted);
}

.slot-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.slot-avatar {
  display: flex;
  margin-left: -0.5rem;
}

.slot-avatar img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: 2px solid var(--color-surface);
}

.slot-card.selected .slot-avatar img {
  border-color: var(--color-primary);
}

.slot-sitter {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.slot-card.selected .slot-sitter {
  color: rgba(255, 255, 255, 0.9);
}

.slot-verified {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
}

.slot-card.selected .slot-verified {
  color: rgba(255, 255, 255, 0.95);
}

.slot-verified .material-symbols-outlined {
  font-size: 0.875rem;
}

.slot-radio {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: 2px solid var(--color-border-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.slot-card.selected .slot-radio {
  border-color: var(--color-surface);
  background: var(--color-surface);
}

.slot-radio .material-symbols-outlined {
  font-size: 0.875rem;
  color: var(--color-primary);
  transform: scale(0);
  transition: transform 0.2s ease;
}

.slot-card.selected .slot-radio .material-symbols-outlined {
  transform: scale(1);
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

[data-theme="dark"] .btn-cta {
  box-shadow: 0 8px 20px rgba(94, 234, 212, 0.3);
}

.btn-cta:hover {
  filter: brightness(1.1);
}

.btn-cta:active {
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .calendar-days {
    justify-content: flex-start;
  }
}
</style>
