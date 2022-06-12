<template>
  <div>
    <Header></Header>
    <CreateItemForm></CreateItemForm>
    <Items></Items>

    <template>
      <v-footer  padless>
        <v-row justify="center" no-gutters>
          <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
            {{ link }}
          </v-btn>
          <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
          </v-col>
        </v-row>
      </v-footer>
    </template>
  </div>

</template>
<script>
import Items from "../components/Items.vue";
import Header from "../components/Header.vue";
import CreateItemForm from "../components/CreateItemForm.vue";
// @ is an alias to /src

export default {
  name: "About",
  components: {
    Header,
    Items,
    CreateItemForm
  },
};
</script>
