
<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <p class="text-light m-0">See Who Is Attending</p>
      </div>
    </div>
    <div class="row bg-dark-lighten rounded profile-row">
      <div class="col-12">
        <img class="my-2 profile-img" v-for="t in tickets" :title="t.account.name" :src="t.account.picture" alt="">
        <div v-if="tickets.length == 0" class="d-flex align-items-center justify-content-center profile-row">
          <p class=" text-light">nobody to show...</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue"
import { AppState } from "../AppState"

export default {
  setup() {
    return {
      tickets: computed(() => AppState.activeEventTickets)
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

.profile-row {
  min-height: 5vw;
}
</style>
