import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#04040c',
          surface: '#1c1c1c',
          primary: '#1976d2',
          secondary: '#03dac6',
          accent: '#ff9800',
          text: '#f0f0f0',
        },
      },
    },
  },
})
