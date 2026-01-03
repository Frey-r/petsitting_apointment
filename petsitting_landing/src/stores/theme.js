import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const current = ref('light')

  function toggle() {
    current.value = current.value === 'light' ? 'dark' : 'light'
    document.body.setAttribute('data-theme', current.value)
  }

  function init() {
    document.body.setAttribute('data-theme', current.value)
  }

  return {
    current,
    toggle,
    init
  }
})
