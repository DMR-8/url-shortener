import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

FloatingVue.options.themes.tooltip.disabled =
  window.innerWidth <= 768 ? true : false;

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(FloatingVue);
app.mount("#app");
