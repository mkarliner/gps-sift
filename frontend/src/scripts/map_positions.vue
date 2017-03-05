<style>



</style>

<template>
  <div class="page">
    <h1>Device Locations</h1>
      <div class="map">
        <gmap-map :center="center" map-type-id="terrain" :zoom="12" style="width: 100%; height: 100%">
          <template v-for="(m,i) in markers">
          <gmap-marker  @click="infomap(m,i)" ref="infow" :position="m" :clickable="true" :draggable="false" :label="m.label">
          </gmap-marker>
        </template>
          <gmap-info-window  @closeclick="infoClose()":options="infoOptions" :position="infoPos" :opened="infoVis" :content="infoContent"></gmap-info-window>
          <!-- <gmap-circle :center="center" :radius="100" :options="{editable: true}"></gmapcircle> -->
          <gmap-polygon :path="geofence"></gmap-polygon>
        </gmap-map>
      </div>
  </div>

</template>

<script>


export default {
    data() {
      return {

      }

    },
    props: ['positions', 'test', 'geofence'],
        methods: {

        },
        computed: {
            center() {
	      if(this.positions.length > 0) {
              	let firstDev = this.positions[0];
              	let d = firstDev;
              	return {lat: parseFloat(d.lat), lng: parseFloat(d.lng)}
     	      } else {
		return {lat: 51.556230, lng: -0.223796}
	      }
            },
            markers() {
                    console.log("Before big bang", this,  this.positions)
                    //     // if(typeof this.$store.state.devices.map === "undefined") {
                    //     //   return [];
                    //     // }
                    // let devs = this.positions.map((dev,index)=> {
                    //     let d = JSON.parse(dev.value)
                    //     return {
                    //             lat: parseFloat(d.lat),
                    //             lng: parseFloat(d.lng),
                    //             label: d.type == "PassiveEye" ? "P" : "O",
                    //             id: dev.key
                    //           }
                    // })
                    // console.log("DEVS: ", this.$store.state.devices)
                    let retpos = this.positions.map((p)=> {
                      return {
                        lat: parseFloat(p.lat),
                        lng: parseFloat(p.lng),
                      }

                    })


                  console.log("RETPOS ", retpos)
                  return retpos;
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

<style>

.map {
  height: 100%;
  width: 100%;
}
</style>
