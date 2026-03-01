import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ArticleMeta from './components/ArticleMeta.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArticleMeta', ArticleMeta)
    app.component('ThemeToggle', ThemeToggle)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(ThemeToggle),
    })
  }
}
