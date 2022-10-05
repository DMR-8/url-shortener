<template>
  <section class="shortener">
    <h1>Just paste the URL, submit and it's done!</h1>
    <div class="form-holder">
      <form class="short-box" @submit.prevent="shorten">
        <input
          class="input"
          type="url"
          placeholder="Your long URL"
          v-model="url"
        />
        <button class="button">&#128295;</button>
      </form>
    </div>
    <div class="response" v-if="shortenedLink && !hasRequestError">
      <div class="link">
        <a :href="shortenedLink" target="_blank" rel="noopener noreferrer">{{
          shortenedLink
        }}</a>
        &#127758;
      </div>
      <img
        class="copy-icon"
        :src="srcClipboard"
        alt=""
        aria-label="Copy to clipboard"
        @click="copyLink($event)"
        v-tooltip="tooltip"
      />
    </div>
    <p v-if="!shortenedLink && !hasRequestError">Your short link goes here!</p>

    <p v-if="hasRequestError" class="error">An error occurred!</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "../services/axios";
import clipboard from "../assets/clipboard.svg";
import clipboardCheck from "../assets/clipboard-check.svg";
import { useLinkStore } from "../stores/link.store";
import type { LinkData } from "../stores/link.store";
export default defineComponent({
  setup() {
    const linkStore = useLinkStore();
    const tooltip = ref("Copy to clipboard!");
    const url = ref("");
    const shortenedLink = ref("");
    const hasRequestError = ref(false);
    const srcClipboard = ref(clipboard);

    const shorten = async () => {
      try {
        let linkInDB = linkStore.checkLink(url.value.trim());
        if (linkInDB == false) {
          const { data } = await axios.post("/shorten", {
            long_url: url.value.trim(),
          });

          linkStore.addLink({
            org_link: url.value.trim(),
            short_link: data.link,
          } as LinkData);
          shortenedLink.value = data.link;
        } else {
          shortenedLink.value = linkStore.getLink(url.value.trim()).short_link;
        }

        hasRequestError.value = false;
      } catch (error) {
        console.error(error);
        hasRequestError.value = true;
      }
    };
    const copyLink = (event: MouseEvent) => {
      navigator.clipboard.writeText(shortenedLink.value);
      tooltip.value = "Copied!";
      srcClipboard.value = clipboardCheck;
      setTimeout(() => {
        srcClipboard.value = clipboard;
        tooltip.value = "Copy to clipboard!";
      }, 5000);
    };

    return {
      shorten,
      copyLink,
      url,
      shortenedLink,
      hasRequestError,
      srcClipboard,
      tooltip,
    };
  },
});
</script>

<style lang="css" scoped>
.shortener {
  width: min(100%-15px, 840px);
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}
.form-holder {
  display: flex;
  width: 100%;
  justify-content: center;
}
.short-box {
  margin: 10px auto;
  background-color: #fff;
  border-radius: 5px;
  height: 50px;
  min-width: 250px;
  width: 100%;
  max-width: 500px;
  display: flex;
}

.short-box input,
.short-box button {
  border: none;
  outline: none;
  background-color: transparent;
  color: #808080;
}
.input {
  width: 100%;
  padding: 10px;
}
.button {
  display: grid;
  place-items: center;
  font-size: 19px;
  cursor: pointer;
  transition: color 0.5s;
}
.button:hover {
  color: #0170f0;
}

.response {
  min-width: 250px;
  width: 100%;
  max-width: 500px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.copy-icon {
  height: 40px;
  width: 40px;
}
.link {
  font-size: 23px;
}
</style>
