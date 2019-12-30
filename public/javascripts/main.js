var Vue = require("vue/dist/vue.js");

Vue.component("main-nav", require("./components/Navbar.vue"));
Vue.component("container-list", require("./components/containerList.vue"));
Vue.component("image-list", require("./components/imageList.vue"));
Vue.component("imageListItem", require("./components/imageListItem.vue"));
Vue.component("containerListItem", require("./components/containerListItem.vue"));

const app = new Vue({
    el: "#app"
});