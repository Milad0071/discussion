<template>
  <div class="containerClass flex_class">
    <div class="backLayer ">
      <div class="mainLayar ">
        <form class="headLayar" @submit.prevent="submitMainDiscussion">
          <img
          class="profileImagePreviewWrapper"
          src="/images/khodam.jpeg"
          /> 
            <input
            class="input_discussion"
            type="text"
            placeholder="Start a discussion"
            v-model="mainInput">
        </form>
        <div class="bodyLayar">
          <div class="discItems " v-for="(user, userIndex) in discussionArray" :key="userIndex">
            <div class="mainAvatarPart">
              <img
              v-if="user.user.avatar"
              class="imagePreviewWrapper"
              :src="user.user.avatar"
              /> 
              <img
              v-else
              class="imagePreviewWrapper"
              src="/images/profile.png"
              /> 
              <hr class="verticalLine">
            </div>
            <div class="detailsPart">
              <div class="name_date">
                <h5>{{ user.user.name }}</h5>
                <p>{{ user.date }}</p>
              </div>
              <div class="mainText">
                <p>{{ user.text }}</p>
              </div>
              <div class="like_reply">
                <div class="like_part">
                  <div v-if="user.iLikedIt == false" class="likeShapeFalse" @click="likeDislike(userIndex)">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" class="likeIconFalse" />
                    <p class="likeText">{{ user.likes }}</p>
                  </div>
                  <div v-else-if="user.iLikedIt == true" class="likeShapeTrue" @click="likeDislike(userIndex)">
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" class="likeIconTrue" />
                    <p class="likeText">{{ user.likes }}</p>
                  </div>
                  <div class="firstLayarReply" @click="sendIdReply(userIndex)">Reply</div>
                </div>
              </div>
              <div class="other_replies">
                <div class="flex_class" style="margin-top: 4%;" v-for="(reply, replyIndex) in user.replies" :key='replyIndex'>
                  <div class="repAvatarPart">
                    <img
                    v-if="reply.user.avatar"
                    class="repImagePreviewWrapper"
                    :src="reply.user.avatar"
                    /> 
                    <img
                    v-else
                    class="repImagePreviewWrapper"
                    src="/images/profile.png"
                    /> 
                  </div>
                  <div class="replyDetails">
                    <div class="name_date">
                      <h5>{{ reply.user.name }}</h5>
                      <p>{{ reply.date }}</p>
                    </div>
                    <div class="mainText">
                      <p>{{ reply.text }}</p>
                    </div>
                    <div class="like_reply">
                      <div class="like_part">
                        <div v-if="reply.iLikedIt == false" class="likeShapeFalse" @click="replyLikeDislike(userIndex, replyIndex)">
                          <font-awesome-icon icon="fa-solid fa-thumbs-up" class="likeIconFalse" />
                          <p class="likeText">{{ reply.likes }}</p>
                        </div>
                        <div v-else-if="reply.iLikedIt == true" class="likeShapeTrue" @click="replyLikeDislike(userIndex, replyIndex)">
                          <font-awesome-icon icon="fa-solid fa-thumbs-up" class="likeIconTrue" />
                          <p class="likeText">{{ reply.likes }}</p>
                        </div>
                        <!-- <div class="firstLayarReply">Reply</div> -->
                      </div>
                    </div>
                  </div>
                </div>
                <form v-if="chosenOne == userIndex" id="replyinputId" class="replyLayar" @submit.prevent="submitreply(user.id, user.user.name, user.user.avatar)" >
                  <img
                  class="profileImagePreviewWrapper"
                  src="/images/khodam.jpeg"
                  /> 
                  <input
                  class="reply_input_discussion"
                  type="text"
                  placeholder="Reply"
                  v-model="replyInput">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscussionComp',
  props: {
  },
  data () {
    return {
      mainInput: null,
      replyInput: null,
      chosenOne: null,
      discussionArray: [
        {
            id: 3,
            date: 1672576074000,
            user: {
                name: "Bessie Cooper",
                avatar: "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg"
            },
            text: "I think for our second compaign we can try to target a different audience. How does it sound for you?",
            likes: 2,
            iLikedIt: false,
            replies: [
              {
                id: 5,
                date: 1672581014000,
                user: {
                  name: "Marvin McKinney",
                  avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                },
                text: "Yes, that sounds good! I can think about this tomorrow. Then do we plan to start that compaign?",
                likes: 3,
                iLikedIt: true,
              },
              {
                id: 6,
                date: 1672581614000,
                user: {
                  name: "Bessie Cooper",
                  avatar: "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
                },
                text: "We plan to run the compaign on Friday - as far as I know. Do you think you will get this done by Thursday @Marvin?",
                likes: 0,
                iLikedIt: false,
              }
          ]
        },
        {
          id: 2,
          date: 1672232414000,
          user: {
            name: "Marvin McKinney",
            avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          },
          text: "The first compaign went smoothly. Please make sure to see all attachments with the results to understand the flow.",
          likes: 2,
          iLikedIt: false,
          replies: []
        },
        {
          id: 1,
          date: 1671886814000,
          user: {
            name: "Savannah Nguyen"
          },
          text: "We have just published the first campaign. Let's see the results in the 5 days and we will iterate on this.",
          likes: 50,
          iLikedIt: true,
          replies: []
        }
      ],
    }
  },
  mounted() {
    // moment().startOf('day').fromNow(); 
    for (let p = 0; p < this.discussionArray.length; p++) {
      this.discussionArray[p].date = this.$filter.moment(this.discussionArray[p].date, "from" ,"now")
    }
    for (let l = 0; l < this.discussionArray.length; l++) {
      if(this.discussionArray[l].replies.length > 0) {
        for (let h = 0; h < this.discussionArray[l].replies.length; h++) {
          this.discussionArray[l].replies[h].date = this.$filter.moment(this.discussionArray[l].replies[h].date, "from" ,"now")
        }
      }
    }
  },
  methods: {
    submitMainDiscussion() {
      // discussionArray
      console.log(this.mainInput)
      if (this.mainInput == null || this.mainInput == '' || this.mainInput == "null") {
        console.log('hi')
      } else {
        let counter = 0;
        for (let y = 0; y < this.discussionArray.length; y++) {
          if (this.discussionArray[y].id > counter)
          counter = this.discussionArray[y].id
        }
        console.log(counter)
        this.discussionArray.push({
          id: counter + 1,
          date: this.$filter.moment(Date(), 'from'),
          user: {
            name: 'guest user',
            avatar: '/images/khodam.jpeg'
          },
          text: this.mainInput,
          likes: 0,
          iLikedIt: false,
          replies: []
        })
        this.mainInput = '';
      }
    },
    submitreply(id, name, avatar) {
      if (this.replyInput == null || this.replyInput == '' || this.replyInput == "null") {
        console.log('hi')
      } else {
        for (let b = 0; b < this.discussionArray.length; b++) {
          if (this.discussionArray[b].id == id) {
            this.discussionArray[b].replies.push({
              id: id,
              date: this.$filter.moment(Date(), 'from'),
              user: {
                name: name,
                avatar: avatar
              },
              text: this.replyInput,
              likes: 0,
              iLikedIt: false,
            })
            this.replyInput = '';
          }
        }
        this.discussionArray.push({
          id: id,
          date: this.$filter.moment(Date(), 'from'),
          user: {
            name: name,
            avatar: avatar
          },
          text: this.replyInput,
          likes: 0,
          iLikedIt: false,
        })
        this.mainInput = '';
      }
    },
    likeDislike(index) {
      for (let i = 0; i < this.discussionArray.length; i++) {
        if (i == index) {
          this.discussionArray[i].iLikedIt = !this.discussionArray[i].iLikedIt;
          if (this.discussionArray[i].iLikedIt == true) {
            this.discussionArray[i].likes = this.discussionArray[i].likes + 1;
          } else if (this.discussionArray[i].iLikedIt == false) {
            this.discussionArray[i].likes = this.discussionArray[i].likes - 1;
          }
        }
      }
    },
    replyLikeDislike(userIndex, repIndex) {
      for (let k = 0; k < this.discussionArray.length; k++) {
        if(this.discussionArray[k].replies.length > 0 && k == userIndex) {
          for (let j = 0; j < this.discussionArray[k].replies.length; j++) {
            if (j == repIndex) {
              this.discussionArray[k].replies[j].iLikedIt = !this.discussionArray[k].replies[j].iLikedIt;
              if (this.discussionArray[k].replies[j].iLikedIt == true) {
                this.discussionArray[k].replies[j].likes = this.discussionArray[k].replies[j].likes + 1;
              } else if (this.discussionArray[k].replies[j].iLikedIt == false) {
                this.discussionArray[k].replies[j].likes = this.discussionArray[k].replies[j].likes - 1;
              }
            }
          }
        }
      }
    },
    sendIdReply(id) {
      this.chosenOne = id
      // if (document.getElementById("replyinputId").style.display == "none") {
      //   document.getElementById("replyinputId").style.display = "flex"
      // } else {
      //   document.getElementById("replyinputId").style.display = "none"
      // }
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
}

.containerClass {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.backLayer {
  width: 40%;
  background-color: rgb(224, 224, 224);
}
.mainLayar {
  flex-direction: column;
  margin: 5px;
}
.headLayar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15vh;
  background-color: rgba(255, 255, 255, 0.793);
  border-radius: 5px 5px 0 0;
}
.profileImagePreviewWrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
}
.imagePreviewWrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  margin-top: -60% !important;
  margin-left: 5%;
}
.verticalLine {
  border-left: 3px solid rgb(228, 226, 226);
  height: 100%;
}
.repImagePreviewWrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
}
.input_discussion {
  width: 75%;
  padding: 2.2% 3%;
  border-radius: 5px;
  border: 3px solid rgba(229, 225, 225, 0.793);
}
input[class='input_discussion']:focus {
  border: 3px solid rgba(144, 141, 141, 0.793);
  outline-width: 0;
}
input[class='input_discussion']:-ms-input-placeholder {
  color: rgba(144, 141, 141, 0.793);
  font-weight: bold;
  opacity:0.6;
}
input[class='input_discussion']::-webkit-input-placeholder {
  color: rgba(144, 141, 141, 0.793);
  font-size: 15px ;
  font-weight: bold;
  opacity:0.6;
}
input[class='input_discussion']::-moz-placeholder {
  color: rgba(144, 141, 141, 0.793);
  font-weight: bold;
  opacity:0.6;
}
.replyLayar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15vh;
  background-color: rgba(255, 255, 255, 0.793);
  border-radius: 5px 5px 0 0;
}
.reply_input_discussion {
  width: 75%;
  padding: 2.2% 3%;
  border-radius: 5px;
  border: 3px solid rgba(229, 225, 225, 0.793);
}
input[class='reply_input_discussion']:focus {
  border: 3px solid rgba(144, 141, 141, 0.793);
  outline-width: 0;
}
input[class='reply_input_discussion']:-ms-input-placeholder {
  color: rgba(144, 141, 141, 0.793);
  font-weight: bold;
  opacity:0.6;
}
input[class='reply_input_discussion']::-webkit-input-placeholder {
  color: rgba(144, 141, 141, 0.793);
  font-size: 15px ;
  font-weight: bold;
  opacity:0.6;
}
input[class='reply_input_discussion']::-moz-placeholder {
  color: rgba(144, 141, 141, 0.793);
  font-weight: bold;
  opacity:0.6;
}
.bodyLayar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75vh;
  margin-top: 2px;
  padding: 5%;
  background-color: white;
  overflow-y: scroll;
}
.discItems {
  display: flex;
  width: 100%;
  margin-bottom: 5%;
}
.mainAvatarPart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}
.detailsPart {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2%;
  margin-bottom: 5%;
}
.replyDetails {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2%;
  margin-bottom: 5%;
}
.name_date {
  display: flex;
  margin-top: -5% !important;
}
.name_date h5 {
  font-size: 16px;
  font-weight: bold;
}
.name_date p {
  margin-top: 30px;
  margin-left: 10px;
  font-size: small;
  color: rgb(195, 192, 192);
}
.mainText {
  margin-top: -7%;
  font-size: 13px;
  font-weight: bold;
  color: gray;
}
.like_reply {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -1%;
}
.like_part {
  width: 100%;
  display: flex;
  align-items: center;
}
.likeShapeFalse {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  width: 7vh;
  border-radius: 15px;
  background-color: rgba(233, 231, 231, 0.534);
  cursor: pointer;
}
.likeShapeTrue {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  width: 7vh;
  border-radius: 15px;
  background-color: rgb(70, 70, 250);
  color: white;
  cursor: pointer;
}
.likeText {
  margin: 0;
  font-weight: bold;
}
.likeIconFalse {
  margin-right: 5px;
  color: gray;
}
.likeIconTrue {
  margin-right: 5px;
  color: white;
}
.firstLayarReply {
  margin-left: 2%;
  font-size: 13px;
  font-weight: bold;
  color: blue;
  cursor: pointer;
}
</style>
