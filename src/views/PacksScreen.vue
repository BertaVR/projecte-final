<template>
  <div class="packsSCreen">
<Header></Header>
<CreatePackForm></CreatePackForm>
<Packs></Packs>
</div>
</template>

<script>
import Packs from "../components/Packs.vue";
import Header from "../components/Header.vue";
import CreatePackForm from "../components/CreatePackForm.vue";
// @ is an alias to /src

export default {
  name: "PacksScreen",
  components: {
    Packs,
    Header,
    CreatePackForm
},
};
</script>
<style>
Header:{
  width: 100%;
}
</style>