<template>
  <div class="ObjectiveDetailsPage container-fluid bg font">
    <div class="row">
      <div class="col text-center m-2">
        <h2>{{ state.objective.title }}</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <div class=" mt-1 text-left custom ">
          <div class="">
            <h4 class="">
              {{ state.objective.body }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center my-4">
      <form class="form-inline" @submit.prevent="submitAnswer">
        <div class="form-group mx-sm-3 mb-2 my-4">
          <input type="text"
                 class="form-control shadow"
                 id="inputPassword2"
                 v-model="state.answer.body"
                 placeholder="Submit Answer"
          >
        </div>
        <!-- Button trigger modal -->
        <button type="submit" class="btn btn-outline-primary mb-2 my-4 text-white backdrop shadow" data-toggle="modal" data-target="#ObjectiveCreationModal">
          Send Answer
        </button>
      </form>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { objectiveService } from '../services/ObjectiveService'
import { AppState } from '../AppState'
export default {
  name: 'ObjectiveDetailsPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      objectiveId: { id: route.params.id },
      objective: computed(() => AppState.activeObjective),
      status: computed(() => AppState.status),
      account: computed(() => AppState.account),
      answer: { isSubmitted: true, objectiveId: route.params.id, questId: route.params.questid }
    })
    onMounted(async() => {
      try {
        await objectiveService.getObjective(state.objectiveId)
        // TODO await the login before this fires off
        // await objectiveService.getAnswers(state.objectiveId)
      } catch {
      }
    })
    return {
      state,
      async submitAnswer() {
        try {
          await objectiveService.submitAnswer(state.answer, state.account)
          state.answer = { isSubmitted: true, objectiveId: route.params.id }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.font{
  font-family: 'Montserrat Alternates', sans-serif
}
.custom{
  width: 21rem;
}
.backdrop{
  background-color: rgba(20, 20, 20, 0.062);
}
</style>
