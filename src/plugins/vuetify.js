import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#2D936C',
    secondary: '#9BC4BC',
    background: '#353535',
    accent: '#2D936C',
    error: '#F8333C',
    success: '#2D936C',
    warning: '#E1CE7A'
  },
  options: {
    customProperties: true
  },
  iconfont: 'fa',
})
