const {
  default: compositionApi,
  ref,
  computed,
  watch
} = window.vueCompositionApi;
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

const FSmallToggle = {
  props: { value: { default: false }, title: { default: "" } },
  setup(props, { emit }) {
    const enabled = ref(props.value);
    watch(() => emit("input", enabled.value));
    return { enabled };
  },
  template: `
  <a class="quaternary" @click="enabled = !enabled">{{ enabled ? '🚀' : '🚴‍♀️' }} {{ title }}</a>
`
};

Vue.component("FSmallToggle", FSmallToggle);

new Vue({
  components: {
    FMonacoEditor: () => import("./components/FMonacoEditor/FMonacoEditor.js")
  },
  setup() {
    const monacoEditor = useStore(false, "fachwerk_editor");

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
    const isResetable = computed(() => content.value !== initalContent);

    return {
      monacoEditor,
      content,
      onSave,
      onReset,
      isSaved,
      isResetable
    };
  },
  template: `
  <div style="display: flex; height: 100vh; --paleblue: #1e1e1e">
      <div style="flex: 1; display: flex; flex-direction: column; background: var(--paleblue); color: white;">
        <div style="
          height: var(--base6);
          padding: 0 var(--base);
          background: var(--paleblue);
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <a
            class="quaternary"
            @click="$global.$emit('edit')"
            title="Close editor"
          ><f-close-icon /></a>
          <f-small-toggle v-model="monacoEditor" title="Mode" />
          <div>
            <a v-if="isResetable" class="quaternary" @click="onReset" style="opacity: 0.5">Reset</a>
            <a class="quaternary" @click="onSave">{{ isSaved ? 'Saved' : 'Save'}}</a>
          </div>
        </div>
        <f-monaco-editor v-if="monacoEditor" v-model="content" style="flex: 1;" />
        <f-editor v-if="!monacoEditor" v-model="content" style="flex: 1; padding-top: calc(var(--base) * 0.25); padding-left: calc(var(--base) * 9);" />
      </div>
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
