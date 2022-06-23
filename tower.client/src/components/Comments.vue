
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
        <div v-for="c in comments" :key="c.id" class="col-12 d-flex align-items-center">
          <img class="profile-img" :src="c.creator.picture" alt="">
          <div class="d-flex flex-column mx-3 bg-primary rounded comment-body p-2 my-2">
            <p><b>{{ c.creator.name }}</b></p>
            <p>{{ c.body }}</p>
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

export default {
  setup() {
    let commentData = ref({})
    return {
      commentData,
      comments: computed(() => AppState.activeEventComments),
      async postComment() {
        console.log("event ID", commentData.eventId);
        console.log("creator ID", commentData.creatorId);
        console.log(commentData.value);
        await eventsService.postComment(commentData.value)
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

.comment-body {}
</style>
