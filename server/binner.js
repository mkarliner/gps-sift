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
    console.log("BINNER: ", got);
    const inData = got.in.data;
    const deviceId = got.query[0];
    let withData = got.with.data;
    console.log("WITHDATA ", withData)
    //console.log("IW: ",  inData, deviceId, withData)
    let val = JSON.parse(inData[0].value);
    let wd = withData.length > 0 ? JSON.parse(withData[0].value) : {};

    console.log("VAL: ", val);
    console.log("WD: ", wd);
    let shortLat = val.lat.toFixed(3);
    let shortLng = val.lng.toFixed(3)
    let latlng = `${shortLat}${shortLng}`
    console.log("LL ", latlng)
    if (wd[latlng]) {
        console.log("OLDDATA ", wd)
        wd[latlng].visits += 1;
    } else {
        wd[latlng] = val;
        wd[latlng].visits = 1;
        console.log("NEWDATA ", wd)
    }
    wd[latlng].lat = shortLat;
    wd[latlng].lng = shortLng;
    return {
        name: "binned_positions",
        key: deviceId,
        value: wd
    }
};
