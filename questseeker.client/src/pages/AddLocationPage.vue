<template>
  <div class="AddLocationPage container-fluid">
    <div class="AddLocationFormSection row">
      <div class="col d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="createObjective">
          <div class="form-group mx-sm-3 mb-2 my-4">
            <input type="text" class="form-control" v-model="state.location.value" id="inputPassword2" placeholder="Add Location">
          </div>
          <!-- Button trigger modal -->
          <button type="button" @click="findLocation" class="btn btn-primary mb-2 my-4" data-toggle="modal" data-target="#ObjectiveCreationModal">
            +
          </button>

          <!-- Modal -->
          <div class="modal fade"
               id="ObjectiveCreationModal"
               tabindex="-1"
               role="dialog"
               aria-labelledby="exampleModalLongTitle"
               aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Create Quest Event
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <input type="text" class="form-control my-4" placeholder="Objective Title" v-model="state.objective.title">
                  <input type="text" class="form-control my-4" placeholder="Objective Description" v-model="state.objective.body">
                  <!-- TODO change what the input type is so that there is a min and max Range -->
                  <!-- <input type="text" class="form-control my-1" placeholder="Range" v-model="state.objective.range"> -->
                  <button type="submit" class="btn btn-primary">
                    Create Objective
                  </button>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="MapSection mapSection row mx-3" id="AddLocationMap">
      <div class="col">
        <HostMap :disable-u-i="false"
                 :zoom="10"
                 map-type="roadmap"
                 :center="{ lat: 43.6150, lng: -116.2023 }"
                 :markers="state.markers"
                 :map-did-load="handleMapDidLoad"
        >
        </HostMap>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end my-5">
        <button class="btn btn-primary">
          Use Current Location
        </button>
        <!-- FIXME remove router links here Just for basic navigation for now-->
        <router-link :to="{ name: 'ObjectiveReviewPage', params: {questid: state.questId}}">
          <button class="btn btn-primary">
            Review Objectives
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { hostMapService } from '../services/HostMapService'
import $ from 'jquery'
import { useRoute } from 'vue-router'
export default {
  name: 'AddLocationPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      markers: [],
      objective: {},
      location: {},
      result: {},
      questId: route.params.questid

    })
    let geoCoderService = null
    const addLocation = (location) => {
      state.markers = [...state.markers, {
        ...location.position,
        title: location.address
      }]
      // hostMapService.loadMapMarkers()
      logger.log('markers', state.markers)
      logger.log('markers', location)

      AppState.currentLocation = location
    }
    const findLocation = () => {
      geoCoderService.geocode({ address: state.location.value },
        (results, status) => {
          if (status !== 'OK') {
            window.alert('No Result')
          } else {
            logger.log(results)
            state.result = {
              position: results[0].geometry.location.toJSON(),
              address: results[0].formatted_address
            }
            addLocation(state.result)
            logger.log(state.result)
          }
        })
    }
    const handleMapDidLoad = (map, GServices) => {
      logger.log('loaded')
      logger.log('map', map)
      logger.log('services', GServices)
      geoCoderService = new GServices.Geocoder()
    }
    return {
      handleMapDidLoad,
      findLocation,
      state,
      addLocation,
      async createObjective() {
        try {
          await hostMapService.createObjective(state.objective, route.params.questid)
          AppState.currentLocation = {}
          $('#ObjectiveCreationModal').modal('hide')
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
.mapSection{
  min-height: 40vh;
}
</style>
