<template>
    <div class="header">
      <div class="header-wrapper">
        <div class="content">
          <div class="content-left">
            <img :src="seller.avatar" alt="">
          </div>
          <div class="content-right">
            <div class="line_1">
              <span class="brand"></span>
              <span class="name">{{ seller.name }}</span>
            </div>
            <div class="line_2">
              <span class="delivery">{{ seller.description }} / {{ seller.deliveryTime }}分钟必达</span>
            </div>
            <div class="line_3" v-if="seller.supports">
              <span class="icon" :class="imgMap[seller.supports[0].type]"></span>
              <span class="text">{{ seller.supports[0].description }}</span>
              <div class="balloon" @click="_showFlag">
                {{ seller.supports.length }}个<i class="icon-keyboard_arrow_right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="bulletin" @click="_showFlag">
          <span class="icon"></span>
          <span class="para">{{ seller.bulletin }}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
      <transition name="fade">
        <div class="outer" v-show="flag">
          <div class="wrapper">
            <div class="wrapper-main">
              <h1 class="title">{{ seller.name }}</h1>
              <div class="star-wrapper">
                <star :size="24" :count="seller.score"></star>
              </div>
              <v-line :info="'优惠信息'"></v-line>
              <div class="support">
                <ul class="support-wrapper" v-if="seller.supports">
                  <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="imgMap[item.type]"></span>
                    <span class="text">{{ item.description }}</span>
                  </li>
                </ul>
              </div>
              <v-line :info="'商家公告'"></v-line>
              <p class="para">{{ seller.bulletin }}</p>
            </div>
          </div>
          <div class="close">
            <i class="icon-close" @click="_hide"></i>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import Star from '@/components/star/star'
import VLine from '@/components/line/line'
export default {
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    _showFlag () {
      this.flag = true
    },
    _hide () {
      this.flag = false
    }
  },
  computed: {},
  components: {
    Star,
    VLine
  },
  data () {
    return {
      flag: false,
      imgMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
  overflow hidden
  background-color rgba(7,17,27,.5)
  position relative
  .header-wrapper
    .content
      padding 24px 0 18px 24px
      font-size 0
      display flex
      .content-left
        flex 0 0 64px
        img
          width 64px
          height 64px
          border-radius 4px
      .content-right
        flex 1
        margin-left 16px
        .line_1
          margin-top 2px
          margin-bottom 8px
          .brand
            width 32px
            height 18px
            background-size 32px 18px
            background-repeat no-repeat
            bg-img('./brand')
            display inline-block
            margin-right 4px
          .name
            font-size 16px
            color #ffffff
            font-weight bold
            line-height 18px
            vertical-align top
        .line_2
          margin-bottom 10px
          font-size 12px
          color #ffffff
          font-weight 200
          line-height 12px
        .line_3
          margin-bottom 2px
          position relative
          .icon
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            display inline-block
            margin-right 4px
            &.decrease
              bg-img('./decrease_1')
            &.discount
              bg-img('./discount_1')
            &.guarantee
              bg-img('./guarantee_1')
            &.invoice
              bg-img('./invoice_1')
            &.special
              bg-img('./special_1')
          .text
            font-size 10px
            color #ffffff
            font-weight 200
            line-height 12px
            vertical-align top
          .balloon
            height 24px
            display inline-block
            font-size 10px
            color rgb(255,255,255)
            font-weight 200
            line-height 24px
            padding 0 8px
            background rgba(0,0,0,.2)
            border-radius 14px
            position absolute
            right 12px
            top -10px
            .icon-keyboard_arrow_right
              display inline-block
              padding-left 2px
    .bulletin
      height 28px
      padding 0 21px 0 12px
      position relative
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      background rgba(7,17,27,.2)
      font-size 10px
      color #ffffff
      font-weight 200
      line-height 28px
      .icon
        display inline-block
        margin-right 4px
        width 24px
        height 14px
        background-size 24px 14px
        background-repeat no-repeat
        position relative
        top 2px
        bg-img('./bulletin')
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        top 8px
        font-size 12px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    filter blur(10px)
    z-index -1
    img
      width 100%
      height 100%
  .outer
    position fixed
    top 0
    bottom 0
    left 0
    width 100%
    overflow hidden
    z-index 100
    background rgba(7,17,27,.8)
    padding-top 64px
    transition all .3s linear
    &.fade-enter,&.fade-leave-to
      opacity 0
    .wrapper
      min-height 100%
      .wrapper-main
        padding 0 36px 64px 36px
        .title
          font-size 16px
          font-weight 700
          color #ffffff
          line-height 16px
          margin-bottom 16px
          text-align center
        .star-wrapper
          text-align center
          margin-bottom 28px
        .line
          margin-bottom 24px
        .support
          padding 0 12px
          margin-bottom 28px
          .support-item
            font-size 12px
            font-weight 200
            color #ffffff
            line-height 12px
            margin-bottom 12px
            .icon
              width 16px
              height 16px
              background-size 16px 16px
              background-repeat no-repeat
              display inline-block
              margin-right 6px
              vertical-align top
              position relative
              top -3px
              &.decrease
                bg-img('./decrease_2')
              &.discount
                bg-img('./discount_2')
              &.guarantee
                bg-img('./guarantee_2')
              &.invoice
                bg-img('./invoice_2')
              &.special
                bg-img('./special_2')
        .para
          padding 0 12px
          font-size 12px
          font-weight 200
          color #ffffff
          line-height 24px
    .close
      margin-top -64px
      font-size 32px
      color rgba(255,255,255,.5)
      text-align center
</style>
