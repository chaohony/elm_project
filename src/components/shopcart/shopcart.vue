<template>
    <div class="shopcart" @click="_toggleshow">
      <div class="wrapper">
        <div class="shopcart-left">
          <div class="big-icon">
            <div class="small-icon" :class="{active: totalCount > 0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="balloon" v-show="totalCount > 0">
              {{ totalCount }}
            </div>
          </div>
          <span class="price" :class="{active: totalPrice > 0}">￥{{ totalPrice }}</span>
          <span class="delivery">另需配送费{{ deliveryPrice }}元</span>
        </div>
        <div class="shopcart-right" @click.stop.prevent="hit" :class="{active: totalPrice >= 20}">
          {{ tipWord }}
        </div>
        <div class="balls">
          <div :key="index" v-for="(ball, index) in balls">
            <transition 
            class="drop" 
            @before-enter="beforeDrop" 
            @enter="dropping" 
            @after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <span class="inner"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="detail" v-show="showFlag" @click.stop.prevent>
          <div class="header">
            <span class="title">购物车</span>
            <span class="empty" @click="_empty">清空</span>
          </div>
          <div class="content" ref="content">
            <ul class="content-wrapper">
              <li v-for="(item,index) in selectedFoods" :key="index" class="content-item">
                <div class="item-left">
                  <span class="name">{{ item.name }}</span>
                  <span class="price"><span class="yuan">￥</span>{{ item.price }}</span>
                </div>
                <div class="item-right">
                  <cart-control @addAni="_handleAnimation($event)" @add="add($event)" @dec="dec($event)" :food="item"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="filter">
        <div class="background" @click.stop.prevent="_hide" v-show="showFlag"></div>
      </transition>
    </div>
</template>

<script>
import axios from 'axios'
import eventBus from '@/common/js/eventBus'
import CartControl from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
  props: {
    minPrice: {
      type: Number
    },
    deliveryPrice: {
      type: Number
    }
  },
  methods: {
    _initEventBus () {
      eventBus.$on('add_from_goods', (food) => {
        let hook = food.hook
        let index0 = hook[0]
        let index1 = hook[1]
        this.$set(this.goods[index0].foods[index1], 'count', food.count)
        this.$set(this.goods[index0].foods[index1], 'hook', food.hook)
      })
      eventBus.$on('dec_from_goods', (food) => {
        let hook = food.hook
        let index0 = hook[0]
        let index1 = hook[1]
        this.goods[index0].foods[index1].count = food.count
      })
      eventBus.$on('addAni_from_goods', (dom) => {
        this._handleAnimation(dom)
      })
    },
    add (food) {
      eventBus.$emit('add_from_shopcart', food)
    },
    dec (food) {
      eventBus.$emit('dec_from_shopcart', food)
    },
    _empty () {
      this.goods.forEach((item, index) => {
        item.foods.forEach((food, i) => {
          if (food.count) {
            food.count = 0
          }
        })
      })
      eventBus.$emit('empty')
    },
    _toggleshow () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.content, {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    hit () {
      if (this.totalPrice >= 20) {
        alert(`请支付${this.totalPrice}元`)
      }
    },
    _hide () {
      this.fold = true
    },
    turnDownFold () {
      this.fold = true
    },
    _handleAnimation (dom) {
      let balls = this.balls
      for (let i = 0; i < balls.length; i++) {
        if (!balls[i].show) {
          balls[i].dom = dom
          balls[i].show = true
          this.dropBalls.push(balls[i])
          return
        }
      }
    },
    beforeDrop (el) {
      let balls = this.balls
      let len = balls.length
      while (len--) {
        let ball = balls[len]
        if (ball.show) {
          let rec = ball.dom.getBoundingClientRect()
          let x = rec.left - 32
          let y = -(window.innerHeight - rec.top - 22)
          el.style.display = ''
          el.style.transform = `translate3d(0, ${y}px, 0)`
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
          return
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let height = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = `translate3d(0, 0, 0)`
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = `translate3d(0, 0, 0)`
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  computed: {
    selectedFoods () {
      let tempArr = []
      this.goods.forEach((item, index) => {
        item.foods.forEach((food, i) => {
          if (food.count) {
            tempArr.push(food)
          }
        })
      })
      return tempArr
    },
    tipWord () {
      if (this.totalPrice === 0) {
        return '￥20元起送'
      }
      return this.totalPrice < 20 ? `还差￥${this.minPrice - this.totalPrice}起送` : '立即付款'
    },
    totalCount () {
      let count = 0
      this.selectedFoods.forEach((item, index) => {
        count += item.count
      })
      return count
    },
    totalPrice () {
      let price = 0
      this.selectedFoods.forEach((item, index) => {
        price += item.count * item.price
      })
      return price
    },
    showFlag () {
      if (this.fold) {
        return false
      }
      if (!this.totalCount) {
        this.turnDownFold()
        return false
      }
      return true
    }
  },
  components: {
    CartControl
  },
  data () {
    return {
      goods: [],
      fold: true,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  created () {
    axios.get('/api/goods').then((res) => {
      if (ERR_OK === res.data.errno) {
        this.goods = res.data.data
      }
      this._initEventBus()
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.shopcart
  position fixed
  width 100%
  bottom 0
  left 0
  z-index 10
  .wrapper
    height 48px
    background #141d27
    display flex
    .shopcart-left
      flex 1
      padding-left 80px
      position relative
      .big-icon
        width 56px
        height 56px
        border-radius 50%
        background #141d27
        padding 6px
        box-sizing border-box
        position absolute
        left 18px
        bottom 4px
        .small-icon
          font-size 24px
          height 44px
          width 44px
          left 18px
          bottom 8px
          color rgba(255,255,255,.4)
          line-height 44px
          border-radius 50%
          background rgba(255,255,255,.2)
          text-align center
          &.active
            color #ffffff
            background rgb(0,160,220)
        .balloon
          font-size 9px
          font-weight 700
          color rgb(255,255,255)
          line-height 16px
          background rgb(240,20,20)
          border-radius 12px
          width 24px
          position absolute
          text-align center
          top 0
          right 0
      .price
        font-size 16px
        color rgba(255,255,255,.4)
        display inline-block
        font-weight 700
        padding-right 12px
        border-right 1px solid rgba(255,255,255,.1)
        &.active
          color #ffffff
      .delivery
        font-size 14px
        color rgba(255,255,255,.4)
        display inline-block
        font-weight 700
        line-height 24px
        padding-left 12px
        margin 12px 0
    .shopcart-right
      flex 0 0 105px
      width 105px
      line-height 48px
      text-align center
      font-size 12px
      color rgba(255,255,255,.4)
      font-weight 700
      background rgba(255,255,255,.2)
      &.active
        color #ffffff
        background #00b43c
    .balls
      position absolute
      width 16px
      height 16px
      top 8px
      left 38px
      font-size 0
      .ball
        transition all .5s cubic-bezier(.51,-0.52,.95,.88)
        position absolute
        .inner
          transition all .5s linear
          display inline-block
          width 16px
          height 16px
          background rgb(0,160,220)
          border-radius 50%
  .detail
    position fixed
    bottom 48px
    left 0
    width 100%
    z-index -1
    transition all .4s
    &.fade-enter,&.fade-leave-to
      transform translate3d(0,100%,0)
    .header
      padding 0 18px
      display flex
      justify-content space-between
      height 40px
      background #f3f5f7
      line-height 40px
      font-size 14px
      font-weight 200
      color-7()
      border-bottom 1px solid rgba(7,17,27,.1)
      .empty
        color rgb(0,160,220)
    .content
      max-height 213px
      padding 0 18px
      overflow hidden
      background #ffffff
      .content-wrapper
        .content-item
          border-1px()
          display flex
          padding 12px 0
          .item-left
            flex 1
            display flex
            padding-right 12px
            justify-content space-between
            .name
              font-size 14px
              color-7()
              line-height 24px
            .price
              font-size 14px
              font-weight 700
              color rgb(240,20,20)
              line-height 24px
              .yuan
                font-size 10px
          .item-right
            flex 0 0 72px
            width 72px
  .background
    position fixed
    top 0
    bottom 0
    left 0
    width 100%
    z-index -2
    background rgba(7,17,27,.6)
    transition all .4s
    &.filter-enter,&.filter-leave-to
      opacity 0
</style>
