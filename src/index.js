const { default: compositionApi } = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";
import { useMonaco } from "./hooks/useMonaco.js";

for (const name in components) {
  Vue.component(name, components[name]);
}

Vue.prototype.$global = new Vue({ data: { state: {} } });

new Vue({
  setup() {
    const { editorNode, content } = useMonaco(
      "<f-scene grid>\n  <f-circle/>\n</f-scene>"
    );
    return { editorNode, content };
  },
  template: `
  <div style="display: flex; height: 100vh;">
      <div ref="editorNode" style="flex: 1;" />
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
