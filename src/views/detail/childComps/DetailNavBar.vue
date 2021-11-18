<template>
  <div id="nav-top-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           class="title-item"
           :class="{active: index === currentIndex}"
           @click="titleClick(index)">
           {{item}}</div>
    </div>
    </nav-bar>
  </div>
</template>

<script>
  import navBar from '../../../components/common/navbar/navBar.vue'

  export default {
    name: "DetailNavBar",
    components: {
      navBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
   flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 10px;
  }
</style>
