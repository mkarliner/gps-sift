/**
 * Hello Sift Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

import Vue from 'vue';
import VueRouter from 'vue-router';
import * as VueGoogleMaps from 'vue2-google-maps';

let app;

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes // short for routes: routes
})

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
	this.controller.subscribe('name', this.onHello.bind(this));
	Vue.use(VueRouter);
	// Vue.use(VueGoogleMaps, {
	//     load: {
	//       key: 'YOUR_API_TOKEN',
	//       v: 'OPTIONAL VERSION NUMBER',
	//       // libraries: 'places', //// If you need to use place input
	//     }
	//   });
	app = new Vue({
	  router,
	  el: '#app',
	    data: {
	      message: 'Hello Mike Vue!',
			hook_uri: 'adsadf'
	    }
	}).$mount('#app')
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('hello-sift: presentView: ', value);
	app.message = value.data.name;
	app.hook_uri = value.data.hook_uri;
	// document.getElementById("name").textContent =  value.data.name;
	// document.getElementById("hook-uri").textContent =  value.data.hook_uri;
  };

  willPresentView(value) {
    console.log('hello-sift: willPresentView: ', value);
  };

  onHello(data) {
    console.log('tutorial-sift: onHello: ', data);
    // Object.keys(data).forEach((k) => {
    //   document.getElementById(k).textContent = data[k];
    // });
	app.message = data['name']
  }

}

registerSiftView(new MyView(window));
