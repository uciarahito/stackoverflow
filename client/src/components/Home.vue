<template lang="html">
  <div id="bg" class="container">
    <h2 id="section">All Questions</h2>
    <ul class="media-list">
      <li class="col-sm-3 col-lg-3 col-md-3" v-for="question in questions">
        <div class="media">
          <div id="content" class="media-body">
            <h4 class="media-heading">
              <router-link :to="'/question/'+question._id">{{question.title}}</router-link>
              <!-- <a href="#" target="_blank"></a> -->
            </h4>
            <p>{{question.content}}</p>
            <h5><i>by {{question.ask_by.username}}</i></h5>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
        questions: [],
        isLogin: false
    }
  },
  created() {
    let self = this
    if (localStorage.getItem('token') != null) {
      self.$router.push('/')
    } else {
      self.$router.push('/login')
    }

    this.axios.get('http://localhost:3000/api/questions')
    .then(response => {
      // console.log('+++');
      // console.log(response);
      self.questions = response.data
      // response.data.forEach(question => {
      //   // console.log('****');
      //   // console.log(question);
      //   question.votes.forEach(vote => {
      //     console.log('------');
      //     console.log(vote);
      //     if (vote.vote == 1) {
      //       self.totalVotesQuestion += 1
      //     }
      //     console.log(self.totalVotesQuestion);
      //   })
      // })
    })
  }
}
</script>

<style lang="css">
#content {
  text-align: left;
}
#votes {
  text-align: center;
}
#section {
  text-align: left;
  margin-left: 13px;
}
#bg {
  background-color: azure;
}
</style>
