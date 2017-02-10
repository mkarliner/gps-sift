



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
  <div> CLOCK{{clock}}</div>
  </div>

</template>

<script>

export default {
  data() {
  },
  beforeDestroy: function(){
    console.log("DESTROYED: ", this)
    this.$store.state =={};
  },
  created: function () {
  // `this` points to the vm instance
  console.log('CREATED:  ' + this)
},
  computed: {
    devices() {
            console.log("Before big bang", typeof this.$store.state.devices)
            // if(typeof this.$store.state.devices.map === "undefined") {
            //   return [];
            // }
            let devs = this.$store.state.devices.map(function(dev){
            console.log("MAP: ", dev)
            return {
            key: dev.key,
            value: JSON.parse(dev.value)
        }
      })
        console.log("DEVS: ", this.$store.state.devices)
        return devs
      },
    clock() {
      return this.$store.state.clock.toString()
    }
  }
}
</script>

<style>


</style>
