/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("/**\n * Hello Sift Sift. Frontend view entry point.\n */\nimport { SiftView, registerSiftView } from '@redsift/sift-sdk-web';\nimport * as VueGoogleMaps from 'vue2-google-maps';\n\nimport Vue from 'vue';\n\n\n\n\nlet app;\n\nconst Foo = { template: '<div>foo</div>' }\nconst Bar = { template: '<div>bar</div>' }\n\nconst routes = [\n  { path: '/foo', component: Foo },\n  { path: '/bar', component: Bar }\n]\n\nconst router = new VueRouter({\n  routes // short for routes: routes\n})\n\nexport default class MyView extends SiftView {\n  constructor() {\n    // You have to call the super() method to initialize the base class.\n    super();\n\tthis.controller.subscribe('name', this.onHello.bind(this));\n\tVue.use(VueRouter);\n\t// Vue.use(VueGoogleMaps, {\n\t//     load: {\n\t//       key: 'YOUR_API_TOKEN',\n\t//       v: 'OPTIONAL VERSION NUMBER',\n\t//       // libraries: 'places', //// If you need to use place input\n\t//     }\n\t//   });\n\tapp = new Vue({\n\t  router,\n\t  el: '#app',\n\t    data: {\n\t      message: 'Hello Mike Vue!',\n\t\t\thook_uri: 'adsadf'\n\t    }\n\t}).$mount('#app')\n  }\n\n  // for more info: http://docs.redsift.com/docs/client-code-siftview\n  presentView(value) {\n    console.log('hello-sift: presentView: ', value);\n\tapp.message = value.data.name;\n\tapp.hook_uri = value.data.hook_uri;\n\t// document.getElementById(\"name\").textContent =  value.data.name;\n\t// document.getElementById(\"hook-uri\").textContent =  value.data.hook_uri;\n  };\n\n  willPresentView(value) {\n    console.log('hello-sift: willPresentView: ', value);\n  };\n  \n  onHello(data) {\n    console.log('tutorial-sift: onHello: ', data);\n    // Object.keys(data).forEach((k) => {\n    //   document.getElementById(k).textContent = data[k];\n    // });\n\tapp.message = data['name']\n  }\n\n}\n\nregisterSiftView(new MyView(window));\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy92aWV3LmpzPzIxZTMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2QkFBNkI7QUFDckM7O0FBRUE7Ozs7O0FBS0E7O0FBRUEsYUFBYTtBQUNiLGFBQWE7O0FBRWI7QUFDQSxHQUFHLCtCQUErQjtBQUNsQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7O0FBRUEiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSGVsbG8gU2lmdCBTaWZ0LiBGcm9udGVuZCB2aWV3IGVudHJ5IHBvaW50LlxuICovXG5pbXBvcnQgeyBTaWZ0VmlldywgcmVnaXN0ZXJTaWZ0VmlldyB9IGZyb20gJ0ByZWRzaWZ0L3NpZnQtc2RrLXdlYic7XG5pbXBvcnQgKiBhcyBWdWVHb29nbGVNYXBzIGZyb20gJ3Z1ZTItZ29vZ2xlLW1hcHMnO1xuXG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cblxuXG5cbmxldCBhcHA7XG5cbmNvbnN0IEZvbyA9IHsgdGVtcGxhdGU6ICc8ZGl2PmZvbzwvZGl2PicgfVxuY29uc3QgQmFyID0geyB0ZW1wbGF0ZTogJzxkaXY+YmFyPC9kaXY+JyB9XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgeyBwYXRoOiAnL2ZvbycsIGNvbXBvbmVudDogRm9vIH0sXG4gIHsgcGF0aDogJy9iYXInLCBjb21wb25lbnQ6IEJhciB9XG5dXG5cbmNvbnN0IHJvdXRlciA9IG5ldyBWdWVSb3V0ZXIoe1xuICByb3V0ZXMgLy8gc2hvcnQgZm9yIHJvdXRlczogcm91dGVzXG59KVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVZpZXcgZXh0ZW5kcyBTaWZ0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIFlvdSBoYXZlIHRvIGNhbGwgdGhlIHN1cGVyKCkgbWV0aG9kIHRvIGluaXRpYWxpemUgdGhlIGJhc2UgY2xhc3MuXG4gICAgc3VwZXIoKTtcblx0dGhpcy5jb250cm9sbGVyLnN1YnNjcmliZSgnbmFtZScsIHRoaXMub25IZWxsby5iaW5kKHRoaXMpKTtcblx0VnVlLnVzZShWdWVSb3V0ZXIpO1xuXHQvLyBWdWUudXNlKFZ1ZUdvb2dsZU1hcHMsIHtcblx0Ly8gICAgIGxvYWQ6IHtcblx0Ly8gICAgICAga2V5OiAnWU9VUl9BUElfVE9LRU4nLFxuXHQvLyAgICAgICB2OiAnT1BUSU9OQUwgVkVSU0lPTiBOVU1CRVInLFxuXHQvLyAgICAgICAvLyBsaWJyYXJpZXM6ICdwbGFjZXMnLCAvLy8vIElmIHlvdSBuZWVkIHRvIHVzZSBwbGFjZSBpbnB1dFxuXHQvLyAgICAgfVxuXHQvLyAgIH0pO1xuXHRhcHAgPSBuZXcgVnVlKHtcblx0ICByb3V0ZXIsXG5cdCAgZWw6ICcjYXBwJyxcblx0ICAgIGRhdGE6IHtcblx0ICAgICAgbWVzc2FnZTogJ0hlbGxvIE1pa2UgVnVlIScsXG5cdFx0XHRob29rX3VyaTogJ2Fkc2FkZidcblx0ICAgIH1cblx0fSkuJG1vdW50KCcjYXBwJylcbiAgfVxuXG4gIC8vIGZvciBtb3JlIGluZm86IGh0dHA6Ly9kb2NzLnJlZHNpZnQuY29tL2RvY3MvY2xpZW50LWNvZGUtc2lmdHZpZXdcbiAgcHJlc2VudFZpZXcodmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8tc2lmdDogcHJlc2VudFZpZXc6ICcsIHZhbHVlKTtcblx0YXBwLm1lc3NhZ2UgPSB2YWx1ZS5kYXRhLm5hbWU7XG5cdGFwcC5ob29rX3VyaSA9IHZhbHVlLmRhdGEuaG9va191cmk7XG5cdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZVwiKS50ZXh0Q29udGVudCA9ICB2YWx1ZS5kYXRhLm5hbWU7XG5cdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9vay11cmlcIikudGV4dENvbnRlbnQgPSAgdmFsdWUuZGF0YS5ob29rX3VyaTtcbiAgfTtcblxuICB3aWxsUHJlc2VudFZpZXcodmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8tc2lmdDogd2lsbFByZXNlbnRWaWV3OiAnLCB2YWx1ZSk7XG4gIH07XG4gIFxuICBvbkhlbGxvKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZygndHV0b3JpYWwtc2lmdDogb25IZWxsbzogJywgZGF0YSk7XG4gICAgLy8gT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoaykgPT4ge1xuICAgIC8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaykudGV4dENvbnRlbnQgPSBkYXRhW2tdO1xuICAgIC8vIH0pO1xuXHRhcHAubWVzc2FnZSA9IGRhdGFbJ25hbWUnXVxuICB9XG5cbn1cblxucmVnaXN0ZXJTaWZ0VmlldyhuZXcgTXlWaWV3KHdpbmRvdykpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2NyaXB0cy92aWV3LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);