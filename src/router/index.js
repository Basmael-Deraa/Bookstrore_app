import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Books from '@/components/Books'
import Admin from '@/components/Admin'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
      // meta: {
      //     guest: true
      // }
    },
    {
      path: '/books',
      component: Books,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      component: Admin,
      meta: {
          requiresAuth: true,
          is_admin : true
      }
    }
  ]
});


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ path: '/books'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ path: '/books'})
        }
    }else {
        next()
    }
})

export default router
