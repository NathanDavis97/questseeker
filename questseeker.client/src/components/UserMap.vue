<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
// import { locationService } from '../services/LocationService'
import router from '../router'
// import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  name: 'UserMap',
  props: {
    center: { lat: Number, lng: Number },
    default: { lat: 43.6150, lng: -116.2023, title: 'Egyptian Theatre' },
    zoom: Number,
    mapType: String,
    disableUI: Boolean,
    markers: Array
  },

  setup(props) {
    // the google map object
    const map = ref(null)

    // the map element in the templste
    const mapDivRef = ref(null)
    const route = useRoute()
    const state = reactive({
      userLocation: {}
      // markers: computed(() => AppState.objectives)
    })
    // load in the google script
    onMounted(() => {
      // key is is the .env file

      // create the script element to load
      const googleMapScript = document.createElement('SCRIPT')
      googleMapScript.setAttribute(
        'src',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlOITkG1GWuLi0xhNES4Fa0Co4dC-Iy90&callback=initMap'
      )
      googleMapScript.setAttribute('defer', '')
      googleMapScript.setAttribute('async', '')
      document.head.appendChild(googleMapScript)
    })

    /**
     * this function is called as soon as the map is initialized
     */
    let mapMarkers = []
    const loadMapMarkers = async() => {
      // removed .length for now
      if (!props.markers.length) return
      props.markers.forEach(markerInfo => {
        const mapMarker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerInfo.location.lat, markerInfo.location.lng),
          map: map.value,
          title: markerInfo.title
          // store_id: markerInfo.id
        })

        mapMarker.infoWindow = new window.google.maps.InfoWindow({
          content: markerInfo.title
        })

        mapMarker.addListener('click', async() => {
          // Get user location:
          if (navigator.geolocation) {
            const objectiveLocation = {}
            objectiveLocation.lat = markerInfo.location.lat
            objectiveLocation.lng = markerInfo.location.lng
            objectiveLocation.id = markerInfo.objectiveId
            logger.log(markerInfo)
            await getDistance(function(p) {
              logger.log('distance func')
              logger.log(p)
              logger.log(state.userLocation)
              // debugger
              if (state.userLocation.latitude <= objectiveLocation.lat + 0.1 && state.userLocation.latitude >= objectiveLocation.lat - 0.1 && state.userLocation.longitude <= objectiveLocation.lng + 0.1 && state.userLocation.longitude >= objectiveLocation.lng - 0.1) {
                router.push({ name: 'ObjectiveDetails', params: { questid: route.params.questid, id: objectiveLocation.id } })
              } else {
                mapMarker.infoWindow.open(map.value, mapMarker)
              }
            })
            // navigator.geolocation.getCurrentPosition((p) => getDistance(p))
            logger.log('this is after get distance funct', state.userLocation)
            // debugger

            // this.getDistance(state.userLocation, objectiveLocation)
            logger.log('This should be the user latlng', state.userLocation)
            logger.log('This should be the objective latlng', objectiveLocation)
          } else {
            window.alert('Geolocation is not supported by this browser.')
          }

          // If within range specified router.push to next page. Else open window

          // NOTE this is the open info window toggle
          // if (mapMarker.infoWindow !== null) {
          //   mapMarker.infoWindow.open(map.value, mapMarker)
          // }
        })

        mapMarkers = [...mapMarkers, mapMarker]
      })

      return mapMarkers
    }
    async function getDistance(callback) {
      // debugger
      navigator.geolocation.getCurrentPosition((p) => {
        const returnValue = {
          latitude: p.coords.latitude,
          longitude: p.coords.longitude
        }
        // const serializeCookie = serialize(returnValue)
        // $.cookie('geolocation', serializeCookie)

        // and here you call the callback with whatever
        // data you need to return as a parameter.
        logger.log(returnValue, 'return val')
        // logger.log(serializeCookie, 'serialize val')
        state.userLocation = { latitude: p.coords.latitude, longitude: p.coords.longitude }
        logger.log(state.userLocation)
        callback(returnValue)
      })

      // state.userLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      logger.log('This is the state object', state.userLocation)
    }

    window.initMap = () => {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || 'hybrid',
        zoom: props.zoom || 8,
        disableDefaultUI: props.disableUI || false,
        center: { lat: 43.6150, lng: -116.2023 }

      })
      loadMapMarkers()
    }
    return {
      mapDivRef,
      state

    }
  }
}
</script>

<style lang="css" scoped>
.map {
  width: 100%;
  /* height: 650px; */
  background-color: azure;
  object-fit: fill;
  min-height: 82.54vh;
}
</style>
