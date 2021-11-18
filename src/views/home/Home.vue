<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <b-scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </b-scroll>
    <!-- 想要监听组件，必须native修饰 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import navBar from '../../components/common/navbar/navBar.vue'
  import tabControl from '../../components/content/tabControl/tabControl.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import BScroll from '../../components/common/scroll/Scroll.vue'
  import backTop from '../../components/content/backTop/backTop.vue'

  import {itemListenerMixin} from '../../components/network/mixin.js'

  import {
    getHomeMultidata,
    getHomeGoods
  } from '../../components/network/home.js'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      navBar,
      tabControl,
      GoodsList,
      BScroll,
      backTop
    },
    mixins: {itemListenerMixin},
    data() {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        // 为true 就不会被当成变量
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)

      this.$refs.scroll.refresh()

    },
    // 记录原来浏览的一个位置
    deactivated() {
      // 保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 取消全局监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    // created在组件创建完成后就立即执行
    created() {
      // 请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')

      this.getHomeGoods('new')

      this.getHomeGoods('sell')

    },
    mounted() {
      // 监听item中图片加载完成
      // let newRefresh = debounce(this.$refs.scroll.refresh, 100)

      // 对监听事件进行保存
        // this.itemImgListener = () => {
        //   newRefresh()
        // }
        // this.$bus.$on('itemImageLoad', this.itemImgListener)
      // 组件不含有offset系列属性，通过$el来获取组件中的元素
      // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    methods: {
      /*事件监听相关方法*/
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl1.curretIndex = index
        this.$refs.tabControl2.curretIndex = index
      },
      backClick() {
        // 返回顶部
        // console.log('点击');
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position)
        // 判断backtop是否显示
        this.isShowBackTop = -(position.y) > 1000

        // 判断tabControl吸顶 添加fixed
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },
      loadMore() {
        setTimeout(() => {
            this.getHomeGoods(this.currentType)
              // 不直接写死scrollerheight,添加refresh刷新,每一次加载完，给他重新加载一个高度
              this.$refs.scroll.refresh()
          }, 1300)
        },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /* 网络请求相关方法*/
      getHomeMultidata() {
        // 请求多个数据
        getHomeMultidata().then(res => {
          // console.log(res);
          // 声明一个变量,数据保存,不会被回收
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        // console.log(this.result);
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        // page需要复用，动态获取
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
 @import url("../../assets/css/base.css");

  #home {
    /* 100%的视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*
    现在使用的是better-scroll局部滚动，所以不需要一下原生滚动属性
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }



  /* .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
 */
 .content {
    overflow: hidden;
    height: calc(100% - 93px);
    /* margin-top: 44px; */
    }

</style>
