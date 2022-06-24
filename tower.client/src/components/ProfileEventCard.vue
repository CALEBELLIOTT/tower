
<template>

  <div class="row">
    <div class="col-12">
      <div class="div d-flex flex-column justify-content-between event-card rounded p-0 m-2"
        :style="`background-image: url(${getImgUrl()})`">
        <div class="row">
          <div class="col-12 text-end">
            <button @click="deleteTicket()" class="btn btn-danger m-2">Cancel Ticket</button>
          </div>
        </div>
        <div class="row ">
          <router-link :to="{ name: 'Event', params: { id: towerEvent.event.id } }">
            <div class="col-12">
              <div class="bg-filter">
                <p class="my-0 mx-2 pt-2 text-light"><b>{{ towerEvent.event.name }}</b></p>
                <p class="text-light mx-2 m-0"><b>{{ towerEvent.event.location }}</b></p>
                <p class="text-light mx-2 mb-0 pb-0"><b>{{ setDateFormat(towerEvent.event.startDate) }}</b></p>
                <p v-if="towerEvent.event.capacity >= 1 && !towerEvent.event.isCanceled"
                  class="text-end m-0 mx-2 text-light">
                  <b><span class="text-danger">{{
                      towerEvent.event.capacity
                  }}</span> Spots Left!</b>
                </p>
                <p v-if="towerEvent.event.capacity <= 0" class="text-dark bg-danger m-0 text-center"><b>SOLD OUT</b></p>
                <p v-if="towerEvent.event.isCanceled == true" class="text-dark bg-danger m-0 text-center"><b>EVENT
                    CANCELLED</b></p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { computed } from "vue"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"

export default {
  props: { towerEvent: { type: Object, required: true } },
  setup(props) {
    return {
      events: computed(() => AppState.events),
      getImgUrl() {
        return props.towerEvent.event.coverImg
      },
      async deleteTicket() {
        try {
          if (await Pop.confirm('are you sure you want to delete your ticket?', '', 'warning', 'Yes! Delete it!')) {
            await eventsService.deleteTicket(props.towerEvent.id)
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          console.error(error)
        }
      },
      setDateFormat(date) {
        let newDate = new Date(date)
        newDate = newDate.toDateString()
        return newDate
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.event-card {
  border: 3px solid rgba(71, 76, 97, 1);
  height: 25vh;
  background-size: cover;
  background-repeat: no-repeat;
  text-shadow: 1px 1px 1px black;
  transition: 500ms;
}

.event-card:hover {
  border: 3px solid rgba(121, 231, 171, 1);
  transition: 500ms;
}

.bg-filter:hover {
  cursor: pointer;
}

.bg-filter {
  backdrop-filter: blur(10px) grayscale(50%);
}
</style>
