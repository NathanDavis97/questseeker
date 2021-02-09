// import { AppState } from '../AppState'

class HostMapService {
  // loadMapMarkers(markers) {
  //   if (!markers.length) return
  //   // clearMarkers()
  //   markers.forEach(markerInfo => {
  //     const mapMarker = new window.google.maps.Marker({
  //       position: new window.google.maps.LatLng(markerInfo.lat, markerInfo.lng),
  //       map: map.value,
  //       title: markerInfo.title
  //     })
  //     AppState.markers = [...AppState.markers, mapMarker]
  //     // currentMarkers.push(mapMarker)
  //   })
  // }
}

export const hostMapService = new HostMapService()
