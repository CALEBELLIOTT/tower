
<template>

  <div class="row">
    <div class="col-12">
      <div class="div d-flex flex-column justify-content-end event-card rounded p-0 m-2"
        :style="`background-image: url(${getImgUrl()})`">
        <div class="row ">
          <div class="col-12">
            <div class="bg-filter">
              <p class="m-0 pt-2"><b>{{ towerEvent.name }}</b></p>
              <p class="text-muted m-0"><b>{{ towerEvent.location }}</b></p>
              <p class="text-muted mb-0 pb-2"><b>{{ towerEvent.startDate }}</b></p>
            </div>
          </div>
        </div>
      </div>
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
        console.log(props.towerEvent.coverImg);
        return props.towerEvent.coverImg
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

}

.bg-filter {
  backdrop-filter: blur(10px) grayscale(50%);

}
</style>
