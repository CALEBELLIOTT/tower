<template>
  <CreateEventModal></CreateEventModal>
  <div class="row text-light">
    <div class="col-12 d-flex flex-column bg-dark-lighten align-items-center">
      <login></login>
      <router-link :to='{ name: "Home" }'>
        <h5 class="my-2 nav">Home</h5>
      </router-link>
      <div v-if="user.name" class="d-flex flex-column align-items-center">
        <router-link :to="{ name: 'Account' }">
          <h5 class="my-2 nav">Account</h5>
        </router-link>
        <button class="btn btn-success my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Event</button>
        <button @click="logout()" class="btn btn-outline-light my-2">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.bg-dark-lighten {
  background: linear-gradient(rgba(71, 76, 97, 1), rgba(42, 45, 58, 1));
  height: 100vh;
}

.nav {
  color: var(--bs-light);
  transition: 500ms;
}

.nav:hover {
  color: var(--bs-success);
  transition: 500ms;
}
</style>
