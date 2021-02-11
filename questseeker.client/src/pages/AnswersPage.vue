<template>
  <div class="AnswersPage container-fluid">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h1>{{}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { teamService } from '../services/TeamService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  name: 'AnswersPage',
  setup(props) {
    const route = useRoute()
    const state = reactive({
      answers: computed(() => AppState.answers),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeQuest: computed(() => AppState.activeQuest)
    })
    onMounted(async() => {
      // get objectives to render answers to those objectives
      try {
        await teamService.getAnswers(route.params.id)
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

</style>
