<template>
  <div id="imageList" class="lists">
    <table>
      <tr>
        <th>ID</th>
        <th>TAG</th>
        <th>Created</th>
        <th>Size</th>
      </tr>
      <image-list-item v-for="item in images" v-bind:key="item.id" :image="item"></image-list-item>
    </table>
  </div>
</template>

<script>
module.exports = {
  name: "ImageList",
  data() {
    return {};
  },
  props: {
    images: {
      type: Array
    }
  },
  methods: {},
  mounted() {
    app.imageList = this;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
