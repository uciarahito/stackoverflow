<template>
  <div id="app">
    <navbar v-bind:isLogin="checkLogin" v-on:onLogout="onLogout" v-on:loginLocal="onLogin"></navbar>
    <router-view v-bind:isLogin="checkLogin"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'app',
  data() {
    return {
      checkLogin: false,
      user: {
        name: '',
        username: '',
        email: ''
      }
    }
  },
  methods: {
    onLogout(){
      localStorage.clear()
      this.checkLogin = false
      self.$router.push('/login')
    },
    onLogin(){
      let self = this
      if (localStorage.getItem('token') != null) {
        self.checkLogin = true
        self.$router.push('/')
      } else {
        self.checkLogin = false
        self.$router.push('/login')
      }
    }
  },
  created: function(){
    this.onLogin()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
