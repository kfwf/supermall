<template>
  <div class="cart-list">
    <b-scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in CartList"
                      :item-info="item"
                      :key="index"/>
    </b-scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'

  import BScroll from '../../../components/common/scroll/Scroll.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      BScroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['CartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
 .cart-list {
   height: calc(100% - 44px - 49px - 40px);
 }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
