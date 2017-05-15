<template lang="html">
  <div class="container">
    <h3 style="text-align:left;">Question</h3>
    <ul class="media-list">
      <li class="col-sm-10 col-lg-10 col-md-10">
        <div id="listquestion" class="media" >
          <div class="media-left">
            <a @click="voteQuestion(1)"><span class="glyphicon glyphicon-triangle-top"></span></a>
            <span id="votes">{{totalVoteQuestion}}</span>
            <a @click="voteQuestion(-1)"><span class="glyphicon glyphicon-triangle-bottom"></span></a>
          </div>
          <div id="dataquestion" class="media-body">
            <h2 class="media-heading">{{question.title}}</h2>
            <h4>{{question.content}}</h4>
            <h5><i>by {{question.ask_by.username}}</i></h5>
            <h5><a v-on:click="removeQuestion"><i>Delete</i></a></h5>
          </div>
        </div>
      </li>
    </ul>

    <div>
      <ul class="media-list">
        <li class="col-sm-10 col-lg-10 col-md-10" v-for="answer in answers">
          <div id="listanswer" class="media" >
            <h4>Answer:</h4>
            <div class="media-left">
              <a @click="voteAnswer(1)"><span class="glyphicon glyphicon-triangle-top"></span></a>
              <span id="votes">{{totalVoteAnswer}}</span>
              <a @click="voteAnswer(-1)"><span class="glyphicon glyphicon-triangle-bottom"></span></a>
            </div>
            <div id="dataquestion" class="media-body">
              <h4>{{answer.content}}</h4>
              <h5><i>by {{answer.answer_by.username}}</i></h5>
            </div>
          </div>
        </li>
      </ul>
    </div>



    <div class="container">
      <div class="panel- panel-default">
        <div class="panel-heading">
          <!-- <h3 style="text-align:left;">Give Your Answer</h3> -->
        </div>
        <div class="panel-body">
          <form id="form" class="form-inline" v-on:submit="addAnswer">
            <div class="form-group">
              <h4>Your Answer</h4><br />
              <textarea name="name" rows="8" cols="80" v-model="content"></textarea>
              <!-- <input type="text" id="content" class="form-control" v-model="content"> -->
            </div><br />
            <input type="submit" class="btn btn-primary" value="Submit">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'

export default {
  name: 'questiondetail',
  props: ['id'],
  data() {
    return {
      question: {},
      totalVoteQuestion: 0,
      totalVoteAnswer: 0,
      answers: [],
      answerid: '',
      content: ''
    }
  },
  methods: {
    voteQuestion(num) {
      let self = this
      this.axios.post(`http://localhost:3000/api/vote/question/${this.question._id}`, {
        vote: num
      })
      .then(response => {
        console.log(response.data);
        if (response.data.check_vote == false) {
          toastr.warning(response.data.message)
        } else {
          if (num == 1) {
            self.totalVoteQuestion += 1
            toastr.success('Success for upvote this question')
          } else {
            self.totalVoteQuestion -= 1
            toastr.success('Success for  downvote this question')
          }
        }
      })
    },
    voteAnswer(num) {
      let self = this
      this.axios.post(`http://localhost:3000/api/vote/answer/${this.question._id}`, {
        vote: num
      })
      .then(response => {
        console.log(response.data);
        // if (response.data.check_vote == false) {
        //   toastr.warning(response.data.message)
        // } else {
        //   if (num == 1) {
        //     self.totalVoteQuestion += 1
        //     toastr.success('Success for upvote this question')
        //   } else {
        //     self.totalVoteQuestion -= 1
        //     toastr.success('Success for  downvote this question')
        //   }
        // }
      })
    },
    displayDetailQuestion() {
      let id = this.$route.params.id
      let self = this
      console.log('id: ' + id);
      this.axios.get(`http://localhost:3000/api/question/${id}`)
      .then(response => {
        // console.log(response);
        // console.log(response.data.votes);
        self.question = response.data
        response.data.votes.forEach(vote => {
          if (vote.vote == 1) {
            self.totalVoteQuestion++
          }
        })

        self.answers = response.data.answers
        response.data.answers.forEach(answer => {
          console.log('oooooo');
          console.log(answer);
          answer.votes.forEach(vote => {
            console.log('xxxxx');
            console.log(vote);
            if (vote.vote == 1) {
              self.totalVoteAnswer++
            }
          })

        })
        // console.log(self.totalVoteQuestion);
        // console.log(self.answers.length);
      })
      .catch(err => {
        alert('error waktu get detail question')
        console.log(err);
      })
    },
    addAnswer() {
      let id = this.$route.params.id
      let self = this;
      this.axios.post(`http://localhost:3000/api/create/answer/${id}`, {
          content: self.content
        },
        {
          headers: { token: localStorage.getItem('token') }
        })
        .then(response => {
          self.content = ''
          toastr.success('Add Answer Berhasil')
          self.$router.push(`/question/${id}`)
        })
        .catch(err => {
          if (localStorage.getItem('token') == null) {
            toastr.error('Login or Register Please!')
            self.$router.push('/login')
          }
        })
    },
    removeQuestion(){
      let id = this.$route.params.id
      let self = this
      this.axios.delete(`http://localhost:3000/api/question/${id}`)
          .then(response => {
              if (response.data.hasOwnProperty('error')) {
                  self.message = response.data.error.message
              } else {
                  self.message = response.data.message
                  self.$router.push('/')
                  // window.location.href = "/#/home"
                  toastr.success('Delete question berhasil!')
                  console.log(response.data)
              }
          })
          .catch(error => {
              toastr.error(`Delete question error: ${error}`)
          })
    }
  },
  mounted() {
    this.displayDetailQuestion()
  },
  watch: {
    '$route': 'displayDetailQuestion'
  }
}
</script>

<style lang="css">
#listquestion {
  text-align: left;
  padding: 35px 0px 20px 0px;
}
#listanswer {
  text-align: left;
  padding-bottom: 10px;
}
#votes {
  line-height: 36px;
  font-size:25px;
}
#dataquestion {
  padding-left: 10px;
}
#form {
  text-align: left;
}
</style>
