<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center justify-content-evenly mt-3">
        <div class="row justify-content-center">
          <div class="col-6 col-md-12 justify-content-evenly">
            <p class="fs-5 text-light text-center fw-bold">Categories:</p>
            <button @click="changeCategory('')" class="fs-5 btn btn-outline-light w-100 mb-3">all</button>
            <button @click="changeCategory(category)" class="fs-5 btn btn-outline-light w-100 mb-3" v-for="category in categories" :key="category">
    {{ category }}
            </button>

          </div>
        </div>
      </div>
    </div>
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-12 col-md-3">
        <EventCard :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import {eventsService} from '../services/EventsService'
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
export default {
 setup() {
  const categories = ["concert", "convention","sport","digital"]
  const filteredCategory = ref("")

onMounted(() => {
  getEvents()
})

async function getEvents(){
  try {
    await eventsService.getEvents()
  } catch (error) {
    Pop.error(error)
  }
}
    return {
      categories,
      filteredCategory,
events: computed(() => {
  if(filteredCategory.value){
    return AppState.events.filter(
      (event) => event.type == filteredCategory.value
    )
  } else {
    return AppState.events
  }
}),

changeCategory(category){
  logger.log(category)
  filteredCategory.value = category
}

    }
  }
}
</script>

<style scoped lang="scss">

</style>
