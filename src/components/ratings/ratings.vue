<template>
    <div class="ratings" ref="ratings">
      <div class="wrapper">
        <div class="ratings-header">
          <div class="left">
            <h1>{{ seller.score }}</h1>
            <h2>综合评分</h2>
            <h3>高于周边商家{{ seller.rankRate }}</h3>
          </div>
          <div class="right">
            <div class="floor1">
              <span class="text">服务态度</span>
              <star :size="12" :count="seller.serviceScore"></star>
              <span class="score">{{ seller.serviceScore }}</span>
            </div>
            <div class="floor2">
              <span class="text">食物评分</span>
              <star :size="12" :count="seller.foodScore"></star>
              <span class="score">{{ seller.foodScore }}</span>
            </div>
            <div class="floor1">
              <span class="text">送达时间</span>
              <span class="deliveryTime">{{ seller.deliveryTime }}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="ratings-ratingblock" v-if="ratings.length">
          <rating-block 
          :desc="desc" 
          :selectedType="selectedType" 
          :seeOnly="seeOnly"
          :ratings="ratings"
          @chooseType="chooseType($event)"
          @toggle="toggle"></rating-block>
        </div>
        <div class="ratings-ratings">
          <ul class="ratings-wrapper" v-if="ratings.length">
            <li class="ratings-item" v-show="needShow(item)" v-for="(item,index) in ratings" :key="index">
              <img class="avatar" :src="item.avatar" alt="">
              <div class="floor1">
                <span class="name">
                  {{ item.username }}
                </span>
                <span class="time">
                  {{ item.rateTime | format }}
                </span>
              </div>
              <div class="floor2">
                <star :count="item.score" :size="12"></star>
                <span class="text">{{ item.deliveryTime }}分钟送达</span>
              </div>
              <div class="floor3">
                {{ item.text }}
              </div>
              <div class="floor4">
                <i 
                class="icon" 
                :class="{'icon-thumb_down': item.rateType===1,'icon-thumb_up': item.rateType===0}"></i>
                <span class="rec" v-for="(rec,i) in item.recommend" :key="i">
                  {{ rec }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import Star from '@/components/star/star'
import RatingBlock from '@/components/ratingblock/ratingblock'
import Split from '@/components/split/split'
import BScroll from 'better-scroll'
import axios from 'axios'
import {format} from '@/common/js/format.js'
const ERR_OK = 0
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
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
    toggle () {
      this.seeOnly = !this.seeOnly
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
    }
  },
  computed: {},
  filters: {
    format (time) {
      let date = new Date(time)
      return format(date, 'yyyy-MM-dd hh:mm')
    } 
  },
  components: {
    Star,
    RatingBlock,
    Split
  },
  data () {
    return {
      ratings: [],
      desc: ['全部', '满意', '不满意'],
      seeOnly: true,
      selectedType: 2
    }
  },
  created () {
    axios.get('/api/ratings').then((res) => {
      if (res.data.errno === ERR_OK) {
        this.ratings = res.data.data
      }
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.ratings
  position fixed
  top 175px
  bottom 48px
  width 100%
  left 0
  background #ffffff
  overflow hidden
  .ratings-header
    padding 18px 0
    display flex
    .left
      flex 0 0 136px
      width 136px
      border-right 1px solid rgba(7,17,27,.1)
      h1
        font-size 24px
        color rgb(255,153,0)
        line-height 28px
        text-align center
        margin-bottom 6px
      h2
        margin-bottom 8px
        font-size 12px
        color-7()
        line-height 12px
        text-align center
      h3
        font-size 10px
        color-7()
        line-height 10px
        text-align center
        margin-bottom 6px
    .right
      flex 1
      padding 0 24px
      .floor1,.floor2,.floor3
        margin-bottom 8px
        font-size 0
        .text
          font-size 12px
          color-7()
          line-height 18px
          display inline-block
          margin-right 12px
        .star
          margin-right 6px
        .score
          font-size 12px
          color rgb(255,153,0)
          line-height 18px
          position relative
          top -2px
        .deliveryTime
          font-size 12px
          color-147()
          line-height 18px
  .ratings-ratingblock
    padding-top 18px
  .ratings-ratings
    .ratings-wrapper
      padding 0 18px
      .ratings-item
        padding 0 18px 18px 40px
        margin-top 18px
        position relative
        border-1px()
        .avatar
          width 28px
          height 28px
          border-radius 50%
          position absolute
          left 0
          top 0
        .floor1
          display flex
          justify-content space-between
          margin-bottom 4px
          .name
            font-size 10px
            color-7()
            line-height 12px
          .time
            font-size 10px
            font-weight 200
            color-147()
            line-height 12px
        .floor2
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            .s
              margin-right 6px
          .text
            font-size 10px
            font-weight 200
            display inline-block
            color-147()
            line-height 12px
            padding-left 6px
        .floor3
          margin-bottom 8px
          font-size 12px
          color-7()
          line-height 18px
        .floor4
          word-break keep-all
          font-size 0
          .icon
            display inline-block
            font-size 12px
            color rgb(183,187,191)
            line-height 16px
            margin-right 8px
            &.icon-thumb_up
              color rgb(0,160,220)
          .rec
            padding 0 6px
            border 1px solid rgba(7,17,27,.1)
            border-radius 2px
            background #ffffff
            font-size 9px
            color-147()
            line-height 16px
            display inline-block
            margin-right 8px
            margin-bottom 4px
            &:last-child
              margin-bottom 0
            &:nth-of-type(4)
              margin-bottom 0
</style>
