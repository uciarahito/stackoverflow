<template>
<div class="container">
  <div class="jarakformregister">
    <ul class="nav nav-tabs">
      <li class="active">
        <a>Login</a>
      </li>
      <li>
        <a href="/#/register">Register</a>
      </li>
    </ul>

    <table class="table">
      <tbody>
        <tr>
          <th>Username</th>
          <th><input type="text" class="form-control" v-model="username"></th>
        </tr>
        <tr>
          <th>Password</th>
          <th><input type="password" class="form-control" v-model="password"></th>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" v-on:click="loginLocal">Login</button>
  </div>
</div>
</template>

<script>
import router from '../router/index';
import toastr from 'toastr'

export default {
  name: 'login',
  data() {
    return {
      isLogin: false,
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    cekLogin(){
      this.$emit('cekLogin')
    },
    loginLocal() {
      let self = this
      // console.log("user: " + self.user);
      this.axios.post('http://localhost:3000/api/signin', {
        username: self.username,
        password: self.password
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty('err')) {
          self.message = response.data.err.errmsg
        } else {
          self.message = response.data.message
          localStorage.setItem('token', response.data.token)
          toastr.success('Login Berhasil')
          // self.cekLogin()
          this.$emit('loginLocal')
          // self.$router.push('/')
          window.location.href = "/"
        }
      })
      .catch(err => {
        alert('Login error')
        console.log(err);
      })
    }
  },
  created() {
    let self = this
    if (localStorage.getItem('token') != null) {
      self.$router.push('/')
    } else {
      self.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.container {
  width: 40%;
}
.jarakformregister {
  margin-top: 80px;
}
</style>