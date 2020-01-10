const { default: compositionApi, ref, computed } = window.vueCompositionApi;
Vue.use(compositionApi);

import { useStore } from "./hooks/useStore.js";

const store = useStore({}, "fachwerk_state");

const gett = key => {
  return store.value.hasOwnProperty(key) ? store.value[key] : 0;
};

const sett = (key, value) => {
  store.value = { ...store.value, [key]: value };
};

export { gett, sett };
