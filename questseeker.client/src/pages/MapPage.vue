<template>
  <div class="MapPage container-fluid">
    <div class="row">
      <div class="col">
        <UserMap :disable-u-i="false"
                 :zoom="15"
                 map-type="roadmap"
                 :center="{ lat: 43.6150, lng: -116.2023 }"
                 :markers="state.markers"
        >
        </UserMap>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { objectiveService } from '../services/ObjectiveService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
// import { logger } from '../utils/Logger'
export default {
  name: 'MapPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      markers: computed(() => AppState.markerInfo)
    })
    // FIXME this doesn't work yet
    onMounted(async() => {
      try {
        objectiveService.getMarkers(route.params.questid)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
      // function that goes over state.markers. for each marker strips off and takes the title and location. Then push into state.markerInfo.

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
