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
    devices: [],
    positions: []
  },
  mutations: {
    setOwntracksUri(state, uri){
      console.log("SOTURI", uri);
      state.owntracksUri = uri;
    },
    setPassiveEyeUri(state, uri){
      console.log("SPEURI", uri);
      state.passiveeyeUri = uri;
    },
    setDevices(state, devices){
      console.log("SPEDEV", devices);
      state.devices = devices;
    },
    setPositions(state, positions){
      console.log("SPEPOS", positions);
      state.positions = positions;
    },
    setClock(state, now){
      console.log("CLOCK", now);
      state.clock = now;
    }
  }
});
sync(store, router) // done.


export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
  	this.controller.subscribe(['devices', 'positions'], this.onDevices.bind(this));

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
    store.commit('setDevices', value.data.devices);
    store.commit('setPositions', value.data.positions);
  };

  willPresentView(value) {
    console.log('hello-sift: willPresentView: ', value);
  };

  onDevices(data) {
    console.log('DEVICE DATA: ', data.devices);
    store.commit('setDevices', data.devices);
    store.commit('setPositions', data.positions);
  }

}

registerSiftView(new MyView(window));
