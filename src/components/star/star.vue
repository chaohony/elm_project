<template>
    <div class="star">
      <span class="s" :key="index" v-for="(item,index) in starArr" :class="[item,'size-' + size]"></span>
    </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    count: {
      type: Number,
      default: 4.4
    }
  },
  methods: {},
  computed: {
    starArr () {
      let arr = []
      let computedNum = Math.floor(this.count * 2) / 2
      let hasX = computedNum % 1 !== 0
      let integer = Math.floor(computedNum)
      while (integer--) {
        arr.push('on')
      }
      if (hasX) {
        arr.push('half')
      }
      while (arr.length < 5) {
        arr.push('off')
      }
      return arr
    }
  },
  components: {},
  data () {
    return {}
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.star
 display inline-block
 .s
  display inline-block
  &.size-24
    width 24px
    height 24px
    background-size 24px 24px
    background-repeat no-repeat
    margin-right 24px
    &.on
      bg-img('./star48_on')
    &.half
      bg-img('./star48_half')
    &.off
      bg-img('./star48_off')
  &.size-18
    width 18px
    height 18px
    background-size 18px 18px
    background-repeat no-repeat
    margin-right 18px
    &.on
      bg-img('./star36_on')
    &.half
      bg-img('./star36_half')
    &.off
      bg-img('./star36_off')
  &.size-12
    width 12px
    height 12px
    background-size 12px 12px
    background-repeat no-repeat
    margin-right 12px
    &.on
      bg-img('./star24_on')
    &.half
      bg-img('./star24_half')
    &.off
      bg-img('./star24_off')
</style>
