<template lang="html">
  <div class="container">
    <div class="panel- panel-default">
      <div class="panel-heading">
        <h3 style="text-align:left;">Add Question</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addQuestion">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" class="form-control" v-model="title">
          </div><br /><br />
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
  name: 'question',
  data() {
    return {
      title: '',
      content: '',
      isLogin: false
    }
  },
  methods: {
    addQuestion() {
      let self = this;
      this.axios.post('http://localhost:3000/api/questions', {
          title: self.title,
          content: self.content
        },
        {
          headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
          self.title = ''
          self.content = ''
          // alert('Register Success')
          toastr.success('Add Question Berhasil')
          self.$router.push('/')
        })
        .catch(err => {
          if (localStorage.getItem('token') == null) {
            toastr.error('Login or Register Please!')
            self.$router.push('/login')
          }
        })
    }
  }
}
</script>

<style lang="css">
#form {
  text-align: left;
}
</style>
