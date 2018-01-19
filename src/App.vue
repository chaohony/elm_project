<template>
  <div id="app">
    <div class="header">我是header</div>
    <div class="tab">我是tab</div>
    <router-view/>
    <div class="shopcart">我是购物车</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" stylesheet="stylus/text">

</style>
