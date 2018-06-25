// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import vueRouter from 'vue-router'
import App from './App'
import Books from './components/Books'
import Test from './components/Test'

// Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(vueRouter)

const router = new vueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Books},
    {path: '/test', component: Test}
  ]
});

/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id="app">
      <ul>
        <li><router-link to="/">Books</router-link></li>
        <li><router-link to="/test">Test</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
  `,
}).$mount('#app')
