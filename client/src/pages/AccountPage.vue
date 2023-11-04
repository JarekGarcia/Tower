<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <div class="about text-center text-white">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
        </div>
      </div>
      <div class="col-12">
        <p class="fw-bold fs-1 text-white">My Tickets:</p>
      </div>
      <div class="col-12 col-md-3" v-for="ticket in tickets" :key="tickets.id">
        <img :src="ticket.event.coverImg" :alt="ticket.event.name" class="img-fluid mt-5 rounded-top">
        <div class="bg-secondary p-3 rounded-bottom">
            <p v-if="ticket.event.isCanceled" class="text-danger fw-bold fs-5">Event Canceled</p>
            <p v-if="ticket.event.capacity == 0" class="text-danger fw-bold fs-5">Event Sold Out!</p>
            <p class="fw-bold">{{ ticket.event.name }}</p>
            <p><span class="fw-bold">Location:</span> {{ ticket.event.location }}</p>
            <p>{{ ticket.event.capacity }}</p>
            <button @click="deleteTicket(ticket.id)" class="btn btn-danger">Refund Ticket</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
import { ticketsService } from '../services/TicketsService';

export default {

  setup() {
    onMounted(()=> {
getMyTickets()
    })

    async function getMyTickets(){
      try {
        await accountService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }


    return {

tickets: computed(()=> AppState.tickets),
      account: computed(() => AppState.account),

      async deleteTicket(ticketId){
        try {
          const yes = await Pop.confirm('Are you sure you want to refund ticket?')
        if(!yes){
          return
        }
          await ticketsService.deleteTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
