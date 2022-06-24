
<template>
  <div class="row text-muted">
    <div class="col-2 d-flex">
      <transition>
        <p v-show="filtered === true" id="none" @click="setActive('none')" class="nav-item">reset filter</p>
      </transition>
    </div>
  </div>
  <div class="row bg-dark-lighten mt-2">
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
import { computed } from "vue";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";

export default {
  setup() {
    let filtered = computed(() => AppState.filtered)
    return {
      filtered,
      async setActive(type) {
        AppState.filtered = true
        console.log(filtered);
        let targets = document.getElementsByClassName('nav-item')
        for (let i = 0; i < targets.length; i++) {
          const element = targets[i];
          element.classList.remove('active')
        }
        document.getElementById(type).classList.add('active')
        await eventsService.getEvents()
        if (type == 'none') {
          AppState.filtered = false
          console.log(AppState.filtered);
          return
        }
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
  border-radius: 15%;
  transition: 750ms;
  color: rgba(121, 231, 171, 1);
}

.nav-item {
  border-bottom: 4px solid rgba(42, 45, 58, 1);
  transition: 1000ms;

}

.active {
  color: rgba(121, 231, 171, 1);
  border-bottom: 4px solid rgba(121, 231, 171, 1);
  border-radius: 15%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
