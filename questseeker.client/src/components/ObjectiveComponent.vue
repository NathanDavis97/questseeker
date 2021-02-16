<template>
  <div class="ObjectiveComponent font">
    <div class="row justify-content-center">
      <div class="col-8 m-2">
        <div class="card text-center">
          <h3><strong>{{ objectiveProp.title }}</strong></h3>
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
.card{
   font-family: 'Montserrat Alternates', sans-serif;
  box-shadow: 0px 3px 8px black;
}
</style>
