<template>
    <div class="seller" ref="seller">
      <div class="wrapper">
        <div class="introduction">
          <div class="intro_1">
            <div class="content">
              <h1 class="name">{{ seller.name }}</h1>
              <star :size="18" :count="seller.score"></star>
              <span class="ratingcount">({{ seller.ratingCount }})</span>
              <span class="sellcount">月售{{ seller.sellCount }}单</span>
            </div>
            <div class="balloon">
              <i class="icon icon-favorite" :class="{active: flag}" @click="toggle"></i>
              <span class="collect">{{ info }}</span>
            </div>
          </div>
          <div class="intro_2">
            <div class="block">
              <span class="text">起送价</span>
              <span class="price">{{ seller.minPrice }}
                <span class="yuan">元</span>
              </span>
            </div>
            <div class="block">
              <span class="text">商家配送</span>
              <span class="price">{{ seller.deliveryPrice }}
                <span class="yuan">元</span>
              </span>
            </div>
            <div class="block">
              <span class="text">平均配送时间</span>
              <span class="price">{{ seller.deliveryTime }}
                <span class="yuan">分钟</span>
              </span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="activity">
          <h1 class="title">活动与公告</h1>
          <p class="para">
            {{ seller.bulletin }}
          </p>
          <ul class="support" v-if="seller.supports">
            <li class="support-item" :key="index" v-for="(item,index) in seller.supports">
              <span class="icon" :class="imgMap[item.type]"></span>
              <span class="text">{{ item.description }}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="view">
          <h1 class="title">商家实景</h1>
          <div class="img-wrapper" ref="view">
            <div class="hook" ref="hook">
              <img class="view-img" v-for="(pic,index) in seller.pics" :key="index" :src="pic" alt="">
            </div>
          </div>
        </div>
        <split></split>
        <div class="information">
          <h1 class="title">商家信息</h1>
          <div class="info" v-for="(info,index) in seller.infos" :key="index">
            {{ info }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Star from '@/components/star/star'
import Split from '@/components/split/split'
import BScroll from 'better-scroll'
import {loadFromLocal, saveToLocal} from '@/common/js/store'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    seller () {
      this.$nextTick(() => {
        this._initHorizontalScroll()
      })
    }
  },
  methods: {
    _initVerticalScroll () {
      if (!this.yscroll) {
        this.scroll = new BScroll(this.$refs.seller, {click: true})
      } else {
        this.yscroll.refresh()
      }
    },
    _initHorizontalScroll () {
      let hook = this.$refs.hook
      let count = 0
      if (this.seller.pics) {
        count = this.seller.pics.length
        let width = (120 + 6) * count
        hook.style.width = width + 'px'
        if (!this.xscroll) {
          this.xscroll = new BScroll(this.$refs.view, {
            click: true,
            eventPassthrough: 'vertical',
            scrollX: true
          })
        } else {
          this.xscroll.refresh()
        }
      }
    },
    toggle () {
      let temp = this.flag
      saveToLocal(this.seller.id, 'flag', !temp)
      this.flag = loadFromLocal(this.seller.id, 'flag', false)
    }
  },
  computed: {
    info () {
      return this.flag ? '已收藏' : '收藏'
    }
  },
  components: {
    Star,
    Split
  },
  data () {
    return {
      imgMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      flag: (() => {
        return loadFromLocal(this.seller.id, 'flag', false)
      })()
    }
  },
  created () {
    this.$nextTick(() => {
      this._initVerticalScroll()
      this._initHorizontalScroll()
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.seller
  position fixed
  top 175px
  bottom 48px
  width 100%
  left 0
  background #ffffff
  overflow hidden
  .introduction
    padding 18px
    .intro_1
      position relative
      .content
        padding-bottom 18px
        border-1px()
        font-size 0
        .name
          font-size 14px
          color-7()
          line-height 14px
          margin-bottom 8px
        .star
          display inline-block
          margin-right 8px
          .s
            margin-right 4px
            &:last-child
              margin-right 0
        .ratingcount,.sellcount
          display inline-block
          font-size 10px
          color rgb(77,85,93)
          line-height 18px
          margin-right 12px
          vertical-align top
      .balloon
        position absolute
        right 0
        top 0
        width 36px
        .icon
          display block
          font-size 24px
          line-height 24px
          text-align center
          margin-bottom 4px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)
        .collect
          display block
          font-size 12px
          color rgb(77,85,93)
          line-height 10px
          text-align center
    .intro_2
      padding-top 18px
      display flex
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7,17,27,.1)
        &:last-child
          border-right none
        .text
          font-size 12px
          color-147()
          line-height 12px
          display inline-block
          margin-bottom 4px
        .price
          display block
          font-size 24px
          font-weight 200
          color-7()
          line-height 24px
        .yuan
          font-size 10px
  .activity
    padding 18px 18px 0 18px
    .title
      font-size 14px
      color-7()
      line-height 14px
      margin-bottom 8px
    .para
      padding 0 12px 16px 12px
      font-size 12px
      font-weight 200
      color rgb(240,20,20)
      line-height 24px
      border-1px()
    .support
      .support-item
        padding 16px 12px
        font-size 12px
        font-weight 200
        color-7()
        line-height 16px
        border-1px()
        &:last-child
          &:after
            display none
        .icon
          display inline-block
          width 16px
          height 16px
          background-size 16px 16px
          background-repeat no-repeat
          margin-right 6px
          vertical-align top
          &.decrease
            bg-img('./decrease_3')
          &.discount
            bg-img('./discount_3')
          &.guarantee
            bg-img('./guarantee_3')
          &.invoice
            bg-img('./invoice_3')
          &.special
            bg-img('./special_3')
  .view
    padding 18px
    font-size 0
    .title
      font-size 14px
      color-7()
      line-height 14px
      margin-bottom 12px
    .img-wrapper
      white-space nowrap
      overflow hidden
      .view-img
        width 120px
        height 90px
        margin-right 6px
  .information
    padding 18px
    .title
      font-size 14px
      color-7()
      line-height 14px
      padding-bottom 12px
      border-1px()
    .info
      padding 16px 12px
      font-size 12px
      font-weight 700
      color-7()
      line-height 16px
      border-1px()
      &:last-child
        &:after
          display none
</style>
