<template>
  <div class="AddLocationPage container-fluid">
    <div class="AddLocationFormSection row">
      <div class="col d-flex justify-content-center">
        <form class="form-inline">
          <div class="form-group mx-sm-3 mb-2 my-4">
            <input type="password" class="form-control" id="inputPassword2" placeholder="Add Location">
          </div>
          <button type="submit" class="btn btn-primary mb-2 my-4">
            +
          </button>
        </form>
      </div>
    </div>
    <div class="MapSeciton mapSection row" id="AddLocationMap">
      <div class="col">
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end my-4">
        <button class="btn btn-primary">
          Use Current Location
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddLocationPage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.mapSection{
  min-height: 60vh;
}
</style>
