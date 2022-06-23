
<template>
  <div class="row">
    <div class="col-12 bg-hero">
      <div class="row">
        <div class="col-6 d-flex flex-column align-items-center mt-5 pt-3">
          <h3 class="mb-4">Get Ahead Of The Scalpers</h3>
          <h4 class="translate-x">Reserve Your Seat Ahead Of Time</h4>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.bg-hero {
  background-image: url(../assets/img/rod-long-_Aey8X0-G6w-unsplash.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 35vh;
  border: 2px solid rgba(86, 199, 251, 1);
}

.translate-x {
  transform: translateX(5rem);
}
</style>
