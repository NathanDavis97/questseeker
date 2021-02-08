<template>
  <div class="MapPage container-fluid">
    <div class="row">
      <div class="col">
        <UserMap :disable-u-i="false"
                 :zoom="15"
                 map-type="roadmap"
                 :center="{ lat: 43.6150, lng: -116.2023 }"
                 :markers="markers"
        >
        </UserMap>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
