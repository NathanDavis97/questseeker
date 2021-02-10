<template>
  <div class="ObjectiveReviewPage container-fluid">
    <ObjectiveComponent v-for="objective in state.objectives"
                        :key="objective.id"
                        :objective-prop="objective"
    />
    <div>
      <div class="row justify-content-center">
        <div class="col-6 mb-4">
          <button class="btn btn-outline-primary">
            <small>
              START THE QUEST</small>
          </button>
          <button class="btn btn-outline-primary" @click="questJoinable">
            <small>
              Create Quest Code</small>
          </button>
        </div>
      </div>
      <div class="row" v-if="state.activeQuest.isJoinable === true">
        <div class="col text-center">
          <p class="m-2">
            Your Quest Code:
          </p>
          <div class="card bottom-c">
            <h1>{{ state.activeQuest.accessCode }}</h1>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-6 m-4">
          <button class="btn btn-outline-danger">
            <small>
              Current Answers</small>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { objectiveService } from '../services/ObjectiveService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { questService } from '../services/QuestService'

export default {
  name: 'ObjectiveReviewPage',
  setup() {
    const state = reactive({
      activeQuest: computed(() => AppState.activeQuest),
      objectives: computed(() => AppState.objectives)
    })
    onMounted(async() => {
      try {
        logger.log(state.activeQuest, 'getting activequest')
        await objectiveService.getAllObjectives(state.activeQuest.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async questJoinable() {
        try {
          state.activeQuest.isJoinable = !state.activeQuest.isJoinable
          const update = state.activeQuest.isJoinable
          await questService.questJoinable(state.activeQuest.id, update)
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
