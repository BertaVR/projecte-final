<template>
  <v-card class="mx-auto my-12 packCard" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250"
      src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"></v-img>

    <v-card-title id="titulo">{{ objeto.nombre }}</v-card-title>

    <v-card-text>

      <div id="price">
        <div id="amount">
          {{ objeto.precio }}
        </div>
        <div id="currency">
          €
        </div>

      </div>

      <div id="calidad">Calidad: {{ objeto.calidad }}</div>
      <div id="stock">Stock: {{ objeto.stock }}</div>

    </v-card-text>
    <v-card-actions class="botones">

      <EditPackForm :inventarioItems=inventarioItems :objeto=objeto></EditPackForm>

      <v-btn color="error" elevation="2" @click="borrarPack(objeto)">Borrar</v-btn>

    </v-card-actions>

    <v-card-actions>


      <v-spacer></v-spacer>
      <div @click="show = !show">{{ show ? 'Ocultar items' : 'Ver Items' }}</div>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <div id="items" v-for="item in objeto.items">
            <div>{{ item.nombre }}</div>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>



<style>
#price {
  display: flex;
  color: rgb(1, 8, 24);
  font-size: larger;
}

#amount {
  font-weight: 500;

}
</style>
<script>
import EditPackForm from "./EditPackForm.vue";

export default {
  components: { EditPackForm },
  data: () => ({

    serverip: "127.0.0.1:3000",
    packs: [],
    show: false,


  }),
  props: ['objeto', 'inventarioItems'],
  methods: {

    async inventarioPacks() { // TODO: Esto hay que refactorizarlo ya que es codigo repetido -> Hay que cogerlo del padre
      try {
        const packs = await axios.get(`http://${this.serverip}/packs`);
        this.packs = packs.data;
      }
      catch (e) {
        console.log(e);
      }
    },
    borrarPack(pack) {
      fetch(`http://${this.serverip}/packs/${pack.nombre}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.ok) {
            console.log("Response OK Status:", response.status);
            console.log("Item borrado:", response.statusText);
            this.inventarioPacks();
          } else {
            console.log("Response Status:", response.status);
            console.log("Reponse statuts text:", response.statusText);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
    },
  },




}

</script>