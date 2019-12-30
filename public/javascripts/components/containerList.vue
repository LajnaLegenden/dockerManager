<template>
  <div id="containerList" class="lists">
    <table>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <span>
        <container-list-item v-for="item in containers" v-bind:key="item.id" :container="item"></container-list-item>
      </span>
    </table>
  </div>
</template>

<script>
module.exports = {
  name: "ContainerList",
  data() {
    return {};
  },
  props: {
    containers: {
      type: Array
    }
  },
  methods: {},
  mounted() {
    app.containerList = this;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
