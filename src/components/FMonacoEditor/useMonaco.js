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

export const useMonaco = content => {
  const editorNode = ref(null);
  const editorContent = ref(content);

  onMounted(() => {
    importMonaco.then(monaco => {
      monaco.languages.registerCompletionItemProvider("html", {
        provideCompletionItems
      });
      monaco.languages.registerHoverProvider("html", { provideHover });
      const editor = monaco.editor.create(editorNode.value, {
        value: content,
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

      // watch(
      //   () => props.slider1,
      //   slider1 => (slider2.value = slider1)
      // );

      editor.onDidChangeModelContent(e => {
        editorContent.value = editor.getValue();
      });
    });
  });

  return { editorNode, editorContent };
};
