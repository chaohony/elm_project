<template>
    <div class="ratingblock">
      <div class="top">
        <div class="wrapper">
          <span class="all block" @click="chooseType('all')" :class="{active: selectedType === 2}">{{ desc[0] }}
            <span class="num">{{ all_num }}</span>
          </span>
          <span class="pos block" @click="chooseType('pos')" :class="{active: selectedType === 0}">{{ desc[1] }}
            <span class="num">{{ pos_num }}</span>
          </span>
          <span class="neg block" @click="chooseType('neg')" :class="{active: selectedType === 1}">{{ desc[2] }}
            <span class="num">{{ neg_num }}</span>
          </span>
        </div>
      </div>
      <div class="bottom">
        <i class="icon-check_circle" @click.stop.prevent="toggle" :class="{active:seeOnly}"></i>
        只看有内容的评价
      </div>
    </div>
</template>

<script>
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  props: {
    desc: {
      type: Array,
      default () {
        return ['全部', '推荐', '吐槽']
      }
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectedType: {
      type: Number,
      default: 2
    },
    seeOnly: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    chooseType (type) {
      this.$emit('chooseType', type)
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  computed: {
    all_num () {
      return this.ratings.length
    },
    pos_num () {
      return this.ratings.filter((item, index) => {
        return item.rateType === 0
      }).length
    },
    neg_num () {
      return this.ratings.filter((item, index) => {
        return item.rateType === 1
      }).length
    }
  },
  components: {},
  data () {
    return {}
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.ratingblock
  width 100%
  .top
    padding 0 18px 18px 18px
    font-size 0
    .wrapper
      border-1px()
      &:after
        position absolute
        bottom -18px
      .block
        display inline-block
        margin-right 8px
        padding 8px 12px
        border-radius 2px
        font-size 12px
        line-height 16px
        .num
          font-size 8px
        &.all,&.pos
          background rgba(0,160,220,.4)
          color rgb(77,85,93)
          &.active
            background rgb(0,160,220)
            color #ffffff
        &.neg
          background rgba(77,85,93,.2)
          color rgb(77,85,93)
          &.active
            background rgb(77,85,93)
            color #fff
  .bottom
    border-bottom 1px solid rgba(7,17,27,.1)
    padding 12px 18px
    font-size 12px
    color-147()
    line-height 24px
    .icon-check_circle
      font-size 24px
      color-147()
      display inline-block
      margin-right 4px
      vertical-align top
      position relative
      top -1px
      &.active
        color #00b43c
</style>
