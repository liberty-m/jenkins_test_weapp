import Vue from 'vue'
import qApp from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: x => x(qApp)
}).$mount('#app')
