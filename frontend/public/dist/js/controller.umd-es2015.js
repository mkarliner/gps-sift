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

	eval("/**\n * Hello Sift Sift. Frontend controller entry point.\n */\nimport { SiftController, registerSiftController } from '@redsift/sift-sdk-web';\n\nexport default class MyController extends SiftController {\n  constructor() {\n    // You have to call the super() method to initialize the base class.\n    super();\n    this._suHandler = this.onStorageUpdate.bind(this);\n  }\n\n  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller\n  loadView(state) {\n    console.log('hello-sift: loadView', state);\n    // Register for storage update events on the \"x\" bucket so we can update the UI\n    this.storage.subscribe(['who'], this._suHandler);\n\t\n\treturn {\n\t\thtml: 'summary.html',\n\t\tdata: this.getWebhook().then(x => ({ name: 'no-one', hook_uri: x}))\n\t}\n    // switch (state.type) {\n//       case 'email-thread':\n//         return {\n//           html: 'email-thread.html',\n//           data: {}\n//         };\n//       case 'summary':\n// \t\t\treturn {\n// \t\t\t\thtml: 'summary.html',\n// \t\t\t\tdata: this.getWebhook().then(x => ({ name: 'no-one', hook_uri: x}))};\n//       default:\n//         console.error('hello-sift: unknown Sift type: ', state.type);\n//     }\n\t\n  }\n\n  // Event: storage update\n  onStorageUpdate(value) {\n    console.log('hello-sift: onStorageUpdate: ', value);\n    return this.getName().then(xe => {\n      // Publish events from 'who' to view\n\t  console.log(\"OSU: \", xe)\n      this.publish('name', xe);\n    });\n  }\n  \n  getWebhook() {\n     return this.storage.get({\n       bucket: '_redsift',\n       keys: [ 'webhooks/curl_input' ]\n     }).then(d => d[0].value);    \n   }\n\n   getName() {\n    return this.storage.getAll({\n      bucket: 'who',\n\t\tkeys: ['whoname']\n    }).then((values) => {\n      console.log('hello-sift: getName returned:', values);\n      return {\n\t\t  name: values[0].value\n      };\n    });\n  }\n\n}\n\n// Do not remove. The Sift is responsible for registering its views and controllers\nregisterSiftController(new MyController());\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzP2M1NTAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5Q0FBeUM7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsNkJBQTZCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDZCQUE2QjtBQUN4RTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHdCO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxsbyBTaWZ0IFNpZnQuIEZyb250ZW5kIGNvbnRyb2xsZXIgZW50cnkgcG9pbnQuXG4gKi9cbmltcG9ydCB7IFNpZnRDb250cm9sbGVyLCByZWdpc3RlclNpZnRDb250cm9sbGVyIH0gZnJvbSAnQHJlZHNpZnQvc2lmdC1zZGstd2ViJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlDb250cm9sbGVyIGV4dGVuZHMgU2lmdENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBZb3UgaGF2ZSB0byBjYWxsIHRoZSBzdXBlcigpIG1ldGhvZCB0byBpbml0aWFsaXplIHRoZSBiYXNlIGNsYXNzLlxuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc3VIYW5kbGVyID0gdGhpcy5vblN0b3JhZ2VVcGRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIGZvciBtb3JlIGluZm86IGh0dHA6Ly9kb2NzLnJlZHNpZnQuY29tL2RvY3MvY2xpZW50LWNvZGUtc2lmdGNvbnRyb2xsZXJcbiAgbG9hZFZpZXcoc3RhdGUpIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8tc2lmdDogbG9hZFZpZXcnLCBzdGF0ZSk7XG4gICAgLy8gUmVnaXN0ZXIgZm9yIHN0b3JhZ2UgdXBkYXRlIGV2ZW50cyBvbiB0aGUgXCJ4XCIgYnVja2V0IHNvIHdlIGNhbiB1cGRhdGUgdGhlIFVJXG4gICAgdGhpcy5zdG9yYWdlLnN1YnNjcmliZShbJ3dobyddLCB0aGlzLl9zdUhhbmRsZXIpO1xuXHRcblx0cmV0dXJuIHtcblx0XHRodG1sOiAnc3VtbWFyeS5odG1sJyxcblx0XHRkYXRhOiB0aGlzLmdldFdlYmhvb2soKS50aGVuKHggPT4gKHsgbmFtZTogJ25vLW9uZScsIGhvb2tfdXJpOiB4fSkpXG5cdH1cbiAgICAvLyBzd2l0Y2ggKHN0YXRlLnR5cGUpIHtcbi8vICAgICAgIGNhc2UgJ2VtYWlsLXRocmVhZCc6XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgaHRtbDogJ2VtYWlsLXRocmVhZC5odG1sJyxcbi8vICAgICAgICAgICBkYXRhOiB7fVxuLy8gICAgICAgICB9O1xuLy8gICAgICAgY2FzZSAnc3VtbWFyeSc6XG4vLyBcdFx0XHRyZXR1cm4ge1xuLy8gXHRcdFx0XHRodG1sOiAnc3VtbWFyeS5odG1sJyxcbi8vIFx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXZWJob29rKCkudGhlbih4ID0+ICh7IG5hbWU6ICduby1vbmUnLCBob29rX3VyaTogeH0pKX07XG4vLyAgICAgICBkZWZhdWx0OlxuLy8gICAgICAgICBjb25zb2xlLmVycm9yKCdoZWxsby1zaWZ0OiB1bmtub3duIFNpZnQgdHlwZTogJywgc3RhdGUudHlwZSk7XG4vLyAgICAgfVxuXHRcbiAgfVxuXG4gIC8vIEV2ZW50OiBzdG9yYWdlIHVwZGF0ZVxuICBvblN0b3JhZ2VVcGRhdGUodmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8tc2lmdDogb25TdG9yYWdlVXBkYXRlOiAnLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmFtZSgpLnRoZW4oeGUgPT4ge1xuICAgICAgLy8gUHVibGlzaCBldmVudHMgZnJvbSAnd2hvJyB0byB2aWV3XG5cdCAgY29uc29sZS5sb2coXCJPU1U6IFwiLCB4ZSlcbiAgICAgIHRoaXMucHVibGlzaCgnbmFtZScsIHhlKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgZ2V0V2ViaG9vaygpIHtcbiAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQoe1xuICAgICAgIGJ1Y2tldDogJ19yZWRzaWZ0JyxcbiAgICAgICBrZXlzOiBbICd3ZWJob29rcy9jdXJsX2lucHV0JyBdXG4gICAgIH0pLnRoZW4oZCA9PiBkWzBdLnZhbHVlKTsgICAgXG4gICB9XG5cbiAgIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRBbGwoe1xuICAgICAgYnVja2V0OiAnd2hvJyxcblx0XHRrZXlzOiBbJ3dob25hbWUnXVxuICAgIH0pLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2hlbGxvLXNpZnQ6IGdldE5hbWUgcmV0dXJuZWQ6JywgdmFsdWVzKTtcbiAgICAgIHJldHVybiB7XG5cdFx0ICBuYW1lOiB2YWx1ZXNbMF0udmFsdWVcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxufVxuXG4vLyBEbyBub3QgcmVtb3ZlLiBUaGUgU2lmdCBpcyByZXNwb25zaWJsZSBmb3IgcmVnaXN0ZXJpbmcgaXRzIHZpZXdzIGFuZCBjb250cm9sbGVyc1xucmVnaXN0ZXJTaWZ0Q29udHJvbGxlcihuZXcgTXlDb250cm9sbGVyKCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);