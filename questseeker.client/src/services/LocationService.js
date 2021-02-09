
class LocationService {
  async getDistanc(userLocation, objectiveLocation) {
    // Need to find user location
    // Grab or access the objective location
    // Run get distance function to get a number of the distance from the
    // source to the destination.
  }

  async getDistance(source, destination) {
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(source.lat, source.lng),
      new google.maps.LatLng(destination.lat, destination.lng)
    )
  }
}
export const locationService = LocationService
