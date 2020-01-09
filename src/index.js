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

import { load, save } from "./hooks/useStore2.js";

// const state = useStore2;

// const load = key => {
//   return state.value.hasOwnProperty(key) ? state.value[key] : 0;
// };

// const save = (key, value) => {
//   state.value = { ...state.value, [key]: value };
//   console.log(state.value.a);
// };

Vue.mixin({ methods: { save, load } });

const Slider = {
  setup() {
    const innerValue = ref(0);

    // watch(innerValue, value => {
    //   state.value = { ...state.value, a: value };
    // });

    // watch(state, value => {
    //   innerValue.value = value.a;
    // });
    return { load, save };
  },
  template: `
    <div><input
      step="0.0001"
      max="360"
      type="range"
      :value="load('a')"
      @input="e => save('a',parseFloat(e.target.value))"
    /> {{ load('a') }}</div>
  `
};

Vue.component("Slider", Slider);

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
