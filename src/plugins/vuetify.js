import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#1e88e5',
    secondary: '#9BC4BC',
    background: '#353535',
    accent: '#13C4A3',
    error: '#F8333C',
    success: '#2D936C',
    warning: '#FDCA40'
  },
  options: {
    customProperties: true
  },
  iconfont: 'fa',
})
