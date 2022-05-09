<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CreateItemForm></CreateItemForm>
  </div>
</template>
<script>
import CreateItemForm from "../components/CreateItemForm.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {
    CreateItemForm
},
};
</script>
