<template>
  <div class="page">
    <h1>Device Detail</h1>
    <table class="table table-responsive table-bordered table-striped table-hover">
      <tbody>
        <tr><td>ID</td>{{ device_detail.id}}</td></tr>
        <tr><td>LAT</td><td>{{device_detail.lat}}</td></tr>
        <tr><td>LNG</td><td>{{device_detail.lng}}</td></tr>
        <tr><td>TIMESTAMP</td><td>{{device_detail.time}}</td></tr>
        <tr><td>RSSI</td><td>{{device_detail.rssi}}</td></tr>
      </tbody>
    </table>
  {{device_detail}}
  </div>

</template>

<script>

export default {
  data() {
  },

  computed: {
    device_detail() {
            let id =  this.$store.state.route.params.id;

            let devs =  this.$store.state.devices;
            let details = {};

            for(var i of devs){
              if(i.key == id) {
                details = JSON.parse(i.value);
                details.id = i.key;
                break;
              }
            }
            console.log("DEVDET: ", id, details)
            return details;
      }
  }
}
</script>

<style>


</style>
