<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.CartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price.substring(1, 6) * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.CartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // return !(this.$store.state.CartList.filter(item => !item.checked).length)
        if(this.$store.state.CartList.length === 0) return false
        return !this.$store.state.CartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.$store.state.CartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.CartList.forEach(item => item.checked = true)
        }
        },
        calcClick() {
          if(!this.isSelectAll) {
            this.$toast.show('请选择购买的商品', 2000)
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
