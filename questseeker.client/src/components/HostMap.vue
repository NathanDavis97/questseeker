<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'HostMap',
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
    const loadMapMarkers = () => {
      if (!props.markers.length) return
      props.markers.forEach(markerInfo => {
        const mapMarker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(markerInfo.lat, markerInfo.lng),
          map: map.value,
          title: markerInfo.title
        })
        mapMarkers = [...mapMarkers, mapMarker]
      })
      return mapMarkers
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
      mapDivRef
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
