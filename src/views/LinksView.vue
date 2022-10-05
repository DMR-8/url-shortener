<template>
  <section class="links">
    <h3>All the shortened links for you will appear here.</h3>

    <p>Click to copy the short link</p>

    <ul>
      <li
        class="list-item"
        v-for="link in links"
        :key="link.short_link"
        @click="copyText(link.short_link, $event)"
      >
        <span>{{ link.org_link }}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useLinkStore, type LinkData } from "../stores/link.store";
export default defineComponent({
  setup() {
    const linkStore = useLinkStore();
    const showAdvice = ref(false);
    const links = ref([] as LinkData[]);

    const copyText = (short_link: string, event: MouseEvent) => {
      navigator.clipboard.writeText(short_link);
      let refNode = event.target as HTMLElement;
      if (null === refNode) {
        throw Error("refNode.parentNode is null");
      }

      refNode.style.border = "1px solid #00c500";
      setTimeout(() => {
        refNode.style.border = "0";
      }, 500);
    };

    onMounted(() => {
      links.value = linkStore.getAllLinks();
    });
    return {
      copyText,
      links,
      showAdvice,
    };
  },
});
</script>
<style lang="css" scoped>
.links {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
ul {
  list-style-type: none;
  padding: 0px;
  width: 100%;
  max-width: 400px;
}
.list-item {
  padding: 10px;
  margin: 10px 0px;
  border-radius: 10px;
  background-color: #303030;
}
.list-item:hover {
  background-color: #505050;
}
</style>
