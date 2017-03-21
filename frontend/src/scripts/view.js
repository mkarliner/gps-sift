/**
 * Hello Sift Sift. Frontend view entry point.
 */
// var $ = require('jquery');
// import BootStrap from 'bootstrap/dist/js/bootstrap.min.js';
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'

import * as VueGoogleMaps from 'vue2-google-maps';
import Map from './map.vue'
import Register from './register.vue'
import Devices from './devices.vue'
import DeviceDetail from './device_detail.vue'
import qrcode from 'qrcode-generator'

import { sync } from 'vuex-router-sync'
//import store from './vuex/store' // vuex store instance
//import router from './router' // vue-router instance

Vue.use(VueRouter);
Vue.use(Vuex);

var app;

Vue.config.devtools = true

const routes = [
  { path: '/map', component: Map },
  { path: '/', component: Devices },
  { path: '/register', component: Register},
  { path: '/device/:id', component: DeviceDetail}
  // { path: '/foo', component:  Foo, props: {foople: "dddddd"}}
]

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
});
router.replace({ path: '*', redirect: '/' });
router.replace('/');

 const store = new Vuex.Store({
  state: {
    owntracksUri: "nouriyet",
    passiveeyeUri: "nopeyet",
    things_connectedUri: "unset",
    devices: [],
    positions: [],
    geofence: [],
    clock: Date.now()
  },
  mutations: {
    setOwntracksUri(state, uri){
      state.owntracksUri = uri;
    },
    setPassiveEyeUri(state, uri){
      state.passiveeyeUri = uri;
    },
    setThingsConnectedUri(state, uri){
      state.things_connectedUri = uri;
    },
    setDevices(state, devices){
      state.devices = devices;
    },
    setPositions(state, positions){
      state.positions = positions;
    },
    setGeofence(state, geofence){
      state.geofence = geofence;
    },
    setClock(state, now){
      state.clock = now;
    }
  }
});
sync(store, router) // done.


export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
  	this.controller.subscribe(['devices'], this.onDevices.bind(this));
    this.controller.subscribe(['positions'], this.onPositions.bind(this));
    this.controller.subscribe(['geofence'], this.onGeofence.bind(this));

  	Vue.use(VueGoogleMaps, {
	    load: {
	      key: 'AIzaSyAi1bH8DwOUOZ6FHPs2v8tebBCq4aEmRdg',
	      libraries: 'places', //// If you need to use place input
	    }
	  });


    app = new Vue({
  	  router,
      store,
  	  el: '#app',
  	  data: function() { return {} }
    }).$mount('#app')
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('PRESENTVIEW: ', value);
    store.commit('setOwntracksUri', value.data.owntracksUri);
    store.commit('setPassiveEyeUri', value.data.passiveeyeUri);
    store.commit('setThingsConnectedUri', value.data.things_connectedUri);
    store.commit('setDevices', value.data.devices);
    store.commit('setPositions', value.data.positions);
    store.commit('setGeofence', value.data.geofence);

    setInterval(()=>{
      store.commit('setClock', Date.now());
    }, 15 * 1000);

  };

  willPresentView(value) {
    console.log('hello-sift: willPresentView: ', value);
  };

  onDevices(data) {
    console.log("ODEV ", data)
    store.commit('setDevices', data);
  }

  onPositions(data) {
    store.commit('setPositions', data);
  }

  onGeofence(data) {
    store.commit('setGeofence', data);
  }

}

registerSiftView(new MyView(window));
