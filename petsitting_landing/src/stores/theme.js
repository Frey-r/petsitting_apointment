import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const current = ref('light')

  function toggle() {
    current.value = current.value === 'light' ? 'dark' : 'light'
    applyTheme(current.value)
    localStorage.setItem('theme-preference', current.value)
  }

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme)
    current.value = theme
  }

  function init() {
    const saved = localStorage.getItem('theme-preference')
    if (saved) {
      applyTheme(saved)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark ? 'dark' : 'light')
    }
  }

  return {
    current,
    toggle,
    init
  }
})
