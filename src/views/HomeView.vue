<template>
  <main>
    <Shortener />
  </main>
</template>

<script lang="ts">
import Shortener from "../components/Shortener.vue";

import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  components: {
    Shortener,
  },
});
</script>
