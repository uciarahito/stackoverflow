<template lang="html">
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                          <a href="#" v-on:click="onHome">Home</a>
                        </li>
                        <li>
                          <a v-on:click="onQuestion">Question</a>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right" v-if="isLogin">
                      <li><a href="#" v-on:click="onLogout"><span class="glyphicon glyphicon-log-out"></span> LogOut</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" v-else>
                      <li><a href="#" v-on:click="onLogin"><span class="glyphicon glyphicon-log-out"></span> LogIn</a></li>
                      <!-- <li><router-link to="login"><span class="glyphicon glyphicon-log-in"></span> LogIn</router-link></li> -->
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
      </div>
      <!-- /.container -->
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: ['isLogin', 'user'],
  data() {
    return {

    }
  },
  methods: {
    onLogout(){
      this.$router.push('/login')
      this.$emit('onLogout')
    },
    onLogin(){
      this.$router.push('/login')
      this.$emit('loginLocal')
    },
    onHome() {
      this.$router.push('/')
    },
    onQuestion() {
      this.$router.push('/asks')
    }
  }
}
</script>

<style lang="css">
</style>
