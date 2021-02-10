<template>
  <div class="ObjectiveComponent">
    <div class="row justify-content-center">
      <div class="col-8 m-3">
        <div class="card  text-center">
          <strong>{{ objectiveProp.title }}</strong>
          <p>{{ objectiveProp.location.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjectiveComponent',
  props: {
    objectiveProp: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
