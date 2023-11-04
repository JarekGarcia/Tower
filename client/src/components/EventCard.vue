<template>
    <div>
    <router-link :to="{name: 'EventDetails', params: {eventId: eventProp.id}}">
        <img :src="eventProp.coverImg" :alt="eventProp.name" class="img-fluid mt-5 rounded-top">
        <div class="bg-secondary p-3 rounded-bottom">
            <p v-if="eventProp.isCanceled" class="text-danger fw-bold fs-5">Event Canceled</p>
            <p v-if="eventProp.capacity == 0" class="text-danger fw-bold fs-5">Event Sold Out!</p>
            <p class="fw-bold">{{ eventProp.name }}</p>
            <p><span class="fw-bold">Location:</span> {{ eventProp.location }}</p>
            <p><span class="fw-bold">Start Date:</span> {{ eventProp.startDate.toLocaleDateString() }}</p>
            <p class="d-flex justify-content-end">Tickets Left:<span class="fw-bold"> {{ eventProp.capacity }}</span></p>
        </div>
    </router-link>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Event } from '../models/Event';
export default {

    props: {eventProp: {type: Event, required: true}},
    setup(){


    return { 


     }
    }
};
</script>


<style lang="scss" scoped>

</style>