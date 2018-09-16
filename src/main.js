// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import vueResource from 'vue-resource'
import vueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VuePagination from 'vue-bs-pagination'
import App from './App'
import router from './router'
import Hello from './components/Hello'
import Login from './components/Login'
import Register from './components/Register'
import Books from './components/Books'
import Admin from './components/Admin'

require('./assets/css/bootstrap.min.css')
require('./assets/css/main.css')

Vue.prototype.$http = Axios;

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(vueRouter)
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: `
    <div id="app">
      <router-view></router-view>
    </div>  `
}).$mount('#app')
