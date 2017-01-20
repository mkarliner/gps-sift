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

	eval("/**\n * Hello Sift Sift. Email client controller entry point.\n */\nimport { EmailClientController, registerEmailClientController } from '@redsift/sift-sdk-web';\n\nexport default class MyEmailClientController extends EmailClientController {\n  constructor() {\n    super();\n  }\n\n  // for more info: http://docs.redsift.com/docs/client-code-redsiftclient\n  loadThreadListView (listInfo) {\n    console.log('hello-sift: loadThreadListView: ', listInfo);\n    // if (listInfo) {\n    //   return {\n    //     template: '001_list_common_txt',\n    //     value: {\n    //       color: '#ffffff',\n    //       backgroundColor: '#e11010',\n    //       subtitle: 'subtitle'\n    //     }\n    //   };\n    // }\n  };\n}\n\n// Do not remove. The Sift is responsible for registering its views and controllers\nregisterEmailClientController(new MyEmailClientController());\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9lbWFpbC1jbGllbnQtY29udHJvbGxlci5qcz81Y2JlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQXVEOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxsbyBTaWZ0IFNpZnQuIEVtYWlsIGNsaWVudCBjb250cm9sbGVyIGVudHJ5IHBvaW50LlxuICovXG5pbXBvcnQgeyBFbWFpbENsaWVudENvbnRyb2xsZXIsIHJlZ2lzdGVyRW1haWxDbGllbnRDb250cm9sbGVyIH0gZnJvbSAnQHJlZHNpZnQvc2lmdC1zZGstd2ViJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlFbWFpbENsaWVudENvbnRyb2xsZXIgZXh0ZW5kcyBFbWFpbENsaWVudENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLy8gZm9yIG1vcmUgaW5mbzogaHR0cDovL2RvY3MucmVkc2lmdC5jb20vZG9jcy9jbGllbnQtY29kZS1yZWRzaWZ0Y2xpZW50XG4gIGxvYWRUaHJlYWRMaXN0VmlldyAobGlzdEluZm8pIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8tc2lmdDogbG9hZFRocmVhZExpc3RWaWV3OiAnLCBsaXN0SW5mbyk7XG4gICAgLy8gaWYgKGxpc3RJbmZvKSB7XG4gICAgLy8gICByZXR1cm4ge1xuICAgIC8vICAgICB0ZW1wbGF0ZTogJzAwMV9saXN0X2NvbW1vbl90eHQnLFxuICAgIC8vICAgICB2YWx1ZToge1xuICAgIC8vICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgLy8gICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2UxMTAxMCcsXG4gICAgLy8gICAgICAgc3VidGl0bGU6ICdzdWJ0aXRsZSdcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfTtcbiAgICAvLyB9XG4gIH07XG59XG5cbi8vIERvIG5vdCByZW1vdmUuIFRoZSBTaWZ0IGlzIHJlc3BvbnNpYmxlIGZvciByZWdpc3RlcmluZyBpdHMgdmlld3MgYW5kIGNvbnRyb2xsZXJzXG5yZWdpc3RlckVtYWlsQ2xpZW50Q29udHJvbGxlcihuZXcgTXlFbWFpbENsaWVudENvbnRyb2xsZXIoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3JpcHRzL2VtYWlsLWNsaWVudC1jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);