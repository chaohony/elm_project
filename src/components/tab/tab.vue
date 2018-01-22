<template>
    <div class="tab">
      <ul class="link-wrapper">
        <li class="link-item">
          <router-link :to="'goods'">商品</router-link>
        </li>
        <li class="link-item">
          <router-link :to="'ratings'">评价</router-link>
        </li>
        <li class="link-item">
          <router-link :to="'seller'">商家</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {},
  methods: {},
  computed: {},
  components: {},
  data () {
    return {}
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.tab
  height 40px
  border-bottom 1px solid rgba(7,17,27,.1)
  .link-wrapper
    display flex
    height 100%
    .link-item
      flex 1
      text-align center
      line-height 40px
      a
        color rgb(77,85,93)
        &.active
          color rgb(240,20,20)
</style>
