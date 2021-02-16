<template>
  <div class="ObAnComponent">
    <div class="row">
      <div class="col m-2">
        <div class="card text-center">
          <div class="card-header">
            <h1><strong>{{ objectsProp.title }}</strong></h1>
            <h4><i>"{{ objectsProp.body }}"</i></h4>
            <p>{{ objectsProp.location.address }}</p>
          </div>
          <div class="card-body" v-if="state.thisAnswer.body">
            <h4><strong>{{ state.thisAnswer.body }} </strong> </h4>
          </div>
          <div class="m-4" v-if="state.thisAnswer.isCorrect == true">
            <p>CORRECT</p>
          </div>
          <div class="m-4" v-if="state.thisAnswer.isCorrect == false">
            <p>INCORRECT</p>
          </div>
          <div class="m-4" v-if="state.thisAnswer.isCorrect == null">
            <p>Has not been reviewed...</p>
          </div>
          <div v-if="state.thisAnswer.isSubmitted">
            <div class="card-footer" v-if="state.thisAnswer.isCorrect !== true || false ">
              <button class="btn btn-outline-primary" @click="gradeCorrect()">
                Correct
              </button>
              <button class="btn btn-outline-danger" @click="gradeWrong()">
                Wrong
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { teamService } from '../services/TeamService'
import { logger } from '../utils/Logger'

// alias for each objective store the answers on them
export default {
  name: 'ObAnComponent',
  props: {
    objectsProp: { type: Object, required: true },
    userProp: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({
      answers: computed(() => AppState.answers),
      thisAnswer: {},
      userId: props.userProp,
      objective: props.objectsProp._id
    })
    onMounted(async() => {
      try {
        // added await because the res[0] didn't exist yet without awaiting the getAnswers service
        const answer = await teamService.getAnswers(props.userProp, props.objectsProp._id)
        state.thisAnswer = answer[0]
        logger.log('this is getting answers', answer[0])
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,

      async gradeCorrect() {
        state.thisAnswer = await teamService.gradeCorrect(state.thisAnswer.id, state.userId, state.objective)
        state.thisAnswer.isCorrect = true
      },
      async gradeWrong() {
        state.thisAnswer = await teamService.gradeIncorrect(state.thisAnswer.id, state.userId, state.objective)
        state.thisAnswer.isCorrect = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  font-family: 'Montserrat Alternates';
  box-shadow: 0px 3px 8px black;
}
</style>
