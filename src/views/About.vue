<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CreatePackForm></CreatePackForm>
  </div>
</template>
<script>
import CreatePackForm from "../components/CreatePackForm.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {
    CreatePackForm
},
};
</script>
