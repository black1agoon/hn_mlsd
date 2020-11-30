<template>
  <div class="login-wrapper">
    <div class="title">登录</div>
    <div class="input-wrap">
      <i class="username"></i>
      <input class="input" type="text" v-model="loginData.credential" placeholder="手机号码" />
    </div>
    <div class="input-wrap">
      <i class="password"></i>
      <input class="input" type="password" v-model="loginData.password" placeholder="密码" />
    </div>
    <div class="button" @click="login">登录</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginData: {
          credential: null,
          password: null
        }
      }
    },
    methods: {
      login() {
        if (!this.loginData.credential || !this.loginData.password) {
          this.$createToast({
            txt: '请输入账号和密码',
            type: 'txt'
          }).show()
          return
        }
        const toast = this.$createToast({
          txt: '登录中...',
          mask: true
        })
        toast.show()
        this.$store.dispatch('login', this.loginData).then(() => {
          toast.hide()
          this.$router.push('/home/orderview')
        }).catch(() => {
          toast.hide()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-wrapper
  position: absolute
  width: 100%
  height: 100%
  background-image: url("../assets/img/loginbg.png")
  background-size: 250px 200px
  background-repeat: no-repeat
  background-position: right bottom
  .title
    font-weight: bold
    width: 130px
    border-bottom: 5px solid #34A814
    text-align: right
    font-size: 35px
    margin-top: 90px
    margin-bottom: 85px
  .input-wrap
    position: relative
    margin: 0 39px 20px 39px
    i
      position: absolute
      top: 16px
      width: 15px
      height: 15px
      background-size: 15px 15px
      background-repeat: no-repeat
      &.username
        background-image: url("../assets/img/username.png")
      &.password
        background-image: url("../assets/img/password.png")
    .input
      padding-left: 30px
      height: 42px
      font-size: 20px
      line-height: 42px
      border-bottom: 1px solid #D4D4D4
      text-decoration: none
      outline: none
      color: #000000
    ::-webkit-input-placeholder  /* WebKit, Blink, Edge */
      color: #C2BEBE
      font-size: 13px

    :-moz-placeholder  /* Mozilla Firefox 4 to 18 */
      color: #C2BEBE
      font-size: 13px

    ::-moz-placeholder  /* Mozilla Firefox 19+ */
      color: #C2BEBE
      font-size: 13px

    :-ms-input-placeholder /* Internet Explorer 10-11 */
      color: #C2BEBE
      font-size: 13px
  .button
    background: #34A814
    border-radius: 50px
    width: 300px
    height: 50px
    line-height: 50px
    text-align: center
    color: #ffffff
    font-size: 16px
    margin: 30px auto
    border: none
    outline: none
    transition: all .2s
    &:active
      background: #174909
</style>
