<template>
  <div class="contact-wrapper">
    <div class="container">
      <div class="qrcode">
        <img src="../assets/img/qrcode.png" />
      </div>
      <p class="text">电话: 0571-62119388</p>
      <p class="text">网址: http://www.hzhnao.cn</p>
      <p class="text">地址: 杭州市滨江区滨康路352号中控信息大厦B座1502</p>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.contact-wrapper
  position: absolute
  width: 100%
  height: 100%
  display: flex
  align-items: center
  .container
    width: 100%
    text-align: center
    .qrcode
      margin: 0 auto 40px
      width: 100px
      height: 100px
      img
        width: 100%
    .text
      margin: 10px 0
      font-size: 12px
</style>
