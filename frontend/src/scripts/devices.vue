<template>
  <div class="page devices">
    <h1>Device List</h1>
    <table class="table table-responsive table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>Type</th>
          <th>Device ID</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Age</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dev in devices" >
          <td>{{dev.value.type}}</td>
          <td><router-link :to="'/device/' + dev.key">{{ dev.key}}</router-link></td>
          <td>{{dev.value.lat}}</td>
          <td>{{dev.value.lng}}</td>
          <td>{{dev.value.time}}</td>
          <td>{{dev.value.age}}</td>
        </tr>
        <tr v-for="dev in dummy">
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

const parse = {
  age: val => moment(val * 1000).format(),
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

  data () {},
  // beforeDestroy: function () {
  //   console.log("DESTROYED: ", this)
  //   this.$store.state =={};
  //   clearIntervall(this.timeUpdates)
  // },

  computed: {
    devices () {
      let dummy = this.$store.state.clock;
      // console.log("RUNNING: ", dummy.toString())
      return this.$store.state.devices.map((dev) => {
        let raw = JSON.parse(dev.value);
        raw.age = raw.time;
        return {
          key: dev.key,
          value: format(raw)
        }
      });
    },
    clock(){
      return this.$store.state.clock.toString();
    }
  }
}
</script>

<style>


</style>
