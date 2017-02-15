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


  console.log("PERX: ", inData.data[0].key, inData.data[0].value.toString())

  const hookData = inData.data.map(d => JSON.parse(d.value));

 //Normalize the data from Owntracks to the internal device format
  let devData = hookData.map((d)=>{
    console.log("DMAP: ", d);
    let lat_ns = d.data.substr(11,1);
    let lng_ew = d.data.substr(19,1);
    let lat_deg = d.data.substr(4,2);
    let lat_mins = d.data.substr(6,5);
    let lng_deg = d.data.substr(12,2);
    let lng_mins = d.data.substr(14,5);
    console.log("EXLL ", lat_ns, lat_deg, parseFloat(lat_mins)/60000, lng_ew, lng_deg, parseFloat(lng_mins)/60000);
    return {
      name: "devices",
      key: d.device,
      value: {
        lat: `${d.data.substr(4,2)}.${d.data.substr(6,6)}`,
        lng: `-${d.data.substr(12,2)}.${d.data.substr(14,6)}`,
        time: d.time,
        rssi: d.rssi
      }
    }
  })

  console.log("DDD ", devData )

  return  devData;
};
