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
    const inData = got.in.data;
    console.log("CHID: ", inData);

    let convexHull = new ConvexHullGrahamScan();
    //Generate Convex Hull.
    for(let loc of inData) {
      let val = JSON.parse(loc.value);
      console.log("CHHD: ", val);
      convexHull.addPoint(val.lat, val.lng)
    }
    const xyhull = convexHull.getHull();
    const hull = xyhull.map(p => {
      return {
        lat: p.x,
        lng: p.y
      }
    })

    console.log("GS: ", hull )
    //const hull = ch(points)
    //console.log("CHMAP: ", hull);

    return {
      name: 'geofence',
      key: 'mk',
      value: hull
    }
};
