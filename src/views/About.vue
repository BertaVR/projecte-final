<template>
  <div>
    <Header></Header>
    <CreateItemForm></CreateItemForm>
    <Items></Items>

<Footer></Footer>
  </div>

</template>
<script>
import Items from "../components/Items.vue";
import Header from "../components/Header.vue";
import CreateItemForm from "../components/CreateItemForm.vue";
import Footer from "../components/Footer.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {
    Header,
    Items,
    CreateItemForm,
    Footer
},
};
</script>
