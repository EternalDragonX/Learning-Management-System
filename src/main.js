import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import Viser from 'viser-vue'

Vue.config.productionTip = false

Vue.use(antd);

Vue.use(Viser);

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default vue

