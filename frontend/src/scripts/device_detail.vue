



<template>
  <div>
    <h1>Device Detail</h1>
    <!-- <ul id="device-list">
      <li v-for="dev in devices">
      id: <router-link :to="'/device/' + dev.key">{{ dev.key}}</router-link>
      rssi: {{dev.value.rssi}}
      lat: {{dev.value.lat}}
      long: {{dev.value.lng}}
      seqNum: {{dev.value.seqNumber}}
      {{new Date(dev.value.time*1000).toString()}}
  </li>
</ul> -->
  {{device_detail}}
  </div>

</template>

<script>

export default {
  data() {
  },

  computed: {
    device_detail() {
            let id =  this.$store.state.route.params;

            let details =  this.$store.state.devices;
            console.log("DEVDET: ", id, details, details)
      }
  }
}
</script>

<style>


</style>
