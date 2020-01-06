const {
  default: compositionApi,
  ref,
  onMounted,
  computed
} = window.vueCompositionApi;
Vue.use(compositionApi);

import {
  components,
  kebabcase
} from "https://designstem.github.io/fachwerk/fachwerk.js";

// const a = Object.entries(components).map(([name, value]) => {
//   return {
//     label: kebabcase(name),
//     kind: monaco.languages.CompletionItemKind.Function,
//     documentation: "",
//     insertText: `<${kebabcase(name)}>`,
//     range: "range"
//   };
// });

//console.log(a);

import { monaco } from "../vendor/vendor.js";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    // if (label === "json") {
    //   return "./json.worker.js";
    // }
    // if (label === "css") {
    //   return "./css.worker.js";
    // }
    // if (label === "typescript" || label === "javascript") {
    //   return "./ts.worker.js";
    // }
    if (label === "html") {
      return "./vendor/worker/html.js";
    }
    return "./vendor/worker/editor.js";
  }
};

// monaco.editor.defineTheme("theme", {
//   base: "vs-dark",
//   inherit: { true }
// });

// monaco.editor.create(document.getElementById("app"), {
//   value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
//   language: "html",
//   theme: "vs-dark"
// });

const tagSuggestions = range => {
  return Object.entries(components).map(([name, value]) => {
    return {
      label: kebabcase(name),
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: `[google](https://google.com)`,
      // documentation: value.description
      //   ? value.description.trim().split(/\n/)[0]
      //   : "",
      insertText: `<${kebabcase(name)}>`,
      range
    };
  });
};

new Vue({
  setup() {
    const editorNode = ref(null);
    const content = ref("hello!");
    onMounted(() => {
      monaco.languages.registerCompletionItemProvider("html", {
        provideCompletionItems: function(model, position) {
          console.log(model);
          var word = model.getWordUntilPosition(position);
          var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };
          return {
            suggestions: tagSuggestions(range)
          };
        }
      });
      const editor = monaco.editor.create(editorNode.value, {
        value: content.value,
        language: "html",
        theme: "vs-dark",
        fontSize: "14px"
      });
      editor.onDidChangeModelContent(e => {
        content.value = editor.getValue();
      });
      editor.getContribution(
        "editor.contrib.suggestController"
      )._widget.expandSuggestionDocs = true;
    });
    return { editorNode, content };
  },
  template: `
  <div style="display: flex; height: 100vh;">
      <div ref="editorNode" style="flex: 1;" />
      <div style="flex: 1;">{{ content }}</div>
  </div>
  `
}).$mount("#app");
