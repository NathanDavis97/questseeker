<template>
  <div class="TeamComponent">
    <div class="row justify-content-center">
      <div class="col m-1">
        <div class="card">
          <div class="card-body text-center">
            <img src="{{state.account.picture}}">
            <h3 class="card-title text-center m-2">
              {{ teamProp.creator.name }}
            </h3>
            <p class="mt-4">
              <router-link :to="{ name: 'AnswersPage', params: {questid: state.activeQuest.id, id: teamProp.creator.id}}">
                {{ teamProp.creator.name }}'s answers
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'TeamComponent',
  props: {
    teamProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeQuest: computed(() => AppState.activeQuest)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
