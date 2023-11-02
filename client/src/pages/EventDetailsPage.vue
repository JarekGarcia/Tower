<template>
    <div class="container-fluid">
        <section class="row">
            <div v-if="event" class="col-12">
                <div class="row">
                    <div class="col-12 col-md-4 p-1">
    <img :src="event.coverImg" :alt="event.name" class="img-fluid rounded">
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row">
                            <div class="col-6 p-2">
                            <div class="d-flex flex-column text-light">
                                <p class="fs-1">{{ event.name }}</p>
                                <p class="fs-5"><span class="fw-bold">Location:</span> {{ event.location }}</p>
                            </div>
                        </div>
                        <div class="col-6 text-light fs-5 p-2">
                            <p><span class="fw-bold">Start Date:</span> {{ event.startDate }}</p>
                        </div>
                        <div class="col-12 fs-5 p-2">
                            <p class="text-light"><span class="fw-bold">Description:</span> {{ event.description }}</p>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 text-light fs-5 p-2">
<p><span class="fw-bold">Tickets Left:</span>{{ event.capacity }}</p>
                                </div>
                                <div class="col-6 d-flex justify-content-end p-2">
                                    <button class="btn btn-success">Get Ticket</button>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
export default {
    setup(){
        const route = useRoute();
        onMounted(() => {
getEventById()
        });

        async function getEventById(){
            try {
                const eventId = route.params.eventId
                await eventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }


    return { 
        route,
        event: computed(()=> AppState.activeEvent)


     }
    }
};
</script>


<style lang="scss" scoped>

</style>