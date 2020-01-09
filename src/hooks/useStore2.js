const { default: compositionApi, ref, computed } = window.vueCompositionApi;
Vue.use(compositionApi);

// export const useStore = (initialValue = null, key = null) => {
//   const value = ref(initialValue);
//   if (key && !window.localStorage.getItem(key)) {
//     window.localStorage.setItem(key, JSON.stringify(initialValue));
//   }
//   const localValue = computed({
//     get: () => {
//       let storedValue = null;
//       if (key && window.localStorage.getItem(key)) {
//         storedValue = JSON.parse(window.localStorage.getItem(key));
//         return storedValue !== value.value ? storedValue : value.value;
//       }
//       return value.value;
//     },
//     set: val => {
//       value.value = val;
//       if (key) {
//         window.localStorage.setItem(key, JSON.stringify(val));
//       }
//     }
//   });
//   return localValue;
// };

const store = ref({});

const load = key => {
  return store.value.hasOwnProperty(key) ? store.value[key] : 0;
};

const save = (key, value) => {
  store.value = { ...store.value, [key]: value };
};

export { store, load, save };
