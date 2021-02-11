<template>
  <div class="TeamsPage container-fluid">
    <TeamComponent v-for="team in state.teams" :key="team.id" :team-prop="team" />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { teamService } from '../services/TeamService'
export default {
  name: 'TeamsPage',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      activeQuest: computed(() => AppState.activeQuest),
      teams: computed(() => AppState.teams)
    })
    onMounted(async() => {
      try {
        await teamService.getAllMembers(state.activeQuest.id)
      } catch (error) {
        logger.log(error)
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
