<template>
  <div class="container-fluid">
    <Logo></Logo>
    <HeroImg></HeroImg>
    <FilterBars></FilterBars>
    <div class="row">
      <div v-if="events.length < 1" class="col-12 d-flex justify-content-center mt-5 text-light">
        <p>Nothing To Show Here...</p>
      </div>
      <div class="col-md-3" v-for="e in events" :key="e.id">
        <EventCard :towerEvent="e"></EventCard>
      </div>
    </div>
  </div>

</template>



<script>
import { computed, onMounted } from "vue"
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService"


export default {
  setup() {
    onMounted(async () => {
      await eventsService.getEvents();
      AppState.activeEvent = {}
      AppState.activeEventComments = []
      AppState.activeEventTickets = []
    });
    return {
      events: computed(() => AppState.events)
    };
  },

}
</script>



<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
