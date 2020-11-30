<template>

  <div class="online-wrapper">
    <div class="header">
      <div class="title">我的视频</div>
    </div>
    <div class="video-wrapper">
      <div class="video-num">
        <i class="video"></i>{{videoList.length}}个摄像机
      </div>
      <div class="video-container">
        <cube-scroll>
          <div class="video-box" v-for="(video, index) in videoList" :key="index">
            <div class="video" :id="'video' + index"></div>
            <div class="name">{{video.title}}</div>
          </div>
        </cube-scroll>
      </div>
    </div>
    <div class="key-wrapper" v-show="keyShow">
      <div class="mask"></div>
      <div class="wrap">
        <cube-input class="input" v-model="key" placeholder="请输入key"></cube-input>
        <div class="button" @click="submitKey">确定</div>
      </div>
    </div>
  </div>

</template>

<script>
  import api from '@/api'
  import '@/../public/static/js/ckplayer.js'
  export default {
    data() {
      return {
        key: null,
        keyShow: true,
        videoList: [],
        overMinutes: 0,
        validTime: 0
      }
    },
    methods: {
      submitKey() {
        if (this.key === '' || this.key === null) {
          this.$createToast({
            txt: '请输入秘钥',
            type: 'txt'
          }).show()
          return
        }
        const toast = this.$createToast({
          txt: '验证中...',
          mask: true
        })
        toast.show()
        api.ValidateKeyAllow({
          key: this.key
        }).then(res => {
          if (!res.data.success) {
            return
          }
          this.keyShow = false
          toast.hide()
          this.videoList = res.data.data.videoList
          this.validTime = res.data.data.validTime
          this.compareTime()
          this.$nextTick(() => {
            this.videoList.forEach((video, idx) => {
              new window.ckplayer({
                container: '#video' + idx,
                variable: 'player',
                flashplayer: false,
                html5m3u8: true,
                autoplay: false,
                loop: false,
                live: true,
                video: `http://lx.wazhiyuan.com:8001/hls/${video.ipCrm}.m3u8`
              })
            })
          })
        }).catch(() => {
          this.keyShow = true
          toast.hide()
        })
      },
      compareTime() {
        this.timer = setInterval(() => {
          this.overMinutes++
          if (this.overMinutes > this.validTime) {
            this.keyShow = true
            this.videoList = []
            clearInterval(this.timer)
            this.key = null
          }
        }, 1000 * 60)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/base.styl'
  .online-wrapper
    height: 100%
    display: flex
    flex-direction: column

    .header
      width: 100%
      flex: 0 0 95px
      background-image: url("../assets/img/onlinebg.png")
      background-size: cover
      background-repeat: no-repeat
      overflow: hidden

      .title
        color: #333333
        font-size: 18px
        margin: 45px 0 0 24px

    .video-wrapper
      background: #F8F8F8
      margin-top: -10px
      border-top-left-radius: 15px
      border-top-right-radius: 15px
      flex: 1
      display: flex
      flex-direction: column
      overflow: hidden

      .video-num
        width: 113px
        height: 30px
        border: 1px solid #999999
        border-radius: 14px
        font-size: 13px
        color: #999999
        text-align: center
        line-height: 30px
        margin: 15px 0 12px 230px

        .video
          display: inline-block
          vertical-align: top
          width: 17px
          height: 17px
          margin: 5px 4px 0 0
          background-image: url("../assets/img/video.png")
          background-size: 17px 17px
          background-repeat: no-repeat

      .video-container
        flex: 1
        overflow: hidden

        .video-box
          margin: 0 28px 16px
          height: 250px
          overflow: hidden
          background: #ffffff

          .video
            width: 100%
            height: 195px
            border-radius: 4px
            background: #7e8c8d

          .name
            font-size: 13px
            color: #666666
            padding: 20px 13px

    .key-wrapper
      position: absolute
      background: #ffffff
      z-index: 100
      width: 100%
      height: 100%

      .mask
        position: absolute
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, .4)
      .wrap
        position: absolute
        top: -20px
        left: 0
        right: 0
        bottom: 0
        margin: auto
        height: 120px
        .input
          margin: 0 20px
          &:after
            border: none !important
        .button
          background: #34A814
          border-radius: 50px
          height: 50px
          line-height: 50px
          text-align: center
          color: #ffffff
          font-size: 16px
          margin: 30px 20px
          border: none
          outline: none
          transition: all .2s
          &:active
            background: #174909
</style>
