const {
  default: compositionApi,
  ref,
  onMounted,
  computed
} = window.vueCompositionApi;
Vue.use(compositionApi);

import {
  components as rawComponents,
  kebabcase
} from "https://designstem.github.io/fachwerk/fachwerk.js";

for (const name in rawComponents) {
  Vue.component(name, rawComponents[name]);
}

import { monaco } from "../vendor/vendor.js";

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "html") {
      return "./vendor/worker/html.js";
    }
    return "./vendor/worker/editor.js";
  }
};

const components = Object.entries(rawComponents).map(([key, value]) => {
  return {
    pascalName: key,
    kebabName: kebabcase(key),
    about: value.description ? value.description.trim().split(/\n/)[0] : "",
    ...value
  };
});

const formatType = typename => {
  if (!Array.isArray(typename)) {
    typename = [typename];
  }
  return typename
    .map(t =>
      typeof t == "function" ? (t() instanceof Array ? "array" : typeof t()) : t
    )
    .map(t => `_${t}_`)
    .join(", ");
};

const formatProps = ({ props }) =>
  Object.entries(props)
    .map(
      ([key, value]) => `\`${key}="${value.default}"\` ${
        value.type ? formatType(value.type) : ""
      }\n
${value.description || ""}
  `
    )
    .join("\n---\n");

const formatDocs = component =>
  `[Documentation](https://designstem.github.io/fachwerk/docs/#${component.kebabName}) [Source](https://github.com/designstem/fachwerk/blob/master/src/components/2d/${component.pascalName}.js)`;

const tagSuggestions = range => {
  return components.map(c => {
    return {
      label: c.kebabName,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: c.about,
      insertText: `<${c.kebabName}>`,
      range
    };
  });
};

Vue.prototype.$global = new Vue({ data: { state: {} } });

new Vue({
  setup() {
    const editorNode = ref(null);
    const content = ref("<f-scene></f-scene>");
    onMounted(() => {
      monaco.languages.registerCompletionItemProvider("html", {
        provideCompletionItems: function(model, position) {
          const word = model.getWordUntilPosition(position);
          console.log(word);
          if (word.word == "f-") {
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
          return [];
        }
      });
      monaco.languages.registerHoverProvider("html", {
        provideHover(model, position) {
          const word = model.getWordAtPosition(position);

          if (word) {
            var range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            };

            if (word.word.startsWith("f-")) {
              const component = components.filter(
                c => c.kebabName == word.word
              )[0];

              if (component) {
                console.log(component);
                return {
                  range,
                  contents: [
                    {
                      value: `**${component.kebabName}**`
                    },
                    {
                      value: `${component.about}`
                    },
                    {
                      value: formatDocs(component)
                    },
                    {
                      value: formatProps(component)
                    }
                  ]
                };
              }
            }
          }
          return {};
        }
      });
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
  },
  template: `
  <div style="display: flex; height: 100vh;">
      <div ref="editorNode" style="flex: 1;" />
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
