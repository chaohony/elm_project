<template>
  <transition name="move">
    <div class="food" ref="food" v-show="showFlag" @scroll.stop.prevent>
      <div class="wrapper" v-if="selectedFood[0]">
        <div class="header"><img :src="selectedFood[0].image" alt=""><i @click.stop.prevent="hide" class="icon-arrow_lift"></i></div>
        <div class="information">
          <h1 class="name">{{ selectedFood[0].name }}</h1>
          <h2 class="sell_and_rating">
            <span class="sell">月售{{ selectedFood[0].sellCount }}份</span>
            <span class="rating">好评率{{ selectedFood[0].rating }}%</span>
          </h2>
          <h3 class="price">
            ￥<span class="now">{{ selectedFood[0].price }}</span>
            <span class="old" v-show="selectedFood[0].oldPrice">{{ selectedFood[0].oldPrice }}</span>
          </h3>
          <div class="shop">
            <transition name="fade">
              <div class="addinshopcart" @click.stop.prevent="addFirst" v-show="!selectedFood[0].count">加入购物车</div>
            </transition>
            <cart-control  
            v-show="selectedFood[0].count > 0" 
            :food="selectedFood[0]"
            @add="add($event)" 
            @dec="dec($event)"
            @addAni="addAni($event)"></cart-control>
          </div>
        </div>
        <split></split>
        <div class="introduction">
          <h1 class="title">商品介绍</h1>
          <p class="para">{{ selectedFood[0].info }}</p>
        </div>
        <split></split>
        <div class="ratingarea">
          <h1 class="title">商品评价</h1>
          <rating-block 
          v-if="selectedFood[0].ratings.length" 
          :ratings="selectedFood[0].ratings"
          :desc="desc"
          :selectedType="selectedType"
          @chooseType="chooseType($event)"
          :seeOnly="seeOnly"
          @toggle="toggle"></rating-block>
        </div>
        <div class="ratings">
          <ul class="ratings-wrapper" v-if="selectedFood[0].ratings.length">
            <li class="ratings-item" v-show="needShow(item)" v-for="(item,index) in selectedFood[0].ratings" :key="index">
              <div class="floor1">
                <div class="time">{{ item.rateTime | format }}</div>
                <div class="userinfor">
                  <span class="username">{{ item.username }}</span>
                  <img :src="item.avatar" alt="">
                </div>
              </div>
              <div class="floor2">
                <i class="icon" :class="{'icon-thumb_down': item.rateType===1,'icon-thumb_up': item.rateType===0}"></i>
                {{ item.text }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartControl from '@/components/cartcontrol/cartcontrol'
import Split from '@/components/split/split'
import BScroll from 'better-scroll'
import RatingBlock from '@/components/ratingblock/ratingblock'
import {format} from '@/common/js/format'
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  props: {
    selectedFood: {
      type: Array,
      default () {
        return []
      }
    },
    num: {
      type: Number
    }
  },
  methods: {
    chooseType (type) {
      switch (type) {
        case 'all':
          this.selectedType = ALL
          break
        case 'pos':
          this.selectedType = POSITIVE
          break
        case 'neg':
          this.selectedType = NEGATIVE
          break
        default :
          break
      }
    },
    needShow (item) {
      if (this.seeOnly) {
        if (this.selectedType === 2) {
          return item.text
        } else {
          return item.text && (item.rateType === this.selectedType)
        }
      } else {
        if (this.selectedType === 2) {
          return true
        } else {
          return item.rateType === this.selectedType
        }
      }
    },
    toggle () {
      this.seeOnly = !this.seeOnly
    },
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (e) {
      if (this.selectedFood[0].count) {
        return
      }
      this.$set(this.selectedFood[0], 'count', 1)
      this.$set(this.selectedFood[0], 'hook', this.selectedFood[1])
      this.$emit('addFirst', this.selectedFood[0])
      this.$emit('addAni', e.target)
    },
    addAni (el) {
      this.$emit('addAni', el)
    },
    add (food) {
      this.$emit('add', food)
    },
    dec (food) {
      this.$emit('dec', food)
    }
  },
  computed: {},
  components: {
    CartControl,
    Split,
    RatingBlock
  },
  filters: {
    format (time) {
      let date = new Date(time)
      return format(date, 'yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showFlag: false,
      desc: ['全部', '推荐', '吐槽'],
      selectedType: 2,
      seeOnly: true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.food
  position fixed
  top 0
  bottom 48px
  width 100%
  left 0
  z-index 200
  background #ffffff
  transition all .4s linear
  &.move-enter,&.move-leave-to
    transform translate3d(100%,0,0)
  .header
    widht 100%
    height 0
    line-height 0
    padding-top 100%
    position relative
    img
      width 100%
      height 100%
      position absolute
      top 0
      left 0
    .icon-arrow_lift
      display inline-block
      color #ffffff
      width 20px
      height 20px
      position absolute
      top 20px
      left 20px
  .information
    padding 18px
    position relative
    .name
      font-size 14px
      font-weight 700
      color-7()
      line-height 14px
      margin-bottom 8px
    .sell_and_rating
      margin-bottom 12px
      font-size 10px
      color-147()
      line-height 10px
      .sell
        display inline-block
        margin-right 2px
    .price
      font-size 10px
      font-weight 700
      color rgb(240,20,20)
      line-height 24px
      .now
        font-size 14px
        display inline-block
      .old
        color-147()
        text-decoration line-through
    .shop
      width 72px
      height 24px
      position absolute
      right 18px
      bottom 18px
      .addinshopcart
        width 72px
        height 24px
        border-radius 12px
        color #ffffff
        font-size 10px
        background rgb(0,160,220)
        line-height 24px
        text-align center
        transition all .3s
        position absolute
        &.fade-enter,&.fade-leave-to
          opacity 0
  .introduction
    padding 18px
    .title
      font-size 14px
      font-weight 700
      color-7()
      line-height 14px
      margin-bottom 6px
    .para
      padding 0 8px
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
  .ratingarea
    .title
      margin-top 18px
      font-size 14px
      font-weight 700
      color-7()
      line-height 14px
      margin-bottom 18px
      margin-left 18px
  .ratings
    padding 0 18px
    .ratings-wrapper
      .ratings-item
        padding 16px 0
        border-1px()
        .floor1
          display flex
          justify-content space-between
          margin-bottom 6px
          font-size 10px
          color-147()
          line-height 12px
          .userinfor
            .username
              display inline-block
              margin-right 6px
            img
              width 12px
              height 12px
              border-radius 50%
              vertical-align top
        .floor2
          font-size 12px
          color-7()
          line-height 16px
          .icon
            font-size 12px
            color-147()
            line-height 24px
            display inline-block
            margin-right 4px
            &.icon-thumb_up
              color rgb(0,160,220)
</style>
