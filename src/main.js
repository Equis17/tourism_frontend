import Vue from 'vue'
import ElementUI from 'element-ui'
import './theme/index.css'
import './assets/reset.css'
import router from '@/router/index'
import store from '@/store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
