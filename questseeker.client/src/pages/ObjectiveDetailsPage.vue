<template>
  <div class="ObjectiveDetailsPage container-fluid bg">
    <div class="row">
      <div class="col text-center m-2">
        <h2>{{ state.objective.title }}</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card mt-1 text-left">
          <img class="card-img-top" src="holder.js/100px180/" alt="">
          <div class="card-body">
            <p class="card-text">
              {{ state.objective.body }}
            </p>
          </div>
        </div>
        <div class="row justify-content-center my-4" v-if="state.status === false">
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
        <div class="row" v-if="state.status === true">
          <div class="col">
            <p>Already submitted</p>
          </div>
        </div>
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
      // FIXME make onloaded ffrom instaham. need to wait for the response.
      status: computed(() => AppState.status),
      answer: { isSubmitted: true, objectiveId: route.params.id, questId: route.params.questid }
    })
    onMounted(async() => {
      try {
        await objectiveService.getObjective(state.objectiveId)
        // TODO await the login before this fires off
        await objectiveService.getAnswers(state.objectiveId)
      } catch {
      }
    })
    return {
      state,
      async submitAnswer() {
        try {
          await objectiveService.submitAnswer(state.answer)
          state.answer = { isSubmitted: true, objectiveId: route.params.id }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
