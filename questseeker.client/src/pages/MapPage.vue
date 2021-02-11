<template>
  <div class="MapPage container-fluid">
    <div class="row">
      <div class="col">
        <UserMap :disable-u-i="false"
                 :zoom="15"
                 map-type="roadmap"
                 :center="{ lat: 43.6150, lng: -116.2023 }"
                 :markers="formatMarkerInfo()"
        >
        </UserMap>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  name: 'MapPage',
  setup() {
    const state = reactive({
      markers: computed(() => AppState.markers),
      passingObject: {},
      markerInfo: []
    })
    return {
      state,
      // function that goes over state.markers. for each marker strips off and takes the title and location. Then push into state.markerInfo.
      formatMarkerInfo() {
        state.markers.forEach(marker => {
          state.passingObject.location = marker.location
          state.passingObject.title = marker.title
          state.passingObject.objectiveId = marker.id
          state.markerInfo.push(state.passingObject)

          // TODO get title later???
          // state.markerInfo.push(marker.title)
          logger.log('this is the formatted', state.markerInfo)
        })
        return state.markerInfo
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
