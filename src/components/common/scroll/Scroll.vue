<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      // 不同组件滑轮，实时监听传值
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // scroll内部属性
        scroll: null
      }
    },
    mounted() {
      // 创建scroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        // 当有div需要被监听，此处click必须为true
        click: true,
        // 开启上拉
        pullUpLoad: true,
        observeDOM: true,
        observelmage: true
      })

      // 监听滚动的位置
      if(this.probeType === 2 || this.probeType ===3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
         this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
         this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
         this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
</style>
