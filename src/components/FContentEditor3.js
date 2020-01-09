const { ref, watch, computed } = window.vueCompositionApi;

import FSmallToggle from "./FSmallToggle.js";
Vue.component("FSmallToggle", FSmallToggle);

import { useStore } from "../state.js";

export default {
  components: {
    FMonacoEditor: () => import("./FMonacoEditor/FMonacoEditor.js")
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
        <f-editor v-if="editorOpen && !editorType" v-model="editorContent" style="flex: 1; padding-top: calc(var(--base) * 0.25); padding-left: calc(var(--base) * 3);" />
      </div>
      <f-content style="flex: 1;" :content="editorContent" />
  </div>
  `
};
