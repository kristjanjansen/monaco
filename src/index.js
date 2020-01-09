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

// Experimental states

import { useStore } from "./state.js";

const states = useStore({}, "fachwerk_document");

const load = key => {
  return states.value.hasOwnProperty(key) ? states.value[key] : 0;
};

const save = (key, value) => {
  states.value = { ...states.value, [key]: value };
};

Vue.mixin({ methods: { save, load } });

new Vue({
  setup() {
    const content = ref("haaa");
    return { content };
  },
  template: `
    <f-fetch src="./index.md" v-slot="{ value: content }">
      <f-content-editor3 :content="content" />
    </f-fetch>
  `
}).$mount("#app");
