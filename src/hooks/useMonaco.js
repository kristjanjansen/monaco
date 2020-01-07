const { ref, onMounted } = window.vueCompositionApi;
import { importMonaco } from "../../monaco/monaco.js";
import { provideCompletionItems, provideHover } from "./monacoProviders.js";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "html") {
      return "../monaco/html.worker.js";
    }
    return "../monaco/editor.worker.js";
  }
};

export const useMonaco = (defaultContent = "") => {
  const editorNode = ref(null);
  const content = ref(defaultContent);
  onMounted(() => {
    importMonaco.then(monaco => {
      monaco.languages.registerCompletionItemProvider("html", {
        provideCompletionItems
      });
      monaco.languages.registerHoverProvider("html", { provideHover });
      const editor = monaco.editor.create(editorNode.value, {
        value: content.value,
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

      editor.onDidChangeModelContent(e => {
        content.value = editor.getValue();
      });
    });
  });

  return { editorNode, content };
};
