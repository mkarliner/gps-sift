



<template>
  <div>
    <h1>Registering your device</h1>
    <div>Register your device by scanning the following code into the Owntracks app</div>
    <div id="placeHolder" v-html="qrcode"></div>
  </div>
</template>

<script>
import qrcode from 'qrcode-generator'
//import app from './view.js'
// console.log("VIEW: ", this.$app)
export default {
  props: {
    // owntracksUri: {
    //   type: String, default: "notyet"
    // },
    message: {
      type: String,
      default: "nomessage"
    }
  },
  data() {
    var typeNumber = 4;
  var errorCorrectionLevel = 'L';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  //qr.addData(app.owntracksUri);
  console.log("REGISTER: ", this.$store.state.owntracksUri)
  qr.addData(this.$store.state.owntracksUri);
  qr.make();
  // document.getElementById('placeHolder').innerHTML = qr.createImgTag();
    return {
        foo: "asdfa",
        qrcode: qr.createImgTag()
    }
  }
}
</script>

<style>


</style>
