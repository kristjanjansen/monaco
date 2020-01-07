const { default: compositionApi } = window.vueCompositionApi;
Vue.use(compositionApi);

import { components } from "https://designstem.github.io/fachwerk/fachwerk.js";
import { useMonaco } from "./hooks/useMonaco.js";

for (const name in components) {
  Vue.component(name, components[name]);
}

Vue.prototype.$global = new Vue({ data: { state: {} } });

new Vue({
  setup() {
    const { editorNode, content } = useMonaco("yea");
    // const editorNode = ref(null);
    // const content = ref("<f-scene></f-scene>");
    // onMounted(() => {
    //   monaco.languages.registerCompletionItemProvider("html", {
    //     provideCompletionItems
    //   });
    //   monaco.languages.registerHoverProvider("html", { provideHover });
    //   const editor = monaco.editor.create(editorNode.value, {
    //     value: content.value,
    //     language: "html",
    //     theme: "vs-dark",
    //     fontSize: "14px",
    //     wordWrap: "wordWrapColumn",
    //     wordWrapColumn: 65,
    //     minimap: {
    //       enabled: false
    //     }
    //   });
    //   const model = editor.getModel();
    //   model.updateOptions({ tabSize: 2 });

    //   editor.onDidChangeModelContent(e => {
    //     content.value = editor.getValue();
    //   });
    // });
    return { editorNode, content };
  },
  template: `
  <div style="display: flex; height: 100vh;">
      <div ref="editorNode" style="flex: 1;" />
      <f-content style="flex: 1;" :content="content" />
  </div>
  `
}).$mount("#app");
