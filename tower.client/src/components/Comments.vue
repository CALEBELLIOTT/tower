
<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-12">
        <p class="text-dark-lighten m-0">What Are People Saying</p>
      </div>
    </div>
    <div class="row bg-dark-lighten rounded p-md-2">
      <div class="col-12">
        <form action="" @submit.prevent="postComment">
          <p class="text-success text-end mt-2">Join The Conversation</p>
          <textarea v-model="commentData.body" class="form-control" placeholder="Tell The People..." name="" id=""
            cols="30" rows="5"></textarea>
          <div class="d-flex justify-content-end">
            <button class="btn btn-success mt-2" type="submit">Post Comment</button>
          </div>
        </form>
        <div v-for="c in comments" :key="c.id" class="col-12 d-flex align-items-center my-3">
          <img class="profile-img" :src="c.creator.picture" alt="">
          <div class="d-flex flex-column mx-3 bg-primary rounded comment-body p-2 my-2">
            <div class="d-flex">
              <p class="m-0 me-2 ms-2"><b>{{ c.creator.name }}</b></p>
              <button @click="deleteComment(`${c.id}`)" v-if="c.creator.id == account.id"
                class="btn btn-outline-danger">delete
                comment</button>
            </div>
            <p class="mt-2 m-0 me-5 ms-2">{{ c.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"

export default {
  setup() {
    let commentData = ref({})
    return {
      commentData,
      comments: computed(() => AppState.activeEventComments),
      account: computed(() => AppState.account),
      async postComment() {
        try {
          await eventsService.postComment(commentData.value)
        } catch (error) {
          Pop.toast(error.message, "error")
          console.error(error)
        }
        commentData.value.body = ""
      },
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm('are you sure you want to delete this comment?', '', 'warning', 'Yes! Delete it')) {
            await eventsService.deleteComment(commentId)
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          console.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-dark-lighten {
  background-color: rgba(71, 76, 97, 1);
}

.profile-img {
  border-radius: 50%;
  height: 5vw;
}

.text-dark-lighten {
  color: rgba(121, 129, 166, 1)
}
</style>
