



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

export default {
  props: {

  },
  destroyed(){
    console.log("DESTROYED: ", this)
  },
  data() {
    var typeNumber = 14;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    qr.addData(this.$store.state.owntracksUri);
    qr.make();

    return {
      qrcode: qr.createImgTag(),
      passiveeyeUri: this.$store.state.passiveeyeUri,
      owntracksUri: this.$store.state.owntracksUri
    }
  }
}
</script>

<style>


</style>
