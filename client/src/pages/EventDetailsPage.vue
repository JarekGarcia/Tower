<template>
    <div class="container-fluid">
        <section class="row">
            <div v-if="events" class="col-12">
                <div class="row">
                    <div class="col-12 col-md-4 p-1">
    <img :src="events.coverImg" :alt="events.name" class="img-fluid rounded">
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row">
                            <div class="col-6 p-2">
                            <div class="d-flex flex-column text-light">
                                <p v-if="events.isCanceled" class="text-danger fs-1">Event Canceled</p>
                                <p class="fs-1">{{ events.name }}</p>
                                <p class="fs-5"><span class="fw-bold">Location:</span> {{ events.location }}</p>
                            </div>
                        </div>
                        <div class="col-6 text-light fs-5 p-2 d-flex justify-content-between">
                            <p><span class="fw-bold">Start Date:</span> {{events.startDate.toLocaleDateString()}}</p>
                            <button v-if="account.id == events.creatorId&events.isCanceled == false" @click="cancelEvent()" class="btn btn text-danger fw-bold">Cancel Event</button>
                        </div>
                        <div class="col-12 fs-5 p-2">
                            <p class="text-light"><span class="fw-bold">Description:</span> {{ events.description }}</p>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 text-light fs-5 p-2">
<p><span class="fw-bold">Tickets Left:</span>{{ events.capacity }}</p>
                                </div>
                                <div class="col-6 d-flex justify-content-end p-2">
                                    <button :hidden="events.isCanceled == true" class="btn btn-success">Get Ticket</button>
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
import { Event } from '../models/Event';
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
        events: computed(()=> AppState.activeEvent),
        account: computed(()=> AppState.account),


        async cancelEvent(){
            try {
                    const yes = await Pop.confirm("ARE YOU SURE YOU WANT TO CANCEL THIS EVENT?")
                    if(!yes){
                        return
                    }
                    const eventId = route.params.eventId
                    await eventsService.cancelEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }

                
                }
                

        }

  }
    }

</script>


<style lang="scss" scoped>

</style>