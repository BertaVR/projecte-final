<template>
  <div class="packsSCreen">
<Header></Header>
<CreatePackForm></CreatePackForm>
<Packs></Packs>
<Foote ></Foote>
</div>
</template>

<script>
import Packs from "../components/Packs.vue";
import Header from "../components/Header.vue";
import CreatePackForm from "../components/CreatePackForm.vue";
import Footer from "../components/Footer.vue";
// @ is an alias to /src

export default {
  name: "PacksScreen",
  components: {
    Packs,
    Header,
    CreatePackForm,
    Footer
},
};
</script>
<style>
Header:{
  width: 100%;
}
</style>