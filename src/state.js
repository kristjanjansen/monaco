const { default: compositionApi, ref, computed } = window.vueCompositionApi;
Vue.use(compositionApi);

export const appState = { monacoEditor: ref(false) };

export const useState = (initialValue = null, key = null) => {
  const value = ref(initialValue);
  if (key) {
    window.localStorage.setItem(key, JSON.stringify(initialValue));
  }
  const localValue = computed({
    get: () => {
      if (key && window.localStorage.getItem(key)) {
        storedValue = JSON.parse(window.localStorage.getItem(key));
        return storedValue !== value.value ? storedValue : value.value;
      }
      return value.value;
    },
    set: val => {
      value.value = val;
      if (key) {
        window.localStorage.setItem(key, JSON.stringify(val));
      }
    }
  });
  return localValue;
};
