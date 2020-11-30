<template>
  <ul class="tabs-wrapper">
    <li v-for="(tab, index) in TABS"
        :key="index"
        :class="{active: currentIndex === index}">
      <router-link :to="tab.path">
        <i :class="tab.klass"></i>
        <p class="name">{{tab.name}}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
  const TABS = [
    {
      name: '订单管理',
      klass: 'order',
      path: '/home/orderview'
    }, {
      name: '在线验厂',
      klass: 'online',
      path: '/home/onlineview'
    }, {
      name: '联系我们',
      klass: 'contact',
      path: '/home/contactview'
    }
  ]

  export default {
    name: 'tabs-switch',
    computed: {
      currentIndex() {
        return this.TABS.findIndex(tab => tab.path === this.$route.path)
      }
    },
    data() {
      return {
        TABS
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

.tabs-wrapper
  width: 100%
  height: 49px
  display: flex
  font-size: 11px
  text-align: center
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.23)
  li
    flex: 1
    &.active
      .order
        background-image: url("../../assets/img/order1.png")
      .online
        background-image: url("../../assets/img/online1.png")
      .contact
        background-image: url("../../assets/img/contact1.png")
      .name
        color: #34A814
    i
      display: block
      background-repeat: no-repeat
      margin: 9px auto 5px
      transition: all .3s
      &.order
        width: 17px
        height: 19px
        background-image: url("../../assets/img/order.png")
        background-size: 17px 19px
      &.online
        width: 20px
        height: 19px
        background-image: url("../../assets/img/online.png")
        background-size: 20px 19px
      &.contact
        width: 21px
        height: 18px
        background-image: url("../../assets/img/contact.png")
        background-size: 21px 18px
    .name
      transition: all .3s
      color: #999999
      font-size: 11px
</style>
