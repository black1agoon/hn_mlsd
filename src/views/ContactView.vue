<template>
  <div class="contact-wrapper">
    <div class="container">
      <div class="qrcode">
        <img src="../assets/img/qrcode.jpg" />
      </div>
      <p class="text">固定电话: +86 0573-87876969</p>
      <p class="text">手机号: +86 13736884578</p>
      <p class="text">地址: 浙江省海宁市丁桥镇联保路29号</p>
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
      margin: 15px 0
      font-size: 16px
</style>
