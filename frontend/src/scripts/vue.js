

import Vue from 'vue';
import VueRouter from 'vue-router';


console.log("VIEWJS")
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAi1bH8DwOUOZ6FHPs2v8tebBCq4aEmRdg',
      libraries: 'places', //// If you need to use place input
    }
  });
app = new Vue({
  router,
  el: '#app',
    data: function() {
      console.log("DATA: ", "owntracks")
      return{
        message: 'Hello Mike Vue!',
      hook_uri: 'adsadf',
      owntracksUri: "none"
      }
    }
}).$mount('#app')
