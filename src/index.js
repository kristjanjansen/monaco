const {
  default: compositionApi,
  ref,
  computed,
  watch
} = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";

for (const name in components) {
  Vue.component(name, components[name]);
}

import FContentEditor3 from "./components/FContentEditor3.js";
Vue.component("FContentEditor3", FContentEditor3);

// Experimental store

import { gett, sett } from "./store.js";

Vue.mixin({ methods: { gett, sett } });

// Experimental slider

import Slider from "./components/Slider.js";

Vue.component("Slider", Slider);

new Vue({
  setup() {
    const content = ref("haaa");
    return { content };
  },
  template: `
    <f-fetch src="./index.md" v-slot="{ value: content }">
      <f-content-editor3 :content="'hello'" />
    </f-fetch>
  `
}).$mount("#app");
