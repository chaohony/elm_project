<template>
    <div class="goods">
      <div class="goods-left" ref="menu">
        <ul class="menu-wrapper">
          <li :class="{active: index === currentIndex}" v-for="(item,index) in goods" :key="index" class="menu-item" @click="_jumpToFood(index)">
            <div class="item">
              <span class="icon" v-show="item.type > 0" :class="imgMap[item.type]"></span>
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="goods-right" ref="food">
        <ul class="foods-wrapper">
          <li v-for="(item,index) in goods" :key="index" class="food-item">
            <h1 class="title">{{ item.name }}</h1>
            <ul class="individual-wrapper">
              <li v-for="(food,i) in item.foods" :key="i" class="individual">
                <div class="content">
                  <div class="content-left"><img :src="food.icon" alt=""></div>
                  <div class="content-right">
                    <h2 class="name">{{ food.name }}</h2>
                    <h3 class="description">{{ food.description }}</h3>
                    <h4 class="sell_and_rating">
                      <span class="sell">月售{{ food.sellCount }}</span>
                      <span class="rating">好评率{{ food.rating }}%</span>
                    </h4>
                    <h5 class="price">
                      ￥<span class="now">{{ food.price }}</span>
                      <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                    </h5>
                  </div>
                  <cart-control :hook="[index,i]" @addAni="addAni($event)" @add="add($event)" @dec="dec($event)" :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import CartControl from '@/components/cartcontrol/cartcontrol'
import eventBus from '@/common/js/eventBus'
const ERR_OK = 0
export default {
  props: {},
  methods: {
    _initMenuScroll () {
      if (!this.menuScroll) {
        this.menuScroll = new BScroll(this.$refs.menu, {click: true})
      } else {
        this.menuScroll.refresh()
      }
    },
    _initFoodScroll () {
      if (!this.foodScroll) {
        this.foodScroll = new BScroll(this.$refs.food, {
          click: true,
          probeType: 3
        })
      } else {
        this.foodScroll.refresh()
      }
    },
    _calculateHeight () {
      let DOMGroup = this.$refs.food.getElementsByClassName('food-item')
      let len = DOMGroup.length
      let arr = []
      let count = 0
      arr.push(count)
      for (let i = 0; i < len; i++) {
        count += DOMGroup[i].clientHeight
        arr.push(count)
      }
      this.heightArr = arr
    },
    _onScroll () {
      if (!this.MenuGroup.length) {
        this.MenuGroup = this.$refs.menu.getElementsByClassName('menu-item')
      }
      this.foodScroll.on('scroll', (obs) => {
        let dis = Math.floor(Math.abs(obs.y))
        let tempArr = this.heightArr
        let count = 0
        for (let i = 0; i < tempArr.length; i++) {
          if (dis >= tempArr[i] && dis < tempArr[i + 1]) {
            count = i
            break
          }
        }
        this.currentIndex = count
        this.menuScroll.scrollToElement(this.MenuGroup[count], 300)
      })
    },
    _jumpToFood (index) {
      if (!this.FoodGroup.length) {
        this.FoodGroup = this.$refs.food.getElementsByClassName('food-item')
      }
      this.foodScroll.scrollToElement(this.FoodGroup[index], 300)
    },
    _initEventBus () {
      eventBus.$on('add_from_shopcart', (food) => {
        let hook = food.hook
        let index0 = hook[0]
        let index1 = hook[1]
        this.goods[index0].foods[index1].count = food.count
      })
      eventBus.$on('dec_from_shopcart', (food) => {
        let hook = food.hook
        let index0 = hook[0]
        let index1 = hook[1]
        this.goods[index0].foods[index1].count = food.count
      })
    },
    addAni (dom) {
      eventBus.$emit('addAni_from_goods', dom)
    },
    add (food) {
      eventBus.$emit('add_from_goods', food)
    },
    dec (food) {
      eventBus.$emit('dec_from_goods', food)
    }
  },
  computed: {},
  components: {
    CartControl
  },
  data () {
    return {
      goods: [],
      imgMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      heightArr: [],
      currentIndex: 0,
      MenuGroup: [],
      FoodGroup: []
    }
  },
  created () {
    axios.get('/api/goods').then((res) => {
      if (ERR_OK === res.data.errno) {
        this.goods = res.data.data
        this.$nextTick(() => {
          this._initMenuScroll()
          this._initFoodScroll()
          this._calculateHeight()
          this._onScroll()
          this._initEventBus()
        })
      }
      eventBus.$on('empty', () => {
        this.goods.forEach((item, index) => {
          item.foods.forEach((food, i) => {
            if (food.count) {
              food.count = 0
            }
          })
        })
      })
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.goods
  position fixed
  top 175px
  bottom 48px
  left 0
  width 100%
  display flex
  .goods-left
    flex 0 0 80px
    width 80px
    overflow hidden
    .menu-wrapper
      .menu-item
        background #f3f5f7
        padding 0 12px
        height 54px
        font-size 12px
        color-7()
        font-weight 200
        line-height 14px
        display table
        width 100%
        box-sizing border-box
        &.active
          background #ffffff
          position relative
          top -1px
          .item
            &:after
              display none
        .item
          display table-cell
          vertical-align middle
          width 100%
          box-sizing border-box
          border-1px()
  .goods-right
    flex 1
    overflow hidden
    .foods-wrapper
      .food-item
        .title
          border-left 2px solid #d9dde1
          text-indent 14px
          background #f3f5f7
          font-size 12px
          color-147()
          line-height 26px
          height 26px
        .individual-wrapper
          .individual
            padding 18px
            .content
              display flex
              position relative
              border-1px()
              &::after
                bottom -18px
              .content-left
                flex 0 0 80px
                width 70px
                height 70px
                img
                  width 70px
                  height 70px
              .content-right
                h2
                  margin-top 2px
                  font-size 14px
                  color-7()
                  line-height 14px
                  margin-bottom 8px
                h3,h4
                  font-size 10px
                  color-147()
                  line-height 10px
                h4
                  margin-top 8px
                  .sell
                    display inline-block
                    margin-right 7px
                h5
                  font-size 10px
                  color rgb(240,20,20)
                  font-weight 700
                  line-height 24px
                  .now
                    font-size 14px
                    display inline-block
                  .old
                    color-147()
                    text-decoration line-through
              .cartcontrol
                position absolute
                right 0
                bottom 0
</style>
