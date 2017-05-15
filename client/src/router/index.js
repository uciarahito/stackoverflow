import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Register from '@/components/Register'
import PostQuestion from '@/components/PostQuestion'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/asks',
      name: 'PostQuestion',
      component: PostQuestion
    },
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail
    }
  ]
})