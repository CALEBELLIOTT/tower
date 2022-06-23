
<template>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark">
        <!-- <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> -->
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h3 class="text-success">Create An Event With Tower</h3>
              </div>
              <div class="col-12">
                <form @submit="createEvent" action="">
                  <div class="row">
                    <div class=" my-2 col-md-4">
                      <label for="">Event Name</label>
                      <input v-model="newEventData.name" required placeholder="Name..." class="form-control"
                        type="text">
                    </div>
                    <div class=" my-2 col-md-4">
                      <label for="">Event Location</label>
                      <input v-model="newEventData.location" required placeholder="Location..." class="form-control"
                        type="text">
                    </div>
                    <div class=" my-2 col-md-4">
                      <label for="">Event Type</label>
                      <select v-model="newEventData.type" required placeholder="select..." class="form-control" name=""
                        id="">
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                      </select>
                    </div>
                    <div class=" my-2 col-md-12">
                      <label for="">Event Description</label>
                      <textarea v-model="newEventData.description" required class="form-control"
                        placeholder="Describe Your Event..." name="" id="" cols="30" rows="4"></textarea>
                    </div>
                    <div class=" my-2 col-md-4">
                      <label for="">Event Image</label>
                      <input v-model="newEventData.coverImg" required placeholder="Image Url..." class="form-control"
                        type="text">
                    </div>
                    <div class=" my-2 col-md-4">
                      <label for="">Event Date</label>
                      <input v-model="newEventData.startDate" required class="form-control" type="date">
                    </div>
                    <div class=" my-2 col-md-4">
                      <label for="">Event Capacity</label>
                      <input v-model="newEventData.capacity" required placeholder="1" class="form-control"
                        type="number">
                    </div>
                    <div class="col-12 d-flex justify-content-end my-2">
                      <button class="btn btn-danger mx-2" data-bs-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-success mx-2">Create Event</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-success">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>


</template>


<script>
import { ref } from "vue";
import { eventsService } from "../services/EventsService";

export default {
  setup() {
    let newEventData = ref({})
    return {
      newEventData,
      createEvent() {
        console.log(newEventData.value);
        eventsService.createEvent(newEventData.value)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
