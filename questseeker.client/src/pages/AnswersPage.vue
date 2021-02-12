<template>
  <div class="AnswersPage container-fluid">
    <ObAnComponent v-for="objective in state.objectives"
                   :key="objective.id"
                   :objects-prop="objective"
    />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'

import { logger } from '../utils/Logger'

export default {
  name: 'AnswersPage',
  setup(props) {
    const state = reactive({
      answers: computed(() => AppState.answers),
      account: computed(() => AppState.account),
      objectives: computed(() => AppState.objectives),
      activeQuest: computed(() => AppState.activeQuest)
    })
    onMounted(async() => {
      try {
        logger.log(state.activeQuest, 'getting activequest')
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
