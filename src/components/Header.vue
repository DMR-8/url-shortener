<template>
  <header>
    <div class="logo">
      <img :src="turtle" alt="" class="logo_img" />
    </div>
    <h1 class="center-pos">Shorten your links in one Go!</h1>
    <div>
      <RouterLink class="header_link" to="/"> Home </RouterLink>
      <RouterLink class="header_link" to="/links"> Links </RouterLink>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import turtle from "../assets/logo.svg";
export default defineComponent({
  setup() {
    return {
      turtle,
    };
  },
});
</script>

<style lang="css" scoped>
header {
  display: flex;
  width: 100% !important;
  justify-content: space-between;
}
.center-pos {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}
.logo_img {
  height: 50px;
}
.header_link {
  min-height: 30px;
  font-size: 26px;
  margin: 5px;
}
</style>
