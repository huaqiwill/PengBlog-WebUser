import { createApp } from 'vue'
import { i18n } from '@/utils/locales'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerSvgIcon } from '@/utils/svgicons'
import { registerObSkeleton } from '@/components/LoadingSkeleton'
import { components, plugins } from '@/plugins/element-plus'
import App from './App.vue'
import router from '@/router'
import VueClickAway from 'vue3-click-away'
import lazyPlugin from 'vue3-lazy'
import infiniteScroll from 'vue3-infinite-scroll-better'
import v3ImgPreview from 'v3-img-preview'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import api from '@/api/api'
import '@/router/guard'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import 'prismjs/themes/prism.css'
import 'prismjs'
import 'element-plus/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(VueClickAway)
  .use(infiniteScroll)
  .use(v3ImgPreview, {})
  .use(lazyPlugin, {
    loading: require('@/assets/default-cover.jpg'),
    error: require('@/assets/default-cover.jpg')
  })

/* 组件 */
components.forEach((component) => {
  app.component(component.name, component)
})

/* 插件 */
plugins.forEach((plugin) => {
  app.use(plugin)
})

registerSvgIcon(app)
registerObSkeleton(app)

app.use(ArcoVue)
app.mount('#app')
api.report()
