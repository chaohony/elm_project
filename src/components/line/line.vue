<template>
    <div class="line">
      <div class="l left"></div>
      <div class="middle">{{ info }}</div>
      <div class="l right"></div>
    </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: '优惠信息'
    }
  },
  methods: {},
  computed: {},
  components: {},
  data () {
    return {}
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.line
  width 100%
  display flex
  position relative
  .middle
    width 80px
    box-sizing border-box
    font-size 14px
    line-height 14px
    padding 0 12px
    font-size 14px
    font-weight 700
    color #ffffff
  .l
    flex 1
    position relative
    &:after
      display block
      content ''
      height 0
      width 100%
      line-height 0
      border-top 1px solid rgba(255,255,255,.2)
      position absolute
      top 7px
      &.left
        left 0
      &.right
        right 0
</style>
