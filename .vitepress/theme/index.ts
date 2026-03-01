import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ArticleMeta from './components/ArticleMeta.vue'
import ThemeButton from './components/ThemeButton.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArticleMeta', ArticleMeta)
    app.component('ThemeButton', ThemeButton)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-top': () => h(ArticleMeta),
      'nav-bar-content-after': () => h(ThemeButton),
    })
  }
}
