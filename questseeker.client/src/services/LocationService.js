
// TODO Need to find user location
// Grab or access the objective location
// Run get distance function to get a number of the distance from the source to the destination.

class LocationService {
  async getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          infoWindow.setPosition(pos)
          infoWindow.setContent('Location found.')
          infoWindow.open(map)
          map.setCenter(pos)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter())
        }
      )
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter())
    }
  }

  async getDistance(source, destination) {
    // NOTE this function only checks the distance between two sets of coords (the user[source] and the objective[destination])
    return window.google.maps.geometry.spherical.computeDistanceBetween(
      new window.google.maps.LatLng(source.lat, source.lng),
      new window.google.maps.LatLng(destination.lat, destination.lng)
    )
  }
}
export const locationService = LocationService
