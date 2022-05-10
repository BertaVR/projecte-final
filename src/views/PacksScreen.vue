<template>
  <div class="packsSCreen">
<Header></Header>
<Packs></Packs>
</div>
</template>

<script>
import Packs from "../components/Packs.vue";
import Header from "../components/Header.vue";
// @ is an alias to /src

export default {
  name: "PacksScreen",
  components: {
    Packs,
    Header
},
};
</script>
<style>
Header:{
  width: 100%;
}
</style>