<template>
  <div class="page devices">
    <h1>Device List</h1>
    <table class="table table-responsive table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>Device ID</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dev in devices" v-on:click="route('/device/' + dev.key)">
          <td><router-link :to="'/device/' + dev.key">{{ dev.key}}</router-link></td>
          <td>{{dev.value.lat}}</td>
          <td>{{dev.value.lng}}</td>
          <td>{{dev.value.time}}</td>
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
  data () {
    return {
      devices: []
    }
  },
  beforeDestroy: function () {
    console.log("DESTROYED: ", this)
    this.$store.state =={};
    clearIntervall(this.timeUpdates)
  },
  created: function () {
    // `this` points to the vm instance
    console.log('CREATED:  ' + this)
  },
  mounted () {
    this.updateTimes();
    this.timeUpdates = setInterval(() => {
      this.updateTimes();
    }, 60 * 1000);
  },
  methods: {
    updateTimes () {
      if (this.$store.state.devices) {
        this.devices = this.$store.state.devices.map(dev => ({
          key: dev.key,
          value: format(JSON.parse(dev.value))
        }));
      }
    },
    route (path) {
      this.$router.push(path);
    }
  },
  computed: {
    dummy () {
      this.updateTimes();
      return this.$store.state.devices && [];
    }
  }
}
</script>

<style>


</style>
