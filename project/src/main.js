import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/css/reset.css'

Vue.config.productionTip = false
require('../src/utils/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
