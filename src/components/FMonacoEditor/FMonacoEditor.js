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
      // We import the editor with dynamic import

      importMonaco.then(monaco => {
        // Setting up autcomplete and hover providers

        monaco.languages.registerCompletionItemProvider("html", {
          provideCompletionItems
        });
        monaco.languages.registerHoverProvider("html", { provideHover });

        // Setting up editor

        const editor = monaco.editor.create(editorNode.value, {
          value: "",
          language: "html",
          theme: "vs-dark",
          fontSize: "15px",
          wordWrap: "wordWrapColumn",
          wordWrapColumn: 75,
          lineNumbers: "off",
          minimap: {
            enabled: false
          }
        });
        const model = editor.getModel();
        model.updateOptions({ tabSize: 2 });

        // When editor content changes
        // we emit input event so the component
        // works with v-model

        editor.onDidChangeModelContent(e => {
          emit("input", editor.getValue());
        });

        // We only change editor content
        // when value prop is really different
        // from what we emitted for v-model
        // otherwise we get the recursive loop

        watch(
          () => props.value,
          value => {
            if (value !== editor.getValue()) {
              model.pushEditOperations(
                [],
                [
                  {
                    range: model.getFullModelRange(),
                    text: value
                  }
                ]
              );
            }
          }
        );
      });
    });

    return { editorNode };
  },
  template: `
    <div ref="editorNode" />
  `
};
