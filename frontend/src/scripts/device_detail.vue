<style>

</style>

<template>
<div class="page">
    <h1>Device Detail</h1>
    <table class="table table-responsive table-bordered table-striped table-hover">
        <tbody>
            <tr>
                <td>ID</td>{{ device_detail.type}}</td>
            </tr>
            <tr>
                <td>ID</td>{{ device_detail.id}}</td>
            </tr>
            <tr>
                <td>LAT</td>
                <td>{{device_detail.lat}}</td>
            </tr>
            <tr>
                <td>LNG</td>
                <td>{{device_detail.lng}}</td>
            </tr>
            <tr>
                <td>TIMESTAMP</td>
                <td>{{device_detail.time}}</td>
            </tr>
            <tr>
                <td>DUPLICATE</td>
                <td>{{device_detail.duplicate}}</td>
            </tr>
            <tr>
                <td>SNR</td>
                <td>{{device_detail.snr}}</td>
            </tr>
            <tr>
                <td>STATION</td>
                <td>{{device_detail.station}}</td>
            </tr>
            <tr>
                <td>AVG SNR</td>
                <td>{{device_detail.avgSnr}}</td>
            </tr>
            <tr>
                <td>TEMP</td>
                <td>{{device_detail.temp}}</td>
            </tr>
        </tbody>
    </table>
    <div style="width: 100%">
        <gps-map :positions="positions" :geofence="geofence"></gps-map>
    </div>
    <table class="table table-responsive table-bordered table-striped table-hover">
        <thead>
            <tr>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Last Update</th>
                <th>Temp</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="pos in positions">
                <td>{{pos.lat}}</td>
                <td>{{pos.lng}}</td>
                <td>{{pos.time}}</td>
                <td>{{pos.temp}}</td>
            </tr>
        </tbody>
    </table>
    <table class="table table-responsive table-bordered table-striped table-hover">
        <thead>
            <tr>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gf in geofence">
                <td>{{gf.lat}}</td>
                <td>{{gf.lng}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import LocationMap from './map_positions.vue'
import moment from 'moment'

const parse = {
    time: val => moment(val * 1000).fromNow(),
    lat: val => Number(val).toFixed(6),
    lng: val => Number(val).toFixed(6)
};
const format = values => {
    const result = {};
    Object.keys(values).forEach(key => {
        result[key] = (parse[key] || (i => i))(values[key])
    });
    return result;
};


export default {
    components: {
        'gps-map': LocationMap
    },
    data() {
        return {
            positions: [],
            geofence: [],
            test: "this is a test"
        }
    },

    computed: {
        device_detail() {
            let id = this.$store.state.route.params.id;

            let devs = this.$store.state.devices;
            let details = {};

            for (var i of devs) {
                if (i.key == id) {
                    details = JSON.parse(i.value);
                    details.id = i.key;
                    break;
                }
            }
            return details;
        },
        positions() {
            let id = this.$store.state.route.params.id;
            let posns = this.$store.state.positions;
            let filtered_pos = posns.filter(p => {
                let dev_id = p.key.split('/')[0];
                return dev_id == id;
            })
            this.$data.positions = filtered_pos.map(p => format(JSON.parse(p.value))).reverse();
            return filtered_pos.map(p => format(JSON.parse(p.value))).reverse();
        },
        geofence() {
            let id = this.$store.state.route.params.id;
            let geojson = this.$store.state.geofence;
            console.log("GEOJSON: ", geojson)
            if(!geojson[0]) {
              return [];
            }
            let parsed = JSON.parse(geojson[0].value)
            let gf = parsed.map(g => {
            return {
                lat: parseFloat(g.lat),
                lng: parseFloat(g.lng)
            }
        })
        console.log("GEOFENCEVV ", gf)
        // let filtered_pos =  posns.filter(p=>{
        //   let dev_id = p.key.split('/')[0];
        //   return dev_id == id;
        // })
        // this.$data.positions = filtered_pos.map(p=>format(JSON.parse(p.value))).reverse();
        // return filtered_pos.map(p=>format(JSON.parse(p.value))).reverse();
        return gf
    },

}
}
</script>
