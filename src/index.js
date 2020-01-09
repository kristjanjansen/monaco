const { default: compositionApi, ref } = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";
///import FMonacoEditor from "./components/FMonacoEditor/FMonacoEditor.js";

for (const name in components) {
  Vue.component(name, components[name]);
}
//Vue.component("FMonacoEditor", FMonacoEditor);

//Vue.prototype.$global = new Vue();

import { appState } from "./state.js";

const FEditorHeader = {
  setup() {
    const { monacoEditor } = appState;
    return { monacoEditor };
  },
  template: `
<div style="background: var(--paleblue); color: white; padding: 10px; display: flex; align-items: top;">
  <f-toggle v-model="monacoEditor" title="Pro mode" />
</div>
  `
};

Vue.component("FEditorHeader", FEditorHeader);

import { useState } from "./state.js";

new Vue({
  components: {
    FMonacoEditor: () => import("./components/FMonacoEditor/FMonacoEditor.js")
  },
  setup() {
    const a = useState(false);
    console.log(a.value);
    setTimeout(() => (a.value = true), 1000);
    const { monacoEditor } = appState;
    const content = ref("<f-scene>\n  <f-circle />\n</f-scene>");
    return { a, monacoEditor, content };
  },
  template: `
  <div style="display: flex; height: 100vh; --paleblue: #1e1e1e">
      <div style="flex: 1; display: flex; flex-direction: column; background: var(--paleblue); color: white;">
        <FEditorHeader />
        {{ a }}
        <component :is="monacoEditor ? 'FMonacoEditor' : 'FEditor'" v-model="content" style="flex: 1;" />
      </div>
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
