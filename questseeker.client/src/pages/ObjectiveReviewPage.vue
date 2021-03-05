<template>
  <div class="ObjectiveReviewPage container-fluid font">
    <ObjectiveComponent v-for="objective in state.objectives"
                        :key="objective.id"
                        :objective-prop="objective"
    />
    <div>
      <div class="row justify-content-around mt-3">
        <button class="btn activ m-1" v-if="state.activeQuest.isJoinable === true" @click="questJoinable">
          <small>
            Give the Code</small>
        </button>
        <button class="btn not-active m-1" v-if="state.activeQuest.isJoinable === false" @click="questJoinable">
          <small>
            Allow Friends</small>
        </button>
        <button class="btn activ m-1" v-if="state.activeQuest.isActive === true" @click="questActive">
          <small>
            Quest ACTIVE</small>
        </button>
        <button class="btn not-active m-1" v-if="state.activeQuest.isActive === false" @click="questActive">
          <small>
            Activate Quest</small>
        </button>
      </div>
      <div class="row" v-if="state.activeQuest.isJoinable === true">
        <div class="col text-center">
          <p class="m-2">
            Access Code:
          </p>
          <div class="card bottom-c ac-code shadow">
            <h1>{{ state.activeQuest.accessCode }}</h1>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col m-4 text-center">
          <button class="btn btn-outline-primary ca shadow" v-if="state.activeQuest.isJoinable === true && state.activeQuest.isActive === true">
            <router-link class="current-answers text-white" :to="{name: 'TeamsPage', params: {questid: state.questId}}">
              <div>
                Current Answers
              </div>
            </router-link>
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
import { useRoute } from 'vue-router'
export default {
  name: 'ObjectiveReviewPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeQuest: computed(() => AppState.activeQuest),
      objectives: computed(() => AppState.objectives),
      questId: route.params.questid
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
.activ{
  position: relative;
  font-family:'Montserrat Alternates', sans-serif;
  font-style:italic;
  border: 2px solid #FAED26 ;
  color: #FAED26;
  background-color: #0A0732;
  box-shadow: 1px 3px 10px rgb(80, 80, 80);
}

.not-active{
  position: relative;
  font-family: 'Montserrat Alternates', sans-serif;
  border: 2px solid #0A0732;
  color: #0A0732;
  box-shadow: 1px 3px 10px rgb(69, 69, 69);
}
.ca{
  background-color: rgba(20, 20, 20, 0.062);
}
.current-answers{
  border-radius: 2%;
  // padding: 15px 20px;
  font-family: 'Montserrat Alternates', sans-serif;
}
.ac-code{
  background-color: rgba(249, 249, 249, 0.829);
}

</style>
