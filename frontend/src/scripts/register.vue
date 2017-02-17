



<template>
  <div>
    <h1>Registering your device</h1>
    <div>Register your device by scanning the following code into the Owntracks app</div>
    <div>{{owntracksUri}}</div>
    <div id="placeHolder" v-html="qrcode"></div>

    <div>PassiveEye devices should send data to this uri</div>
    <div v-html="passiveeyeUri"></div>
  </div>
</template>

<script>
import qrcode from 'qrcode-generator'
//import app from './view.js'
// console.log("VIEW: ", this.$app)
export default {
  props: {
  },
  data() {
    var typeNumber = 4;
  var errorCorrectionLevel = 'L';
  //var qr = qrcode(typeNumber, errorCorrectionLevel);
  console.log("REGISTER: ", this.$store.state.owntracksUri)
  //qr.addData(this.$store.state.owntracksUri);
  //qr.make();
    return {
        //qrcode: qr.createImgTag(),
        qrcode: "adfafds",
        passiveeyeUri: this.$store.state.passiveeyeUri,
        owntracksUri: this.$store.state.owntracksUri
    }
  }
}
</script>

<style>


</style>
