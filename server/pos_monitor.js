/**
 * Hello Sift Sift. DAG's 'Node1' node implementation
 */
'use strict';

// Entry point for DAG node
// got ={
//   in: ... // contains the key/value pairs that match the given query
//   with: ... // key/value pairs selected based on the with selection
//   lookup: ... // an array with result of lookup for a specific key
//   query: ... // an array containing the key hierarchy
// }
// for more info have a look at:
// http://docs.redsift.com/docs/server-code-implementation

let inside = require('point-in-polygon');

module.exports = function(got) {
    console.log("POSMON: ", got);
    const inData = got.in.data;
    const deviceId = got.query[0];
    let withData = got.with.data;

    //console.log("IW: ",  inData, deviceId, withData)
    let val = JSON.parse(inData[0].value);
    let wd = withData.length > 0 ? JSON.parse(withData[0].value) : {};

    console.log("VAL: ", val);
    console.log("PMWD: ", wd);
    let point = [val.lat, val.lng];
    console.log("LL ", point)
    //If there is no geofence, stop here.
    if(!wd) {
      return {
        name: marked_positions,
        key: "foo",
        value: null
      }
    }
    // Convert arrary of lat lng objects to array of points
    let polygon = wd.map(p=>{
      return [parseFloat(p.lat), parseFloat(p.lng)]
    })

    if(inside(point, polygon)) {
      val.inside = true;
    } else {
      val.inside = false;
    }
    console.log("MARKED POS ", val)
    return {
        name: "marked_positions",
        key: `${deviceId}/${val.time}`,
        value: val
    }
};
