const { ref, watch } = window.vueCompositionApi;

export default {
  setup() {
    //const innerValue = ref(0);
  },
  template: `
    <div><input
      step="0.0001"
      max="360"
      type="range"
      :value="gett('a')"
      @input="e => sett('a',parseFloat(e.target.value))"
    /> {{ gett('a') }}</div>
  `
};
