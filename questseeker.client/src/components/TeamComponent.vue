<template>
  <div class="TeamComponent">
    <div class="row justify-content-center">
      <div class="col-8 m-1">
        <div class="card">
          <div class="card-body text-center">
            <img src="{{state.account.picture}}">
            <h3 class="card-title text-center">
              {{ state.user.nickname }}
            </h3>
            <p class="mt-4">
              {{ state.user.nickname }}'s answers
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
      user: computed(() => AppState.user)
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
