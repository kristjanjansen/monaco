const { watch } = window.vueCompositionApi;
const { ref, onMounted } = window.vueCompositionApi;
import { importMonaco } from "../../../monaco/monaco.js";
import { provideCompletionItems, provideHover } from "./providers.js";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "html") {
      return "../monaco/html.worker.js";
    }
    return "../monaco/editor.worker.js";
  }
};
//import { useMonaco } from "./useMonaco.js";

export default {
  props: { value: { default: "" } },
  setup(props, { emit }) {
    //const { editorNode, editorContent } = useMonaco(props.content);
    const editorNode = ref(null);
    //const editorContent = ref(content);

    onMounted(() => {
      importMonaco.then(monaco => {
        monaco.languages.registerCompletionItemProvider("html", {
          provideCompletionItems
        });
        monaco.languages.registerHoverProvider("html", { provideHover });
        const editor = monaco.editor.create(editorNode.value, {
          value: "",
          language: "html",
          theme: "vs-dark",
          fontSize: "14px",
          wordWrap: "wordWrapColumn",
          wordWrapColumn: 65,
          minimap: {
            enabled: false
          }
        });
        const model = editor.getModel();
        model.updateOptions({ tabSize: 2 });

        watch(
          () => props.value,
          value => editor.setValue(value)
        );

        editor.onDidChangeModelContent(e => {
          emit("input", editor.getValue());
        });
      });
    });

    return { editorNode };
  },
  template: `
    <div ref="editorNode" />
  `
};

/*
const { watch } = window.vueCompositionApi;

import { useMonaco } from "./useMonaco.js";

export default {
  props: { content: { default: "" } },
  setup(props, { emit }) {
    const { editorNode, editorContent } = useMonaco(props.content);
    // watch(() => editorContent, () => emit("value", editorContent));
    return { editorNode };
  },
  template: `
    <div ref="editorNode" />
  `
};
*/