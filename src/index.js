const { default: compositionApi, ref, computed } = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";
///import FMonacoEditor from "./components/FMonacoEditor/FMonacoEditor.js";

for (const name in components) {
  Vue.component(name, components[name]);
}
//Vue.component("FMonacoEditor", FMonacoEditor);

//Vue.prototype.$global = new Vue();

import { appState, useStore } from "./state.js";
let a = useStore({ editor: false, aba: true }, "amma");

const states = useStore({}, "states");

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

    // We set up current editor content

    const initalContent = "<f-scene>\n  <f-circle />\n</f-scene>";

    const content = ref(initalContent);

    // We also set up a second content store for local storage

    const storedContent = useStore(content.value, "fachwerk_content");

    // storedContent returns content saved in previous session, if exists

    content.value = storedContent.value;

    // When saving is triggered, we update the stored content with
    // current editor content

    // The reason we do not use autosave is because when stored
    // content contains an error, it might block the whole Vue rendering
    // and the only way to reset the content is to manually delete it

    const onSave = () => {
      storedContent.value = content.value;
    };

    // On reset we replace both content and stored content values
    // with initial value

    const onReset = () => {
      content.value = initalContent;
      storedContent.value = initalContent;
    };

    // Checking whenever content has been saved can be done by comparing
    // the editor content and stored content

    const isSaved = computed(() => storedContent.value == content.value);

    return { a, monacoEditor, content, onSave, onReset, isSaved };
  },
  template: `
  <div style="display: flex; height: 100vh; --paleblue: #1e1e1e">
      <div style="flex: 1; display: flex; flex-direction: column; background: var(--paleblue); color: white;">
        <FEditorHeader />
        <button @click="onSave">{{ isSaved ? 'saved' : 'save'}}</button>
        <button @click="onReset">Reset</button>
        <component :is="monacoEditor ? 'FMonacoEditor' : 'FEditor'" v-model="content" style="flex: 1;" />
      </div>
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
