const { ref, watch } = window.vueCompositionApi;

export default {
  props: { value: { default: false }, title: { default: "" } },
  setup(props, { emit }) {
    const enabled = ref(props.value);
    watch(() => emit("input", enabled.value));
    return { enabled };
  },
  template: `
  <a class="quaternary" @click="enabled = !enabled">{{ enabled ? '🚀' : '🚴‍♀️' }} {{ title }}</a>
`
};
