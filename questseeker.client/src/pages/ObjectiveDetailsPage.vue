<template>
  <div class="ObjectiveDetailsPage container-fluid bg font">
    <div class="row">
      <div class="col text-center m-2">
        <h2>{{ state.objective.title }}</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <div class="card mt-1 text-left custom">
          <div class="card-body">
            <p class="card-text">
              {{ state.objective.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center my-4">
      <form class="form-inline" @submit.prevent="submitAnswer">
        <div class="form-group mx-sm-3 mb-2 my-4">
          <input type="text"
                 class="form-control"
                 id="inputPassword2"
                 v-model="state.answer.body"
                 placeholder="submit Answer"
          >
        </div>
        <!-- Button trigger modal -->
        <button type="submit" class="btn btn-primary mb-2 my-4" data-toggle="modal" data-target="#ObjectiveCreationModal">
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
</style>
