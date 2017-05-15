<template>
<div class="container">
  <div class="jarakformregister">
    <ul class="nav nav-tabs">
      <li>
        <a href="/#/login">Login</a>
      </li>
      <li class="active">
        <a>Register</a>
      </li>
    </ul>

    <table class="table">
      <tbody>
        <tr>
          <th>Name</th>
          <th><input type="text" v-model="name" class="form-control"></th>
        </tr>
        <tr>
          <th>Username</th>
          <th><input type="text" v-model="username" class="form-control"></th>
        </tr>
        <tr>
          <th>Password</th>
          <th><input type="password" v-model="password" class="form-control"></th>
        </tr>
        <tr>
          <th>Email</th>
          <th><input type="text" v-model="email" class="form-control"></th>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" v-on:click="register">Register</button>
  </div>
</div>
</template>

<script>

import router from '../router/index';
import toastr from 'toastr'

export default {
  name: 'register',
  props: ['source'],
  data() {
    return {
      username: '',
      password: '',
      name: '',
      email: ''
    }
  },
  methods: {
    register: function() {
      let self = this;
      this.axios.post('http://localhost:3000/api/users', {
          username: self.username,
          password: self.password,
          name: self.name,
          email: self.email
        })
        .then(response => {
          self.username = ''
          self.password = ''
          self.name = ''
          self.email = ''
          // alert('Register Success')
          toastr.success('Register Berhasil')
          self.$router.push('/login')
        })
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