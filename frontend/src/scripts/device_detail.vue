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
        </tbody>
    </table>
    <div style="width: 600px">
      <gps-map :positions="positions"></gps-map>
    </div>
    <div>     </div>
    <table class="table table-responsive table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pos in positions">
          <td>{{pos.lat}}</td>
          <td>{{pos.lng}}</td>
          <td>{{pos.time}}</td>
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
  lat: val => Number(val).toFixed(5),
  lng: val => Number(val).toFixed(5)
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
                  let filtered_pos =  posns.filter(p=>{
                    let dev_id = p.key.split('/')[0];
                    return dev_id == id;
                  })
                  this.$data.positions = filtered_pos.map(p=>format(JSON.parse(p.value))).reverse();
                  return filtered_pos.map(p=>format(JSON.parse(p.value))).reverse();
                }
        }
}

</script>
