<template>
  <div class="container-fluid">
    <div class="row bg-dark min-height">
      <div class="col-md-11">
        <main>
          <router-view />
        </main>
      </div>
      <div class="col-1 d-md-block d-none">
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

.min-height {
  min-height: 100vh;
}
</style>
