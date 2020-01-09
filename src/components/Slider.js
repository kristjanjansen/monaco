const { ref, watch } = window.vueCompositionApi;
import { load, save } from "../hooks/useStore2.js";

export default {
  setup() {
    //const innerValue = ref(0);
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
