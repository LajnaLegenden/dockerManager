<template>
  <tr class="listItem">
    <td>{{this.id}}</td>
    <td>{{image.RepoTags[0]}}</td>
    <td>{{this.created}}</td>
    <td>{{this.size}}</td>
    <td>
      <button v-on:click="createAndStartContainer()">
        <i class="fas fa-plus"></i>
      </button>
    </td>
  </tr>
</template>

<script>
module.exports = {
  name: "imageListItem",
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    createAndStartContainer() {
      $.post({
        url: "/image/create",
        data: this.image.Config
      });
    }
  },
  computed: {
    size: function() {
      return this.formatBytes(this.image.Size);
    },
    created: function() {
      return new Date(this.image.Created).toUTCString();
    },
    id: function() {
      return this.image.Id.substring(7, this.image.Id.length - 8);
    }
  }
};
</script>

<style>
</style>