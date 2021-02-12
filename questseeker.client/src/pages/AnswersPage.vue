<template>
  <div class="AnswersPage container-fluid">
    <ObAnComponent v-for="objective in state.objectives"
                   :key="objective.id"
                   :objects-prop="objective"
                   :user-prop="state.thisUser"
    />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'

export default {
  name: 'AnswersPage',
  setup(props) {
    const route = useRoute()
    const state = reactive({
      answers: computed(() => AppState.answers),
      account: computed(() => AppState.account),
      objectives: computed(() => AppState.objectives),
      activeQuest: computed(() => AppState.activeQuest),
      thisUser: route.params.id
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
