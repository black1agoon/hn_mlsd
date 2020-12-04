<template>
  <div class="tabsview-wrapper">
    <div class="content">
      <cube-slide
          :loop=false
          :auto-play=false
          :show-dots=false
          :initial-index="index"
          ref="slide"
          :options="slideOptions"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
    <cube-tab-bar
        :useTransition=true
        v-model="selectedLabel"
        :data="tabs"
        ref="tabBar"
    >
      <cube-tab v-for="(item, idx) in tabs"
                :class="{active: index === idx}"
                :label="item.label"
                :key="idx">
        <i slot="icon" :class="item.icon"></i>
        <p class="name">{{item.label}}</p>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
  import OrderView from './OrderView'
  import OnlineView from './OnlineView'
  import ContactView from './ContactView'

  export default {
    computed: {
      tabs() {
        return [
          {
            label: '订单管理',
            component: OrderView,
            icon: 'icon-order'
          },
          {
            label: '在线验厂',
            component: OnlineView,
            icon: 'icon-online'
          },
          {
            label: '联系我们',
            component: ContactView,
            icon: 'icon-contact'
          }
        ]
      },
      selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    data() {
      return {
        index: 0,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tabsview-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  overflow: hidden
  .content
    flex: 1
    overflow: hidden
    position: relative
    .cube-slide-item
      position: relative
  .tabs-switch
    flex: 0 0 49px
  .cube-tab
    padding: 0
    .name
      font-size: 12px
      padding-bottom: 5px
    &.active
      .icon-order
        background-image: url("../assets/img/order1.png")
      .icon-online
        background-image: url("../assets/img/online1.png")
      .icon-contact
        background-image: url("../assets/img/contact1.png")
    i
      display: block
      background-repeat: no-repeat
      margin: 5px auto
      transition: all .3s
      &.icon-order
        width: 17px
        height: 19px
        background-image: url("../assets/img/order.png")
        background-size: 17px 19px
      &.icon-online
        width: 20px
        height: 19px
        background-image: url("../assets/img/online.png")
        background-size: 20px 19px
      &.icon-contact
        width: 21px
        height: 18px
        background-image: url("../assets/img/contact.png")
        background-size: 21px 18px
</style>
