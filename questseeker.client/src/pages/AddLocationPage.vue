<template>
  <div class="AddLocationPage container-fluid">
    <div class="AddLocationFormSection row">
      <div class="col d-flex justify-content-center">
        <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2 my-4">
            <input type="password" class="form-control" id="inputPassword2" placeholder="Add Location">
          </div>
          <!-- Button trigger modal -->
          <button type="submit" class="btn btn-primary mb-2 my-4" data-toggle="modal" data-target="#ObjectiveCreationModal">
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
                  <input type="text" class="form-control my-4" placeholder="Objective Title">
                  <input type="text" class="form-control my-4" placeholder="Objective Description">
                  <!-- TODO change what the input type is so that there is a min and max Range -->
                  <input type="text" class="form-control my-1" placeholder="Range">
                  <button type="button" class="btn btn-primary">
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
                 :zoom="15"
                 map-type="roadmap"
                 :center="{ lat: 43.6150, lng: -116.2023 }"
                 :markers="markers"
        >
        </HostMap>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end my-5">
        <!-- FIXME remove router links here Just for basic navigation for now-->
        <!-- <router-link :to="{ name: 'ObjectiveReviewPage', params: {questId: route.params.id}}"> -->
        <button class="btn btn-primary">
          Use Current Location
        </button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddLocationPage',
  setup() {
    const markers = [
      { lat: 43.6150, lng: -116.2023, title: 'Egyptian Theatre' },
      { lat: 43.7150, lng: -116.20 },
      { lat: 43.6130, lng: -117.2023 }
    ]
    return { markers }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.mapSection{
  min-height: 40vh;
}
</style>
