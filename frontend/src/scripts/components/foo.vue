<template>
<div class="message">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from single file component!'
    }
  }
}
</script>

<style>
.message {
  color: blue;
  margin: 2em;
}
</style>
