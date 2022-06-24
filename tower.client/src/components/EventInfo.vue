
<template>
  <div class="row">
    <div class="col-12 background-img rounded my-2" :style="getBackgroundImg(activeEvent.coverImg)">
      <div class="row p-4 content">
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
              {{ setDateFormat(activeEvent.startDate) }}
              <button v-if="!activeEvent.isCanceled && activeEvent.creatorId == account.id" @click="deleteEvent()"
                class="btn btn-danger mt-2">DeleteEvent</button>
            </div>
          </div>
          <p class="mt-5">{{ activeEvent.description }}</p>
          <div class="d-flex justify-content-between">
            <h4 v-if="!activeEvent.isCanceled"><span class="text-danger">{{ activeEvent.capacity }}</span> spots left
            </h4>
            <h4 v-if="activeEvent.isCanceled" class="bg-danger p-2">EVENT HAS BEEN CANCELLED</h4>
            <button v-if="checkAttending()" @click="cancelAttendEvent" class="btn btn-danger"><i
                class="mdi mdi-human-handsdown"></i>
              Cancel Attendance</button>
            <button
              v-if="checkAttending() == false && activeEvent.capacity > 0 && !activeEvent.isCanceled && account.id"
              @click="attendEvent" class="btn btn-warning"><i class="mdi mdi-human-handsdown"></i>
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
  setup(props) {
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
      },
      async deleteEvent() {
        try {
          if (await Pop.confirm('Are you sure you want to cancel this event?', 'this cannot be undone', 'warning', "yes! Cancel it!")) {
            await eventsService.deleteEvent(props.activeEvent.id)
          }
        } catch (error) {
          console.error(error)
          Pop.toast(error.message, "error")
        }
      },
      setDateFormat(date) {
        let newDate = new Date(date)
        newDate = newDate.toDateString()
        return newDate
      },
      getBackgroundImg(url) {
        return `background-image : url('${url}')`
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.background-img {
  // background-image: url('https://www.gannett-cdn.com/-mm-/c869b79e4ee3133ee518af96c8189072b8a50510/c=0-136-2700-1661/local/-/media/2017/11/13/USATODAY/USATODAY/636461566935008690-Beauty-and-the-Beast-Waltz.jpg');
  background-size: cover;
  background-position: center;
}

.content {
  backdrop-filter: blur(3px);
  text-shadow: 1px 1px black;
  background-color: rgba(86, 199, 251, .5);
}
</style>
