



<template>
  <gmap-map
    :center="center"
    map-type-id="terrain"
    :zoom="15"
    style="width: 800px; height: 400px"
  >
  <gmap-marker :enabled="true" :opacity="1" :position="{lat:51.556002, lng:-0.224031}"> </marker>
  <gmap-circle   :center="{lat:51.556002, lng:-0.224031}" :radius="100" :options="{editable: true}"></circle>

  </gmap-map>
</template>

<script>
export default {
  data() {
    return {
      center: {lat:51.556002, lng:-0.224031},
      msg: 'Hello Mikey'
    }
  }
}
</script>

<style>


</style>
