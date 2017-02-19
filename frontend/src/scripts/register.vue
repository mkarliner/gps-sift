



<template>
  <div class="page">
    <h1>Registering your device</h1>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">PassiveEye</h3>
      </div>
      <div class="panel-body">
        <h5>PassiveEye devices should send data to this uri:</h5>
        <br/>
        <div v-html="passiveeyeUri" class="copy-uri"></div>
        <br/>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Owntracks</h3>
      </div>
      <div class="panel-body">
        <h5>Register your device by scanning the QR code into the Owntracks app or use the uri below:</h5>
        <br/>
        <div id="placeHolder" v-html="qrcode"></div>
        <br/>
        <div class="copy-uri">{{owntracksUri}}</div>
        <br/>
      </div>
    </div>

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
