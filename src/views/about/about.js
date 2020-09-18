
import Vue from 'vue'
import about from './about.vue'
// import router from './router'
// import store from './vuex'

Vue.config.productionTip = false

new Vue({
  // router,
  // store,
  render: h => h(about)
}).$mount('#app')
