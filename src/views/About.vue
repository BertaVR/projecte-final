<template>
  <div>
<Header></Header>
    <Items></Items>
  </div>
</template>
<script>
import Items from "../components/Items.vue";
import Header from "../components/Header.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {
    Header,
    Items,
},
};
</script>
