<template v-if="events">
    <div v-if="events" class="container-fluid">
        <section class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-md-4 p-1">
    <img v-if="events" :src="events.coverImg" :alt="events.name" class="img-fluid rounded">
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row">
                            <div class="col-6 p-2">
                            <div class="d-flex flex-column text-light">
                                <p v-if="events.isCanceled" class="text-danger fs-1">Event Canceled</p>
                                <p v-if="events.capacity == 0" class="text-danger fs-1">Event Sold Out!</p>
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
                        <div class="col-12 mb-5">
                            <div class="row">
                                <div class="col-6 text-light fs-5 p-2">
<p><span class="fw-bold">Tickets Left:</span>{{ events.capacity  }}</p>
<div class="d-flex cheat-code">
    <div v-for="ticket in tickets" :key="ticket.id">
        <p v-if="account.id == ticket.accountId" class="text-success mx-3">You are Attending!</p>
    </div>
</div>
                                </div>
                                <div class="col-6 d-flex justify-content-end p-2">
                                    <button :disabled="events.capacity == 0" @click="createTicket()" :hidden="events.isCanceled == true" class="btn btn-success">Get Ticket</button>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="row">
            <div class="col-12 text-white">
               <p class="fw-bold">Attending:</p>

            </div>
            <div  class="col-6">
                <div v-for="ticket in tickets" :key="ticket.id" class="d-flex text-white">
                    <img class="rounded-circle profile-pic mx-1" :src="ticket.profile.picture" :alt="ticket.profile.name" :title="ticket.profile.name">
                    <p>{{ ticket.profile.name }}</p>
                </div>
            </div>
            <div class="col-12 col-md-6 text-white fw-bold">
                <div>
                    <p>Comment</p>
                </div>
                <form @submit.prevent="createComment()">
                    <label for="comment"></label>
                    <textarea v-model="editable.body" name="body" id="body" cols="40" rows="3" class="rounded" minlength="1" maxlength="100"></textarea>
                    <div>
                        <button type="submit" class="btn btn-success">Post</button>
                    </div>
                </form>
                <div v-for="comment in comments" :key="comment.id" class="bg-secondary p-3 m-5 text-white rounded">
                    <div class="d-flex">
                        <img class="profile-pic rounded-circle mx-1" :src="comment.creator.picture" :alt="comment.creator.name">
                        <p>{{ comment.creator.name }}</p>
                    </div>
                    <div class="comment-box">
                        <p class="comment-box">{{ comment.body }}</p>
                    </div>
                    <div>
                        <button @click="deleteComment(comment.id)" v-if="account.id == comment.creatorId" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { Event } from '../models/Event';
import { ticketsService } from '../services/TicketsService';
import {commentsService} from '../services/CommentsService'
export default {
    
    setup(){
        const editable = ref({})
        const route = useRoute();
        onMounted(() => {
        getEventById()
        getTicketsOnEvent()
        getCommentsOnEvent()
        });

        async function getEventById(){
            try {
                const eventId = route.params.eventId
                await eventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getTicketsOnEvent(){
            try {
                const eventId = route.params.eventId
                await eventsService.getTicketsOnEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getCommentsOnEvent(){
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsOnEvent(eventId)
            } catch (error) {
                Pop.error
            }
        }


    return { 
        editable,
        route,
        events: computed(()=> AppState.activeEvent),
        account: computed(()=> AppState.account),
        tickets: computed(()=> AppState.tickets),
        comments: computed(()=> AppState.comments),


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

                
                },

                async createTicket(){
                    try {
                        const eventId = route.params.eventId;
                        await eventsService.createTicket(eventId)
                        this.events.capacity--
                        
                    } catch (error) {
                        Pop.error(error)
                    }
                },

                async createComment(){
                    try {
                        const commentData = editable.value
                        commentData.eventId = route.params.eventId
                        await commentsService.createComment(commentData)
                        Pop.success('Comment Posted!')
                        editable.value = {}

                    } catch (error) {
                        Pop.error(error)
                    }
                },

                async deleteComment(commentId){
                    try {
                        const yes = await Pop.confirm("Are you sure you want to delete your comment?")
                        if(!yes){
                            return
                        }
                        await commentsService.deleteComment(commentId)
                    } catch (error) {
                        Pop.error(error)
                    }
                }
                

        }

  }
    }

</script>


<style lang="scss" scoped>
.profile-pic{
    height: 3vh;
}

.comment-box{
 overflow: hidden;
}

.cheat-code{
    width: 8rem;
    overflow: hidden;
}
</style>