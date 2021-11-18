<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/navBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import {
    mapGetters
  } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }

      // 通过导入mapgetters,将store中的getters映射到局部计算属性
      ...mapGetters(['cartLength'])

      // 下面语法使用名字自由
      // ...mapGetters({
      //   length: 'cartLength'
      //   list: 'cartList'
      // })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
