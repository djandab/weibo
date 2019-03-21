import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
