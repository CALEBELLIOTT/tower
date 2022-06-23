<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3" v-for="e in events" :key="e.id">
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
    });
    return {
      events: computed(() => AppState.events)
    };
  },

}
</script>



<style scoped lang="scss">
</style>
