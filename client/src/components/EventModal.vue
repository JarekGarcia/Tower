<template>
    <div class="modal" tabindex="-1" role="dialog" id="createEventModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create Event!</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <form @submit.prevent="createEvent()">
            <div class="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input v-model="editable.name" type="text" class="form-control" id="exampleFormControlInput1"  maxlength="50" minlength="2" required>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Picture</label>
                <input v-model="editable.coverImg" type="url" class="form-control" id="exampleFormControlInput1"  maxlength="500" required>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Location</label>
                <input v-model="editable.location" type="text" class="form-control" id="exampleFormControlInput1"  maxlength="50" minlength="3" required>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Start Date</label>
                <input v-model="editable.startDate" type="date" class="form-control" id="exampleFormControlInput1"  min=date required>
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">Capacity</label>
                <input v-model="editable.capacity" type="Number" class="form-control" id="exampleFormControlInput1"  max= 9000000000 min= 1 required>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea v-model="editable.description" class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="500" minlength="25" required></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Type</label>
    <select v-model="editable.type" class="form-control" id="exampleFormControlSelect1" required>
      <option>concert</option>
      <option>convention</option>
      <option>sport</option>
      <option>digital</option>
    </select>
  </div>
  <div class="modal-footer">
    <button type="submit" class="btn btn-success">Create Event</button>
  </div>
</form>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { Modal } from 'bootstrap';

export default {
    setup(){
        const editable = ref({});
        const types = ["concert", "convention", "sport", "digital"];
        const router = useRouter();

    return { 
types,
editable,

async createEvent(){
    try {
        const eventData = editable.value;
        const event = await eventsService.createEvent(eventData);
        Pop.success('Created Event!');
        editable.value = {};
        Modal.getOrCreateInstance("#createEventModal").hide();
        router.push({name: "EventDetails", params: {eventId: event.id}})
    } catch (error) {
        Pop.error
    }
}
     }
    }
};
</script>


<style lang="scss" scoped>

</style>