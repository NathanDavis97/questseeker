<template>
  <div class="ObAnComponent">
    <div class="row">
      <div class="col m-2">
        <div class="card text-center">
          <h3><strong>{{ objectsProp.title }}</strong></h3>
          <p>{{ objectsProp.location.address }}</p>
          <p> {{ state.thisAnswer.body }}</p>
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
      thisAnswer: {}
    })
    onMounted(async() => {
      try {
        // added await because the res[0] didn't exist yet without awaiting the getAnswers service
        const res = await teamService.getAnswers(props.userProp, props.objectsProp._id)
        state.thisAnswer = res[0]
        logger.log('this is getting answers')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  font-family: 'Montserrat Alternative';;
  box-shadow: 0px 3px 8px black;
}
</style>
