<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'HostMap',
  props: {
    center: { lat: Number, lng: Number },
    default: { lat: 43.6150, lng: -116.2023, title: 'Egyptian Theatre' },
    zoom: Number,
    mapType: String,
    disableUI: Boolean,
    markers: Array,
    mapDidLoad: Function
  },
  setup(props) {
    // the google map object
    const map = ref(null)

    // the map element in the templste
    const mapDivRef = ref(null)

    let currentMarkers = []

    const state = reactive({
      markers: computed(() => AppState.markers)
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
    watch(
      () => props.markers,
      () => {
        loadMapMarkers()
      }
    )
    const clearMarkers = () => {
      currentMarkers.forEach(m => {
        m.map = null
      })
      currentMarkers = []
    }

    /**
     * this function is called as soon as the map is initialized
     */
    // let mapMarkers = []
    const loadMapMarkers = () => {
      if (!props.markers.length) return
      clearMarkers()
      props.markers.forEach(markerInfo => {
        const mapMarker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerInfo.lat, markerInfo.lng),
          map: map.value,
          title: markerInfo.title
        })
        // mapmarkers = [...AppState.markers, mapMarker]
        currentMarkers.push(mapMarker)
      })
      return AppState.markers
    }

    window.initMap = () => {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || 'hybrid',
        zoom: props.zoom || 8,
        disableDefaultUI: props.disableUI || false,
        center: { lat: 43.6150, lng: -116.2023 }

      })
      loadMapMarkers()
      props.mapDidLoad && props.mapDidLoad(map, window.google.maps)
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
  height: 400px;
  background-color: azure;
}
</style>
