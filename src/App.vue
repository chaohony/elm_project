<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <Tab></Tab>
    <router-view :seller="seller"/>
    <div class="shopcart">我是购物车</div>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab'
import VHeader from '@/components/header/header'
import {urlParse} from '@/common/js/urlParse.js'
import axios from 'axios'
const ERR_OK = 0
export default {
  name: 'App',
  components: {
    Tab,
    VHeader
  },
  data () {
    return {
      seller: {
        id: (() => {
          let obj = urlParse()
          return obj.id
        })()
      }
    }
  },
  created () {
    let url = '/api/seller?id='
    axios.get(url + this.seller.id).then((res) => {
      if (res.data.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data.data)
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
