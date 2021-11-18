<template>
  <div class="tab-control">
    <div class="tab-control-item"
    v-for="(item, index) in titles"
     :class="{active: index === currentIndex}"
     @click="ItemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    // props 外向内传数据
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      ItemClick(index) {
        this.currentIndex = index;
        // 由内向外传数据 
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style>
  @import url('../../../assets/css/base.css');

  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);

  }
</style>
