/**
 * Hello Sift Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('hello-sift: loadView', state);
    // Register for storage update events on the "x" bucket so we can update the UI
    this.storage.subscribe(['devices'], this._suHandler);



	return {
		html: 'summary.html',
		data: this.getWebhooks().then(x => ( this.getDevices().then(d=>(


    {passiveeyeUri: x[0].value, owntracksUri: x[1].value, devices: d.devices}))))
	}
    // switch (state.type) {
//       case 'email-thread':
//         return {
//           html: 'email-thread.html',
//           data: {}
//         };
//       case 'summary':
// 			return {
// 				html: 'summary.html',
// 				data: this.getWebhook().then(x => ({ name: 'no-one', hook_uri: x}))};
//       default:
//         console.error('hello-sift: unknown Sift type: ', state.type);
//     }

  }

  // Event: storage update
  onStorageUpdate(value) {
    console.log('hello-sift: onStorageUpdate: ', value);
    return this.getDevices().then(xe => {
      // Publish events from 'who' to view
	  console.log("OSU: ", xe)
      this.publish('devices', xe);
    });
  }

  getWebhooks() {
     return this.storage.get({
       bucket: '_redsift',
       keys: [ 'webhooks/passiveeye', 'webhooks/owntracks' ]
     });
   }

   getDevices() {
    return this.storage.getAll({
      bucket: 'devices'
    }).then((values) => {
      console.log('hello-sift: GETALLDEVICES returned:', values);
      return {
		      devices: values
      };
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
