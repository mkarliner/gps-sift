<style>



</style>

<template>

<gmap-map :center="center" map-type-id="terrain" :zoom="15" style="width: 800px; height: 400px">
    <gmap-marker v-for="m in markers" :position="m" :clickable="true" :draggable="false"></gmap-marker>

    <gmap-circle :center="center" :radius="100" :options="{editable: true}">
        </circle>

</gmap-map>

</template>

<script>

export default {
    data() {},
        computed: {
            center() {
	      if(this.$store.state.devices.length > 0) {
              	let firstDev = this.$store.state.devices[0].value;
              	let d = JSON.parse(firstDev)
              	return {lat: parseFloat(d.lat), lng: parseFloat(d.lng)}
     	      } else {
		return {lat: 51.556230, lng: -0.223796}
	      }
            },
            markers() {
                    console.log("Before big bang", typeof this.$store.state.devices)
                        // if(typeof this.$store.state.devices.map === "undefined") {
                        //   return [];
                        // }
                    let devs = this.$store.state.devices.map(function(dev) {
                        let d = JSON.parse(dev.value)
                        return {lat: parseFloat(d.lat), lng: parseFloat(d.lng)}
                    })
                    console.log("DEVS: ", this.$store.state.devices)
                    return devs
                },
                devices() {
                    console.log("Before big bang", typeof this.$store.state.devices)
                        // if(typeof this.$store.state.devices.map === "undefined") {
                        //   return [];
                        // }
                    let devs = this.$store.state.devices.map(function(dev) {
                        return {
                            key: dev.key,
                            value: JSON.parse(dev.value)
                        }
                    })
                    console.log("DEVS: ", this.$store.state.devices)
                    return devs
                },
        }
}

</script>
