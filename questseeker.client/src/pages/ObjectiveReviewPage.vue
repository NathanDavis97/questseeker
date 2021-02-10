<template>
  <div class="ObjectiveReviewPage container-fluid">
    <ObjectiveComponent v-for="objective in state.objectives"
                        :key="objective.id"
                        :objective-prop="objective"
    />
    <div>
      <div class="row justify-content-center">
        <div class="col-6 mb-4">
          <button class="btn btn-outline-success m-1" v-if="state.activeQuest.isActive === true" @click="questActive">
            <small>
              Quest now ACTIVE!</small>
          </button>
          <button class="btn btn-outline-danger m-1" v-if="state.activeQuest.isActive === false" @click="questActive">
            <small>
              START THE QUEST</small>
          </button>
          <button class="btn btn-outline-success m-1" v-if="state.activeQuest.isJoinable === true" @click="questJoinable">
            <small>
              Joinable</small>
          </button>
          <button class="btn btn-outline-danger m-1" v-if="state.activeQuest.isJoinable === false" @click="questJoinable">
            <small>
              NOT Joinable</small>
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
          <button class="btn btn-outline-danger" v-if="state.activeQuest.isJoinable === true && state.activeQuest.isActive === true">
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
      },
      async questActive() {
        try {
          state.activeQuest.isActive = !state.activeQuest.isActive
          const update = state.activeQuest.isActive
          await questService.questActive(state.activeQuest.id, update)
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
