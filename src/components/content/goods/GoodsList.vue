<template>
  <div class="goods">
    <!-- 如果需要使用插槽就用双标签 -->
   <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>
  .goods {
    display: flex;
    /* 横向均匀 */
    flex-wrap: wrap;
    /* 中间均等分 */
    justify-content: space-around;
    padding: 2px;
  }
</style>
