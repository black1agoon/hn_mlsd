<template>
  <div class="order-wrapper">
    <ul class="tabs border-1px">
      <li v-for="(tab, index) in TABS"
          :class="{active: index === currentIndex}"
          @click="tabClick(tab.value)"
          :key="index">{{tab.name}}</li>
    </ul>
    <div class="order-list">
      <cube-scroll ref="scroll"
                   :options="options"
                   @pulling-up="onPullingUp">
        <div class="order" v-for="(order, index) in orderList" :key="index">
          <div class="header">
            <div class="orderNo">
              订单编号: {{order.tradeIdNo}}
            </div>
            <div class="status">{{order.statusName}}</div>
          </div>
          <div class="info">
            <img v-if="order.picUrl" class="image" :src="getImageUrl(order.picUrl)">
            <img v-else class="image" src="../assets/img/orderdefault.png">
            <div class="detail">
              <div class="name">{{order.productTitle}}</div>
              <div class="text">尺寸: {{order.productSpec}}</div>
              <div class="text">批号: {{order.batchNo}}</div>
              <div class="text">交期: {{order.deliveryData}}</div>
              <div class="text">数量: {{order.quantity}}</div>
            </div>
          </div>
          <div class="footer">
            <div class="button" @click="go2Detail(order.id)">查看详情</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import { getImageUrl } from '../assets/js/utils'
  const TABS = [
    {
      name: '全部',
      value: null
    }, {
      name: '待生产',
      value: 0
    }, {
      name: '生产中',
      value: 1
    }, {
      name: '已完成',
      value: 8
    }
  ]
  export default {
    computed: {
      currentIndex() {
        return this.TABS.findIndex(tab => tab.value === this.query.status)
      }
    },
    data() {
      return {
        TABS,
        query: {
          status: null,
          page: 1,
          rows: 10
        },
        orderList: [],
        orderTotal: 0,
        getImageUrl,
        options: {
          pullUpLoad: {
            threshold: 30,
            txt: {
              more: '上拉加载更多',
              noMore: '没有更多数据'
            }
          }                                 // 配置上拉加载，若要关闭可直接 pullUpLoad：false
        }
      }
    },
    methods: {
      tabClick(status) {
        if (status === this.query.status) {
          return
        }
        this.orderList = []
        this.query.status = status
        this.query.page = 1
        this.AndroidTUGetTradeSummary()
      },
      go2Detail(id) {
        this.$router.push({
          path: '/orderdetail/' + id
        })
      },
      AndroidTUGetTradeSummary() {
        api.AndroidTUGetTradeSummary(this.query).then(res => {
          this.orderList = this.orderList.concat(res.data.data.rows)
          this.orderTotal = res.data.data.total
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
            this.$refs.scroll.forceUpdate()
          })
        })
      },
      onPullingUp() {
        console.log('上拉加载')
        if (this.query.page * this.query.rows > this.orderTotal) {
          this.$refs.scroll.forceUpdate()
          return
        }
        this.query.page++
        this.AndroidTUGetTradeSummary()
      }
    },
    mounted() {
      this.AndroidTUGetTradeSummary()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/base.styl'
.order-wrapper
  position: absolute
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  .tabs
    display: flex
    border-1px(#f6f6f6)
    li
      flex: 1
      height: 45px
      line-height: 45px
      text-align: center
      color: #333333
      font-size: 15px
      transition: all .3s
      &::after
        content: ''
        width: 16px
        height: 2px
        background: #ffffff
        display: block
        margin: -3px 0 0 39px
        transition: all .3s
      &.active
        color: #34A814
        &::after
          background: #34A814
  .order-list
    flex: 1
    background: #F2F2F2
    overflow: hidden
    .order
      background: #ffffff
      margin-bottom: 15px
      .header
        display: flex
        justify-content: space-between
        align-items: center
        height: 35px
        margin: 0 15px
        .orderNo
          font-size: 12px
          color: #666666
        .status
          font-size: 12px
          color: #EF653A
      .info
        display: flex
        background: #F6F6F6
        padding: 12px 15px
        .image
          flex: 0 0 80px
          height: 80px
          margin-right: 16px
          overflow: hidden
        .detail
          flex: 1
          display: flex
          flex-wrap: wrap
          .name
            width: 100%
            font-size: 15px
            color: #666666
            margin-top: 10px
          .text
            margin-top: 5px
            width: 50%
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size: 12px
            color: #999999
      .footer
        display: flex
        justify-content: flex-end
        background: #ffffff
        padding: 10px 0 14px
        .button
          margin-right: 15px
          width: 72px
          height: 28px
          line-height: 30px
          text-align: center
          border-radius: 14px
          color: #34A814
          font-size: 12px
          border: 1px solid #34A814
          transition: all .3s
          background: #ffffff
          &:active
            color: #ffffff
            background: #34A814
  /deep/ .before-trigger
    font-size: 12px
</style>
