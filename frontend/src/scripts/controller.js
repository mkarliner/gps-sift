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
    this.storage.subscribe(['devices', 'positions'], this._suHandler);
    let wh = this.getWebhooks();
    let devs = this.getDevices();
    let pos = this.getPositions();


	return {
		html: 'summary.html',
		data:  Promise.all([wh, devs, pos]).then(values => {
      return {
                passiveeyeUri: values[0][0].value,
                owntracksUri: values[0][1].value,
                devices: values[1].devices,
                positions: values[2].positions}
    })
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
    }).then(this.getPositions().then(xp=> {
      console.log("OSUP", xp)
      this.publish('positions', xp)
    }));
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

  getPositions() {
   return this.storage.getAll({
     bucket: 'positions'
   }).then((values) => {
     console.log('hello-sift: GETALLPOS returned:', values);
     return {
         positions: values
     };
   });
 }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
