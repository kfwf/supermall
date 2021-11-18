<template>
  <div id="detail">
    <detail-nav-bar class="detailNav" @titleClick="titleClick" ref="nav"/>
    <b-scroll class="scroll-content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </b-scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message="message" :show="isShow"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParmaInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import backTop from '../../components/content/backTop/backTop.vue'

  import {debounce} from '../../components/network/Utils.js'
  import {itemListenerMixin} from '../../components/network/mixin.js'
  import Toast from '../../components/common/toast/Toast.vue'

  import BScroll from '../../components/common/scroll/Scroll.vue'

  import {getDetail, Goods, getRecommend, Shop, GoodsParam} from '../../components/network/detail.js'
  import {
    mapActions
  } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      backTop,
      BScroll,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        message: '',
        isShow: false
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      //根据iid请求详情页的数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        // console.log(res);
        this.topImages = data.itemInfo.topImages

        //  获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 获取参数属性
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 取出商品评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        setTimeout(() => {
          // 1`图片加载完成的事件监听
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
           this.$refs.scroll.refresh()
          // console.log(this.themeTopYs)
        }, 2000)
        })

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {
      this.getThemeTopY = debounce(() => {
        // 1`图片加载完成的事件监听
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
         this.$refs.scroll.refresh()
        // console.log(this.themeTopYs)
      })
      },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imgLoad() {
        this.$refs.scroll.refresh()
        // this.refresh();
          // console.log(this.themeTopYs);
          this.getThemeTopY()

      },
      titleClick(index) {
        // console.log('why')
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] - 44, 200)
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // this.$refs.scroll.refresh()
        },
      contentScroll(position) {
        // console.log(position);
        // 1获取y值
        const positionY = -position.y

        // 2positionY和主题中值的对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        // 3是否显示返回到顶部
        this.isShowBackTop = -position.y > 1000;
      },
      backClick() {
        // 返回顶部
        // console.log('点击');
        this.$refs.scroll.scrollTo(0, 0, 300);
      },
      addToCart() {
        // 获取购物车需要展示的数据
        // console.log('--');
        const goodsItem = {}
        goodsItem.image = this.topImages[0];
        goodsItem.title = this.goods.title;
        goodsItem.desc = this.goods.desc;
        goodsItem.price = this.goods.newPrice;
        goodsItem.iid = this.iid;

        // 将商品添加到购物车
        // this.$store.CartList.push(goodsItem)
        // this.$store.commit('addCart', goodsItem)
        // this.$store.dispatch('addCart', goodsItem).then(res => {
          this.addCart(goodsItem).then(res => {
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // }, 1500)
          this.$toast.show(res, 2000)
        })

        // 添加购物车成功
      }
     }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 9;
  }

  .detailNav {
    position: relative;
    background-color: #fff;
    z-index: 999;
  }

  .scroll-content {
    height: calc(100% - 44px);
  }

</style>
