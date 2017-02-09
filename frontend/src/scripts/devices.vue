



<template>
  <div>
    <h1>Device List</h1>
    <ul id="device-list">
      <li v-for="dev in devices">
      id: {{ dev.key}}
      rssi: {{dev.value.rssi}}
      lat: {{dev.value.lat}}
      long: {{dev.value.lng}}
      seqNum: {{dev.value.seqNumber}}
      {{new Date(dev.value.time*1000).toString()}}
  </li>
</ul>
  </div>
</template>

<script>

export default {
  data() {
    console.log("DEVS: ", this.$store.state.devices)
    return {
        devices: this.$store.state.devices.map(function(dev){
          return {
            key: dev.key,
            value: JSON.parse(dev.value)
        }
      })
    }
  }
}
</script>

<style>


</style>
