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
module.exports = function(got) {
    const inData = got.in;
    const lookupData = {key: got.lookup[0].data.key, value: JSON.parse(got.lookup[0].data.value)};
    console.log("BINNER: ", lookupData);

    const hookData = inData.data.map((d) => {
        let val = JSON.parse(d.value);
        console.log("BINMAP: ", lookupData);
        const count = lookupData.value ? parseInt(lookupData.value.count+1) : 1;
        // Bin the lat/lng
        return {
          count: count,
          deviceId: d.key,
          type: val.type,
          lat: val.lat.toFixed(3),
          lng: val.lng.toFixed(3)
        }
    });
    //console.log("BINMAP: ", hookData);

    return hookData.map(d=>{
      return {
          name: "binned_positions",
          key: `${d.deviceId}/${d.lat}/${d.lng}`,
          value: d
      };
    });
};
