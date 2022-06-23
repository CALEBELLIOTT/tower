
<template>
  <div class="row">
    <div class="col-12 background-img rounded my-2">
      <div class="row p-4">
        <div class="col-md-4">
          <img class="img-fluid rounded elevation-3" :src="activeEvent.coverImg" alt="">
        </div>
        <div class="col-md-8 d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between font-weight-bold">
            <div class="d-flex flex-column mt-2">
              <h4>{{ activeEvent.name }}</h4>
              <h5>{{ activeEvent.location }}</h5>
            </div>
            <div class="d-flex flex-column mt-2">
              {{ activeEvent.startDate }}
            </div>
          </div>
          <p class="mt-5">{{ activeEvent.description }}</p>
          <div class="d-flex justify-content-between">
            <h4><span class="text-danger">{{ activeEvent.capacity }}</span> spots left</h4>
            <button v-if="checkAttending()" @click="cancelAttendEvent" class="btn btn-danger"><i
                class="mdi mdi-human-handsdown"></i>
              Cancel Attendance</button>
            <button v-if="checkAttending() == false && activeEvent.capacity > 0" @click="attendEvent"
              class="btn btn-warning"><i class="mdi mdi-human-handsdown"></i>
              Attend</button>
          </div>
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
import Pop from "../utils/Pop"

export default {
  props: { activeEvent: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.activeEventTickets),
      async attendEvent() {
        try {
          eventsService.attendEvent()
        } catch (error) {
          console.error(error)
          Pop.toast(error.message, "error")
        }
      },
      async cancelAttendEvent() {
        try {
          eventsService.cancelAttendEvent()
        } catch (error) {
          console.error(error)
          Pop.toast(error.message, "error")
        }
      },
      checkAttending() {
        let found = AppState.activeEventTickets.find(t => t.accountId == AppState.account.id)
        if (found) {
          return true
        }
        return false
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.background-img {
  background-color: rgba(86, 199, 251, 1);
}
</style>
