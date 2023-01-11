import Vue from 'vue'
// Vue.prototype.ossUrl = 'http://tcsrcz.oss-cn-hangzhou.aliyuncs.com/'
import App from './App'
import { http } from './utils/request'
import api from './api/index.js'
import store from './store'
import util from './utils/util.js'
import * as filters from './utils/filters.js'
import uView from '@/uni_modules/uview-ui'
import consult from './utils/consult.js'

import previewImage from '@/utils/previewImage.js';
Vue.mixin(previewImage)

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$api = api
Vue.prototype.$http = http 
Vue.prototype.$store = store
Vue.prototype.$util = util
Object.keys(filters).forEach(key => {
    Vue.filter(key,filters[key])
})
// production development

console.log('当前环境：' + process.env.NODE_ENV)
// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif