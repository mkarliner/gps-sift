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
    this.storage.subscribe(['devices', 'marked_positions', 'geofence'], this._suHandler);
    let wh = this.getWebhooks();
    let devs = this.getDevices();
    let pos = this.getPositions();
    let geofence = this.getGeofence();


	return {
		html: 'summary.html',
		data:  Promise.all([wh, devs, pos, geofence]).then(values => {
      return {
                passiveeyeUri: values[0][0].value,
                owntracksUri: values[0][1].value,
                things_connectedUri: values[0][2].value,
                devices: values[1].devices,
                positions: values[2].positions,
                geofence: values[3].geofence}
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
    let devs = this.getDevices();
    let pos = this.getPositions();
    let geofence = this.getGeofence();

    Promise.all([devs, pos, geofence]).then(values => {
                this.publish('devices', values[0].devices);
                this.publish('positions',values[1].positions);
                this.publish('geofence', values[2].geofence)
    })}

  getWebhooks() {
     return this.storage.get({
       bucket: '_redsift',
       keys: [ 'webhooks/passiveeye', 'webhooks/owntracks', 'webhooks/things_connected' ]
     });
   }

   getDevices() {
    return this.storage.getAll({
      bucket: 'devices'
    }).then((values) => {
      return {
		      devices: values
      };
    });
  }

  getPositions() {
   return this.storage.getAll({
     bucket: 'marked_positions'
   }).then((values) => {
     return {
         positions: values
     };
   });
 }

 getGeofence() {
  return this.storage.getAll({
    bucket: 'geofence'
  }).then((values) => {
    console.log("GETGEO ", values)
    return {
        geofence: values
    };
  });
}

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
