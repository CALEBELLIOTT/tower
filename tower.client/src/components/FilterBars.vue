
<template>
  <div class="row bg-dark-lighten">
    <div @click="setActive('concert')" id="concert" class="col-md-3 col-6 d-flex justify-content-center nav-item">
      <h3>Concert</h3>
    </div>
    <div @click="setActive('convention')" id="convention" class="col-md-3 col-6 d-flex justify-content-center nav-item">
      <h3>Convention</h3>
    </div>
    <div @click="setActive('sport')" id="sport" class="col-md-3 col-6 d-flex justify-content-center nav-item">
      <h3>Sport</h3>
    </div>
    <div @click="setActive('digital')" id="digital" class="col-md-3 col-6 d-flex justify-content-center nav-item">
      <h3>Digital</h3>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";

export default {
  setup() {
    return {
      // NOTE type refers to a number corresponding to the targeted type of post
      // 1- concert 2- convention 3- sport 4- digital
      async setActive(type) {
        let targets = document.getElementsByClassName('nav-item')
        for (let i = 0; i < targets.length; i++) {
          const element = targets[i];
          element.classList.remove('active')
        }
        document.getElementById(type).classList.add('active')
        await eventsService.getEvents()
        AppState.events = AppState.events.filter(e => e.type == type)
      }
    }
  }
}

</script>


<style lang="scss" scoped>
.nav-item:hover {
  cursor: pointer;
  border-bottom: 4px solid rgba(121, 231, 171, 1);
  transition: 500ms;
  color: rgba(121, 231, 171, 1);
}

.nav-item {
  border-bottom: 4px solid rgba(42, 45, 58, 1);
}

.active {
  color: rgba(121, 231, 171, 1);
  border-bottom: 4px solid rgba(121, 231, 171, 1);
}
</style>
