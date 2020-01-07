const { ref, onMounted } = window.vueCompositionApi;
import { monaco } from "../../vendor/vendor.js";
import { provideCompletionItems, provideHover } from "./monacoProviders.js";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "html") {
      return "../vendor/worker/html.js";
    }
    return "../vendor/worker/editor.js";
  }
};

export const useMonaco = (defaultContent = "hello") => {
  const editorNode = ref(null);
  const content = ref(defaultContent);
  onMounted(() => {
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

  return { editorNode, content };
};
