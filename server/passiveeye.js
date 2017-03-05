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

 //Normalize the data from PassiveEye to the internal device format
  let devData = hookData.reduce((na, d)=>{
    console.log("DMAP: ", d);
    //Convert degress and decimal minutes (NEMA) to decimal degrees
    let lat_ns = d.data.substr(11,1) == 1 ? '-' : '';
    let lng_ew = d.data.substr(19,1) == 1 ? '-' : '';
    let lat_deg = parseFloat(d.data.substr(4,2));
    let lat_mins = d.data.substr(6,6);
    let lat_ddeg = parseFloat(lat_mins) / (60 * 10000);
    console.log("MINDEGS ", lat_mins, lat_ddeg);
    let lng_deg = parseFloat(d.data.substr(12,2));
    let lng_mins = d.data.substr(14,6);
    //Three digits of lng mins!
    let lng_ddeg = parseFloat(lng_mins) / (60 * 1000);
    let temp = parseInt(d.data.substr(2,2), 16);
    console.log("EXLL ", lat_ns, lat_deg, lat_ddeg, lng_ew, lng_deg, lng_ddeg, temp);
    na.push( {
      name: "devices",
      key: d.device,
      value: {
        type: "PassiveEye",
        lat: parseFloat(`${lat_ns}${lat_deg+lat_ddeg}`),
        lng: parseFloat(`${lng_ew}${lng_deg+lng_ddeg}`),
        time: d.time,
        rssi: d.rssi,
        duplicate: d.duplicate,
        snr: d.snr,
        station: d.station,
        avgSnr: d.avgSnr,
        temp: temp
      }
    }),
    na.push( {
      name: "device_events",
      key: d.device,
      value: {
        type: "PassiveEye",
        lat: parseFloat(`${lat_ns}${lat_deg+lat_ddeg}`),
        lng: parseFloat(`${lng_ew}${lng_deg+lng_ddeg}`),
        time: d.time,
        rssi: d.rssi,
        duplicate: d.duplicate,
        snr: d.snr,
        station: d.station,
        avgSnr: d.avgSnr,
        temp: temp
      }
    })
    na.push({
      name: "positions",
      key: d.device + "/" + d.time,
      value: {
        lat: parseFloat(`${lat_ns}${lat_deg+lat_ddeg}`),
        lng: parseFloat(`${lng_ew}${lng_deg+lng_ddeg}`),
        time: d.time,
        rssi: d.rssi,
        duplicate: d.duplicate,
        snr: d.snr,
        station: d.station,
        avgSnr: d.avgSnr,
        temp: temp
      }
    })
    return na;
  }, []);



  console.log("DDD ", devData )

  return  devData;
};
