const { default: compositionApi, ref, watch } = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";
import FMonacoEditor from "./components/FMonacoEditor/FMonacoEditor.js";

for (const name in components) {
  Vue.component(name, components[name]);
}

Vue.component("FMonacoEditor", FMonacoEditor);

Vue.prototype.$global = new Vue({ data: { state: {} } });

new Vue({
  setup() {
    const content = ref("haheeeaa");
    setTimeout(() => (content.value = "100asasas"), 1000);
    //watch(() => console.log(content.value));
    return { content };
  },
  template: `
  <div style="display: flex; height: 100vh;">
      <f-monaco-editor v-model="content" style="flex: 1;" />
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
