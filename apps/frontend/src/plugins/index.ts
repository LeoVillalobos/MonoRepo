/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

import "vue-toastification/dist/index.css";
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import Toast, { POSITION } from "vue-toastification";
// import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import VueTablerIcons from "vue-tabler-icons";
// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueTablerIcons)
    .use(Toast, {
      position: POSITION.TOP_RIGHT,
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
      transition: "Vue-Toastification__bounce",
      maxToasts: 20,
      newestOnTop: true
    })
    app.component('PerfectScrollbar', PerfectScrollbar)
}
