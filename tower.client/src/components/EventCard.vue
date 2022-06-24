
<template>

  <div class="row">
    <div class="col-12">
      <router-link :to="{ name: 'Event', params: { id: towerEvent.id } }">
        <div class="div d-flex flex-column justify-content-end event-card rounded p-0 m-2"
          :style="`background-image: url(${getImgUrl()})`">
          <div class="row ">
            <div class="col-12">
              <div class="bg-filter">
                <h4 class="my-0 mx-2 pt-2 text-light"> <u><b>{{ towerEvent.name }}</b></u></h4>
                <p class="text-light mx-2 m-0"><b>{{ towerEvent.location }}</b></p>
                <p class="text-light mx-2 mb-0 pb-0"><b>{{ setDateFormat(towerEvent.startDate) }}</b></p>
                <p v-if="towerEvent.capacity >= 1 && !towerEvent.isCanceled" class="text-end m-0 mx-2 text-light">
                  <b><span class="text-danger">{{
                      towerEvent.capacity
                  }}</span> Spots Left!</b>
                </p>
                <p v-if="towerEvent.capacity <= 0" class=" bg-danger m-0 text-center text-light"><b>SOLD
                    OUT</b></p>
                <p v-if="towerEvent.isCanceled == true" class=" bg-danger m-0 text-center text-light"><b>EVENT
                    CANCELLED</b></p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>

</template>


<script>
import { computed } from "vue"
import { AppState } from "../AppState"

export default {
  props: { towerEvent: { type: Object, required: true } },
  setup(props) {
    return {
      events: computed(() => AppState.events),
      getImgUrl() {
        return props.towerEvent.coverImg
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
  cursor: pointer;
  border: 3px solid rgba(121, 231, 171, 1);
  transition: 500ms;
}

.bg-filter {
  backdrop-filter: blur(10px) grayscale(50%);
}
</style>
