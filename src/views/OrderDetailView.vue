<template>
  <div class="detail-wrapper">
<!--    <div class="back">-->
<!--      <i class="cubeic-back icon" @click="back"></i>-->
<!--    </div>-->
    <ul class="status-wrapper">
      <li :class="{active: detailData.status === status.status || detailData.isApplyOut}" v-for="(status, index) in STATUS" :key="index">
        <p class="name">{{status.name}}</p>
        <i :class="status.klass"></i>
      </li>
    </ul>
    <div class="orderNo">订单编号: {{detailData.tradeIdNo}}</div>
    <div class="detail">
      <p class="title">订单详情</p>
      <div class="info-box">
        <img v-if="detailData.picUrl" :src="detailData.picUrl">
        <img v-else src="../assets/img/orderdefault.png">
        <div class="info">
          <p class="name">{{detailData.productTitle}}</p>
          <p class="text">
            <span class="label">数量:</span>
            <span class="value">{{detailData.quantity}}</span>
          </p>
          <p class="text">
            <span class="label">交期:</span>
            <span class="value">{{detailData.deliveryDate}}</span>
          </p>
          <p class="text">
            <span class="label">生产设备:</span>
            <span class="value">{{detailData.deviceTitle}}</span>
          </p>
          <p class="text">
            <span class="label">已入库:</span>
            <span class="value">{{detailData.finishQuantity}}</span>
          </p>
          <p class="text">
            <span class="label">尺寸:</span>
            <span class="value">{{detailData.productSize}}</span>
          </p>
          <p class="text">
            <span class="label">批号:</span>
            <span class="value">{{detailData.batchNo}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="report-list">
      <div class="title">质检报告</div>

      <cube-scroll
          ref="scroll"
          :data="detailData.productFileList"
          class="scroll-wrapper"
          direction="horizontal">
        <div class="list-wrapper">
          <img class="image"
               v-for="(file, index) in detailData.productFileList"
               :src="getImageUrl(file.filePath)"
               @click="handleImgsClick(index)"
               :key="index">
        </div>
      </cube-scroll>

    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {getImageUrl} from '../assets/js/utils'

  const STATUS = [
    {
      name: '待生产',
      status: 0,
      klass: 'status0'
    }, {
      name: '生产中',
      status: 1,
      klass: 'status1'
    }, {
      name: '生产完成',
      status: 8,
      klass: 'status8'
    }, {
      name: '已出库',
      status: 9,
      klass: 'status9'
    }
  ]
  export default {
    data() {
      return {
        STATUS,
        detailData: {
          productFileList: []
        },
        getImageUrl
      }
    },
    methods: {
      handleImgsClick(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.detailData.productFileList.map(f => getImageUrl(f.filePath)),
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params }).show()
      },
      getOrderDetail(id) {
        const toast = this.$createToast({
          txt: '加载中...',
          mask: true
        })
        toast.show()
        api.AndroidTUGetTradeItem({
          id
        }).then(res => {
          this.detailData = res.data.data
          toast.hide()
        }).catch(() => {
          toast.hide()
        })
      },
      back() {
        // this.$router.back()
        this.$router.push('/home/orderview')
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (to.params.id) {
          vm.getOrderDetail(to.params.id)
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail-wrapper
  background: #EBEBEB
  .back
    height: 45px
    background: #ffffff
    line-height: 45px
    padding-left: 15px
    .icon
      color: #999999
      font-size: 25px
  .status-wrapper
    display: flex
    height: 120px
    background: #00BE47
    align-items: center
    justify-content: space-between
    padding: 0 25px
    li
      flex: 0 0 67px
      height: 120px
      text-align: center
      &.active
        flex: 0 0 92px
        background-image: url("../assets/img/choosebg.png")
        background-size: 92px 120px
        background-repeat: no-repeat
        .name
          color: #ffffff
        .status0
          background-image: url("../assets/img/status01.png")
        .status1
          background-image: url("../assets/img/status11.png")
        .status8
          background-image: url("../assets/img/status81.png")
        .status9
          background-image: url("../assets/img/status91.png")
      .name
        font-size: 14px
        color: #008030
        margin-top: 36px
        margin-left: -10px
      i
        display: block
        width: 28px
        height: 28px
        margin: 24px 25px
        background-size: 28px 28px
        background-repeat: no-repeat
        &.status0
          background-image: url("../assets/img/status0.png")
        &.status1
          background-image: url("../assets/img/status1.png")
        &.status8
          background-image: url("../assets/img/status8.png")
        &.status9
          background-image: url("../assets/img/status9.png")
  .orderNo
    position: relative
    font-size: 18px
    color: #5D5D5D
    background: #FFF846
    padding: 16px 0
    text-align: center
    box-shadow: 0 10px 10px rgba(4, 0, 0, 0.1)
    z-index: 10
  .title
    color: #00CD4D
    font-size: 16px
    margin: 19px 0 17px 0
  .detail
    background: #ffffff
    overflow: hidden
    padding: 5px 25px 0
    .info-box
      display: flex
      margin-bottom: 20px
      img
        overflow: hidden
        flex: 0 0 161px
        height: 180px
        margin-right: 15px
      .info
        flex: 1
        .name
          font-size: 16px
          color: #010101
        .text
          font-size: 13px
          white-space: nowrap
          margin: 14px 0
          .label
            display: inline-block
            color: #999999
            margin-right: 5px
          .value
            display: inline-block
            color: #010101
  .report-list
    width: 325px
    overflow: auto
    padding: 0 25px
    background: #ffffff
    margin-top: 5px
    .scroll-wrapper
      width: 100%
      overflow: hidden
      display: inline-block
      /deep/ .cube-scroll-content
        display: inline-block
      .list-wrapper
        display: inline-block
        line-height: 60px
        white-space: nowrap
        .image
          width: 95px
          height: 95px
          margin-right: 10px
          &:last-child
            margin-right: 0
</style>
