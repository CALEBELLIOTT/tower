<template>
  <div class="container-fluid">
    <logo></logo>
    <div class="row">
      <div class="col-12 d-flex">
        <p class="text-success">Your Events</p>
      </div>
    </div>
    <div class="row">
      <div v-for="t in tickets" class="col-3">
        <EventCard :towerEvent="t.event"></EventCard>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import EventCard from "../components/EventCard.vue"
export default {
  name: "Account",
  setup() {
    onMounted(async () => {
      await eventsService.getEventsByAccount();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.accountEvents)
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
