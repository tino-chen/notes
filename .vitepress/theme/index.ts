import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ArticleMeta from './components/ArticleMeta.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArticleMeta', ArticleMeta)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-top': () => h(ArticleMeta),
    })
  }
}
