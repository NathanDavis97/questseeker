<template>
  <div class="ObAnComponent">
    <div class="row">
      <div class="col m-2">
        <div class="card text-center">
          <h3><strong>{{ objectsProp.title }}</strong></h3>
          <p>{{ objectsProp.location.address }}</p>
          <p> {{ state.answers }}</p>
          <!-- <p>{{ props.obectprop.id }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { teamService } from '../services/TeamService'
// alias for each objective store the answers on them
export default {
  name: 'ObAnComponent',
  props: {
    objectsProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      answers: computed(() => AppState.answers)
    })
    return {
      state,
      async getAnswers() {
        await teamService.getAnswers(props.objectsProp.creatorId, props.objectsProp._id)
      }
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
