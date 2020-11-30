<template>
  <div class="tabsview-wrapper">
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <tabs-switch class="tabs-switch">
    </tabs-switch>
  </div>
</template>

<script>
  import TabsSwitch from './components/TabsSwitch'
  export default {
    components: {
      TabsSwitch
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
  .tabs-switch
    flex: 0 0 49px
</style>
