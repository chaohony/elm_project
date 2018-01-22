<template>
    <div class="cartcontrol">
      <div class="dec" @click.stop.prevent="_dec">
        <transition name="move">
          <span v-show="food.count > 0" class="icon-remove_circle_outline">
          </span>
        </transition>
      </div>
      <div class="num">
        <span v-show="food.count > 0">
          {{ food.count }}
        </span>
      </div>
      <div class="add" @click.stop.prevent="_add">
        <span>
          <i ref="idom" class="icon-add_circle"></i>
        </span>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    },
    hook: {
      type: Array
    }
  },
  methods: {
    _add () {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
        if (this.hook.length > 0) {
          this.$set(this.food, 'hook', this.hook)
        }
      } else {
        this.food.count++
      }
      this.$emit('add', this.food)
      this.$emit('addAni', this.$refs.idom)
    },
    _dec () {
      if (this.food.count === 0) {
        return
      }
      this.food.count--
      this.$emit('dec', this.food)
    }
  },
  computed: {},
  components: {},
  data () {
    return {}
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.cartcontrol
  width 72px
  height 24px
  font-size 0
  line-height 24px
  .dec
    display block
    float left
    width 24px
    height 24px
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
    .icon-remove_circle_outline
      display inline-block
      transition all .4s linear
      &.move-enter,&.move-leave-to
        opacity 0
        transform translate3d(24px,0,0) rotate(180deg)
  .num
    display block
    float left
    width 24px
    height 24px
    font-size 10px
    line-height 24px
    text-align center
    vertical-align top
    color-147()
  .add
    display block
    float left
    width 24px
    height 24px
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
</style>
