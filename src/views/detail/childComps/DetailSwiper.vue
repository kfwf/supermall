<template>
      <swiper class="detail-toper">
        <swiper-item v-for="(item, index) in topImages" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
</template>
<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-toper {
    height: 300px;
    overflow: hidden;
  }

  /* .wiperimg {
    width: 100%;
    height: 100%;
  } */
</style>
