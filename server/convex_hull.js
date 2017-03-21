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
let ConvexHullGrahamScan = require('graham_scan');


module.exports = function(got) {
    const inData = got.in.data[0].value;
    //console.log("CHID: ", got);

    let convexHull = new ConvexHullGrahamScan();
    let bd = JSON.parse(inData);
    console.log("BININ ", bd);
    //Filter out binned positions visited less than twice
    let filtered_positions = {};
    for(let p in bd) {
      if(bd[p].visits > 1) {
        filtered_positions[p] = bd[p]
      }
    }
    console.log("AFT FIL: ", filtered_positions)
    let key = got.query[0];
    for(let p in filtered_positions) {
      convexHull.addPoint(filtered_positions[p].lat, filtered_positions[p].lng)
    }
    let xyhull = convexHull.getHull();
    //Hull returns [undefined] on failure
    xyhull = xyhull.length >3 ? xyhull : [];
    const hull = xyhull.map(p => {
      return { 
        lat: p.x,
        lng: p.y
      }
    })
    console.log("HULL: ", hull);
    if(hull.length > 2){
      return [
        {
        name: 'geofence',
        key: key,
        value: hull
      },
      {
      name: 'geofence_s',
      key: key,
      value: hull
    }
    ]
    } else {
      return [
        {
        name: 'geofence',
        key: key,
        value: []
      },
      {
      name: 'geofence_s',
      key: key,
      value: []
    }
    ]
    }

};
