
<template>
  <div class="row">
    <div class="col-12 background-img rounded my-2">
      <div class="row p-4">
        <div class="col-4">
          <img class="img-fluid rounded elevation-3" :src="activeEvent.coverImg" alt="">
        </div>
        <div class="col-8">
          <div class="d-flex justify-content-between font-weight-bold">
            <div class="d-flex flex-column ">
              <h4>{{ activeEvent.name }}</h4>
              <h5>{{ activeEvent.location }}</h5>
            </div>
            <div class="d-flex flex-column">
              {{ activeEvent.startDate }}
            </div>
          </div>
          <p class="mt-5">{{ activeEvent.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"

export default {
  props: { activeEvent: { type: Object, required: true } },
  setup() {

  }
}
</script>


<style lang="scss" scoped>
.background-img {
  background-color: rgba(86, 199, 251, 1);
}
</style>
