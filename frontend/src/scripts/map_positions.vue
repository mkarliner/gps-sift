<style>



</style>

<template>
  <div class="page">
    <h1>Device Locations</h1>
      <div class="map">
        <gmap-map :center="center" map-type-id="terrain" :zoom="15" style="width: 100%; height: 100%">
          <template v-for="(m,i) in markers">
          <gmap-marker  :position="m" :clickable="false" :icon="m.icon" :draggable="false" :label="m.label">
          </gmap-marker>
        </template>
          <!-- <gmap-circle :center="center" :radius="100" :options="{editable: true}"></gmapcircle> -->
          <gmap-polygon v-if="geofen" :path="geofence"></gmap-polygon>
        </gmap-map>
      </div>
  </div>

</template>

<script>


export default {
    // data() {
    //   return {
    //
    //   }
    //
    // },
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
		               return { lat: 51.5080, lng: -0.1281}
	             }
            },
            geofen(){
              console.log("GEOFEN ", this.geofence);
              return this.geofence && this.geofence.length>0 ? true : false;
            },
            markers() {
                    //console.log("Before big bang", this,  this.positions)
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
                      //console.log("MARKED POS ", p)
                      let icon = null; //Standard icon (red)
                      if(p.inside) {
                        icon = "http://maps.google.com/mapfiles/ms/micons/green-dot.png"
                      }
                      return {
                        lat: parseFloat(p.lat),
                        lng: parseFloat(p.lng),
                        icon: icon
                      }

                    })


                  //console.log("RETPOS ", retpos)
                  return retpos;
                }
                // devices() {
                //     console.log("Before big bang", typeof this.$store.state.devices)
                //         // if(typeof this.$store.state.devices.map === "undefined") {
                //         //   return [];
                //         // }
                //     let devs = this.$store.state.devices.map(function(dev) {
                //         return {
                //             key: dev.key,
                //             value: JSON.parse(dev.value)
                //         }
                //     })
                //     console.log("DEVS: ", this.$store.state.devices)
                //     return devs
                // },
        }
}

</script>

<style>

.map {
  height: 100%;
  width: 100%;
}
</style>
