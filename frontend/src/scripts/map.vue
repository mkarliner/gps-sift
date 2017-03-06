<style>

</style>

<template>
<div class="page">
    <h1>Device Map</h1>
    <div class="map" >
        <gmap-map :center="center" ref="mmm" map-type-id="terrain" :zoom="12" style="width: 100%; height: 100%">
            <template v-for="(m,i) in markers">
          <gmap-marker  @click="infomap(m,i)" ref="infow" :position="m" :clickable="true" :draggable="false" :label="m.label">
          </gmap-marker>
</template>
          <gmap-info-window  @closeclick="infoClose()":options="infoOptions" :position="infoPos" :opened="infoVis" :content="infoContent"></gmap-info-window>
          <gmap-circle :center="center" :radius="100" :options="{editable: true}"></gmap-circle>
        </gmap-map>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            infoVis: false,
            infoPos: {
                lat: 51.556230,
                lng: -0.223796
            },
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
            infoContent: "Nothing"
        }

    },
    // mounted() {
    //   console.log("MOUNTED ", this.$refs)
    // },
    //Handle gmap repaint.
    // watch: {
    //     '$route' (to, from) {
    //         // Call resizePreserveCenter() on all maps
    //         Vue.$gmapDefaultResizeBus.$emit('resize')
    //     },
    //     markers: function () {
    //       console.log("MARKERS!!!!")
    //     }
    // },
    methods: {
        infomap(m, i) {
            console.log("INM ", this.infoVis[i], this);
            this.$data.infoPos = m;
            this.$data.infoVis = true;
            this.$data.infoContent = m.id;

        },
        infoClose(m) {
            this.$data.infoVis = false;
        }
    },
    // components: {
    //   'gmap-map': {
    //
    //   }
    // },
    computed: {
        center() {
            if (this.$store.state.devices.length > 0) {
                let firstDev = this.$store.state.devices[0].value;
                let d = JSON.parse(firstDev)
                return {
                    lat: parseFloat(d.lat),
                    lng: parseFloat(d.lng)
                }
            } else {
                return {
                    lat: 51.556230,
                    lng: -0.223796
                }
            }
        },
        markers() {
            console.log("Before big bang", this.$children)
            // if(typeof this.$store.state.devices.map === "undefined") {
            //   return [];
            // }
            let devs = this.$store.state.devices.map((dev, index) => {
                let d = JSON.parse(dev.value)
                return {
                    lat: parseFloat(d.lat),
                    lng: parseFloat(d.lng),
                    label: d.type == "PassiveEye" ? "P" : "O",
                    id: dev.key
                }
            })
            let bounds = new google.maps.LatLngBounds();
            devs.map(d=>{
              bounds.extend({lat: parseFloat(d.lat), lng: parseFloat(d.lng)})
            })
            console.log("DEVS: ", this.$refs, this.$store.state.devices)
            //Zoom map to fit markers
            //this.$children[0].$mapObject.fitBounds();
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

<style>
.map {
    height: 100%;
}
</style>
