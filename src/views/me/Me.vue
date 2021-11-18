<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">旺旺商城</div>
    </nav-bar>
    <b-scroll class="scroll-height">
      <login />
      <money />
      <div class="line"></div>
      <profile-list />
    </b-scroll>
  </div>
</template>

<script>
import navBar from '../../components/common/navbar/navBar.vue'
import Login from './childComps/Login.vue'
import Money from './childComps/Money.vue'
import ProfileList from './childComps/profileList.vue'
import BScroll from '../../components/common/scroll/Scroll.vue'

export default {
  name: "Me",
  components: { BScroll, ProfileList, Money, Login, navBar }
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>
