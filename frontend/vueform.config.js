// vueform.config.ts

import en from '@vueform/vueform/locales/en'
import { defineConfig } from '@vueform/vueform'
import vueform from '@vueform/vueform/themes/vueform'

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
})