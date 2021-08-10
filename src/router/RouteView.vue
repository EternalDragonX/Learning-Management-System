<script>
export default {
  name: "RouteView",
  props: {
    keepAlive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  render() {
    const { $route: { meta } } = this;

    const inKeep = (
        <router-view />
    );

    return inKeep;
  }
};
</script>
