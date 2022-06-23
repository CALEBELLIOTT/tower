<template>
  <div class="container-fluid">
    <div class="row bg-dark">
      <div class="col-11">
        <main>
          <router-view />
        </main>
      </div>
      <div class="col-1">
        <Navbar class="sticky" />
      </div>
    </div>
  </div>


</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.sticky {
  position: fixed
}
</style>
