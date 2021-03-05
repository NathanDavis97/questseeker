<template>
  <div class="AddLocationPage container-fluid font">
    <div class="AddLocationFormSection row">
      <div class="col d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="createObjective">
          <div class="form-group mx-sm-3 mb-2 my-4">
            <input type="text" class="form-control" v-model="state.location.value" id="inputPassword2" placeholder="Add Location">
          </div>
          <!-- Button trigger modal -->
          <button type="button" @click="findLocation" class="btn btn-outline-primary mb-2 my-4 text-white backdrop" data-toggle="modal" data-target="#ObjectiveCreationModal">
            <i class="fas fa-plus"></i>
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
                  <div class="row justify-content-center">
                    <button type="submit" class="btn create-button">
                      Create Objective
                    </button>
                  </div>
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
        <!-- FIXME remove router links here Just for basic navigation for now-->
        <router-link :to="{ name: 'ObjectiveReviewPage', params: {questid: state.questId}}">
          <button class="btn btn-outline-primary mb-2 my-4 text-white backdrop rounded-pill">
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
import NotificationService from '../services/NotificationService'
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
    const closeModal = () => {
      $('#ObjectiveCreationModal').modal('hide')
    }
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
        async(results, status) => {
          if (status !== 'OK') {
            // debugger
            if (await NotificationService.alert()) {
              closeModal()
            }
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
          state.location = {}
          state.objective = {}
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
.font{
  font-family: 'Montserrat Alternates', sans-serif
}
.border{
  border: 8;
  border-color: black;
}
<<<<<<< HEAD
.create-button{
   border: 2px solid #0A0732;
  background-color: rgba(184, 183, 183, 0.183);
  color: #0A0732;
  font-family: 'Montserrat Alternates', sans-serif
=======
.backdrop{
  background-color: rgba(20, 20, 20, 0.062);
>>>>>>> 63acfbcd6e3e0ed13bed6550460790f5a7e6275c
}
</style>
