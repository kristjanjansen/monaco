import marked from "https://unpkg.com/marked@0.8.0/lib/marked.esm.js";

const {
  default: compositionApi,
  ref,
  onMounted,
  computed
} = window.vueCompositionApi;
Vue.use(compositionApi);

import {
  EditorView,
  ViewPlugin,
  EditorState,
  baseKeymap,
  indentSelection,
  lineNumbers,
  defaultHighlighter,
  keymap,
  html,
  bracketMatching,
  history,
  redo,
  undo
} from "../../vendor/vendor.js";

export default function useEditor(inputeditorContent = "") {
  const editor = ref(null);
  const editorContent = ref(inputeditorContent);

  let onUpdatePlugin = ViewPlugin.create(view => {
    return {
      update({ state }) {
        editorContent.value = state.toJSON().doc;
      }
    };
  });

  const extensions = [
    lineNumbers(),
    bracketMatching(),
    defaultHighlighter,
    html(),
    history(),
    keymap(baseKeymap),
    keymap({
      "Mod-z": undo,
      "Mod-Shift-z": redo,
      Tab: indentSelection
    }),
    onUpdatePlugin.extension
  ];

  let ev = new EditorView({
    state: EditorState.create({ doc: editorContent.value, extensions })
  });

  onMounted(() => {
    editor.value.replaceWith(ev.dom);
  });

  const content = computed(() => {
    return marked(editorContent.value, { breaks: true });
  });

  return { editor, content };
}
