
<template>
  <div class="container bg-dark">
    <div class="row">
      <div class="col-12">
        <Logo></Logo>
        <EventInfo :activeEvent="activeEvent"></EventInfo>
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
  setup() {
    const route = useRoute()
    onMounted(async () => {
      await eventsService.getEventById(route.params.id),
        await eventsService.getEventAttendees(route.params.id)
    })
    return {
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
