const { default: compositionApi, ref } = window.vueCompositionApi;
Vue.use(compositionApi);

export const appState = { monacoEditor: ref(false) };
