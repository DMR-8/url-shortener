<template>
  <footer>
    <p>Made with &#10084; by DMR-8</p>
  </footer>
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
.logo_img {
  height: 50px;
}
.header_link {
  min-height: 30px;
  font-size: 26px;
  margin: 5px;
}
footer {
  position: fixed;
  bottom: 0;
}
</style>
