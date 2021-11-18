<template>
  <div id="app">
    <!-- keep-alive包裹，可以让当前当前界面不会被销毁 -->
    <keep-alive exclude="Detail">
     <router-view/>
      </keep-alive>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="./assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="./assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="./assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/me">
        <img slot="item-icon" src="./assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import tabBar from './components/common/tabbar/tabBar.vue'
  import tabBarItem from './components/common/tabbar/tabBarItem.vue'

  export default {
    name: 'App',
    components: {
      tabBar,
      tabBarItem
    }
  }
</script>

<style scoped>
  @import "./assets/css/base.css";
  @import "./assets/css/normalize.css";
</style>
