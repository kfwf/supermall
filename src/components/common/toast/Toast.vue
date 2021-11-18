<template>
  <div class="toast">
    <div v-show="isShow">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {

    },
    data() {
      return {
        message: "",
        isShow: false
      }
    },
    methods: {
        show(message, duration = 3000) {
          this.isShow = true;
          this.message = message;
          setTimeout(() => {
            this.isShow = false;
            this.message = "";
          }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .75);
    color: #fff;
    z-index: 999;
  }
</style>
