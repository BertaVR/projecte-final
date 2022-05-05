<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CreateForm></CreateForm>
  </div>
</template>
<script>
import CreateForm from "../components/CreateForm.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {
    CreateForm
},
};
</script>
