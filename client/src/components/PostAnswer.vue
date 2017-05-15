<template lang="html">
  <div class="container">
    <div class="panel- panel-default">
      <div class="panel-heading">
        <h3 style="text-align:left;">Give Your Answer</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addAnswer">
          <div class="form-group">
            <label for="content">Content:</label><br />
            <textarea name="name" rows="8" cols="80" v-model="content"></textarea>
            <!-- <input type="text" id="content" class="form-control" v-model="content"> -->
          </div><br />
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  name: 'answers',
  props: ['id'],
  data() {
    return {
      isLogin: false,
      content: ''
    }
  },
  methods: {
    addAnswer() {
      let self = this;
      this.axios.post(`http://localhost:3000/api/create/answer/${this.id}`, {
          content: self.content
        },
        {
          headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
          self.content = ''
          toastr.success('Add Answer Berhasil')
          self.$router.push(`/question/${self.id}`)
        })
        .catch(err => {
          if (localStorage.getItem('token') == null) {
            toastr.error('Login or Register Please!')
            self.$router.push('/login')
          }
        })
    }
  },
  mounted() {

  }
}
</script>

<style lang="css">
#form {
  text-align: left;
}
</style>
