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
module.exports = function (got) {
  const inData = got.in;

  //console.log('TCONN: data received:', inData);
  //
  // console.log("OTRX: ", inData.data[0].key, inData.data[0].value.toString())

  const hookData = inData.data.map(d => JSON.parse(d.value));
 //Normalize the data from Owntracks to the internal device format
 let ts = Math.floor(Date.now() / 1000);

  let devData = hookData.reduce((na, d)=>{

    let latlng = d.position.split(',');
    let lat = parseFloat(latlng[0]);
    let lng = parseFloat(latlng[1]);
    console.log("TCONJ ", latlng)
    na.push( {
      name: "devices",
      key: d.deviceId,
      value: {
        type: "ThingsConnected",
        lat: lat,
        lng: lng,
        time: ts
      }
    }),
    na.push( {
      name: "device_events",
      key: d.deviceId,
      value: {
        type: "ThingsConnected",
        lat: lat,
        lng: lng,
        time: ts
      }
    })
    na.push({
      name: "positions",
      key: d.deviceId + "/" + ts,
      value: {
        lat: lat,
        lng: lng,
        time: ts
      }
    })
    return na;
  }, []);


  console.log("TCONN ", devData )

  return  devData;
};
