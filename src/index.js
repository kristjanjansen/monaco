const { default: compositionApi, ref } = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";
///import FMonacoEditor from "./components/FMonacoEditor/FMonacoEditor.js";

for (const name in components) {
  Vue.component(name, components[name]);
}
//Vue.component("FMonacoEditor", FMonacoEditor);

//Vue.prototype.$global = new Vue();

import { appState, useState } from "./state.js";
let a = useState({ editor: false, aba: true }, "amma");

const states = useState({}, "states");

const gett = key => {
  return states.value.hasOwnProperty(key) ? states.value[key] : 0;
};

const sett = (key, value) => {
  states.value = { ...states.value, [key]: value };
};

Vue.mixin({ methods: { gett, sett } });

const FEditorHeader = {
  setup() {
    const { monacoEditor } = appState;
    return { a, monacoEditor };
  },
  template: `
<div style="background: var(--paleblue); color: white; padding: 10px; display: flex; align-items: top;">
  <f-toggle v-model="monacoEditor" title="Pro mode" />
  {{ a }}
  <button @click="a = {...a, editor: !a.editor}">a</button>
  <f-toggle :value="a.editor" @input.native="a = {...a, editor: !a.editor}" title="Pro dode" />

</div>
  `
};

Vue.component("FEditorHeader", FEditorHeader);

new Vue({
  components: {
    FMonacoEditor: () => import("./components/FMonacoEditor/FMonacoEditor.js")
  },
  setup() {
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
