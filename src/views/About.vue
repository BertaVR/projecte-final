<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Items></Items>
  </div>
</template>
<script>
import Items from "../components/Items.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {

    Items
},
};
</script>
