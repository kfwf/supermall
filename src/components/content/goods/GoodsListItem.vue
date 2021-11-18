<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @Load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
          }
        }
     },
     computed: {
       showImage() {
         return this.goodsItem.image || this.goodsItem.show.img
       }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        if (this.goodsItem.iid) {
        this.$router.push('./detail/' + this.goodsItem.iid)
      } else {
        this.$router.push('/detail/' + this.goodsItem.item_iid)
      }
    }
    // },
    // methods: {
    //   imageLoad() {
    //     this.$bus.$emit('itemImageLoad')
    //   }
    // }
    }
    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    background-color: #fff;
    z-index: 9;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    /* 文本溢出省略*/
    text-overflow: ellipsis;
    /* 强制文字在p标签中显示 */
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(../../../assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>
