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

const FContentEditor3 = {
  components: {
    FMonacoEditor: () => import("./components/FMonacoEditor/FMonacoEditor.js")
  },
  props: {
    content: { default: "" }
  },
  setup(props) {
    const editorType = useStore(false, "fachwerk_editor_type");

    const editorOpen = useStore(true, "fachwerk_editor_open");
    // $global.$emit('edit')

    // We set up current editor content

    const editorContent = ref(props.content);

    // We also set up a second content store for local storage

    const storedContent = useStore(
      editorContent.value,
      "fachwerk_editor_content"
    );

    // storedContent returns content saved in previous session, if exists

    editorContent.value = storedContent.value;

    watch(
      () => props.content,
      content => {
        editorContent.value = content;
        storedContent.value = content;
      },
      { lazy: true }
    );

    // When saving is triggered, we update the stored content with
    // current editor content

    // The reason we do not use autosave is because when stored
    // content contains an error, it might block the whole Vue rendering
    // and the only way to reset the content is to manually delete it

    const onSave = () => {
      storedContent.value = editorContent.value;
    };

    // On reset we replace both content and stored content values
    // with initial value

    const onReset = () => {
      editorContent.value = props.content;
      storedContent.value = props.content;
    };

    // Checking whenever content has been saved can be done by comparing
    // the editor content and stored content

    const isSaved = computed(() => editorContent.value == storedContent.value);
    const isResetable = computed(() => editorContent.value !== props.content);

    return {
      editorType,
      editorOpen,
      editorContent,
      onSave,
      onReset,
      isSaved,
      isResetable
    };
  },
  template: `
  <div style="display: flex; height: 100vh; --paleblue: #1e1e1e; ">
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--paleblue);
        color: white;
        height: 100vh;
        position: sticky;
        top: 0;
      ">
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
            @click="editorOpen = !editorOpen"
          >
            <f-close-icon />
          </a>
          <f-small-toggle v-model="editorType" title="Mode" />
          <div>
            <a v-if="isResetable" class="quaternary" @click="onReset" style="opacity: 0.5">Reset</a>
            <a class="quaternary" @click="onSave">{{ isSaved ? 'Saved' : 'Save'}}</a>
          </div>
        </div>
        <f-monaco-editor v-if="editorOpen && editorType" v-model="editorContent" style="flex: 1;" />
        <f-editor v-if="editorOpen && !editorType" v-model="editorContent" style="flex: 1; padding-top: calc(var(--base) * 0.25); padding-left: calc(var(--base) * 9);" />
      </div>
      <f-content style="flex: 1;" :content="editorContent" />
  </div>
  `
};

Vue.component("FContentEditor3", FContentEditor3);

new Vue({
  setup() {
    const content = ref("haaa");
    return { content };
  },
  template: `
    <f-fetch src="./index.md" v-slot="{ value: content }">
      <f-content-editor3 :content="content" />
    </f-fetch>
  `
}).$mount("#app");
