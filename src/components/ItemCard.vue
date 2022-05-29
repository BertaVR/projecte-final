<template>
  <v-card class="mx-auto my-12 itemCard" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" src="https://imborrable.com/wp-content/uploads/2021/04/fotos-gratis-de-stock-1.jpg"></v-img>

    <v-card-title id="titulo">{{ objeto.nombre
    }}</v-card-title>

    <v-card-text>

      <div id="price">
        <div id="amount">
          {{ objeto.precio }}
        </div>
        <div id="currency">
          {{ this.currency }}
        </div>

      </div>
      <div id="calidad">Calidad: {{ objeto.calidad }}</div>
      <div id="demanda">Demanda: {{ objeto.demanda }}</div>
      <div id="material">Material: {{ objeto.material }}</div>
      <div id="stock">Stock: {{ objeto.stock }}</div>
    </v-card-text>

  </v-card>
</template>
<script>

export default {
  data: () => ({

    serverip: "127.0.0.1:3000",
    packs: [],
    show: false,
    currency: '€'

  }),
  props: ['objeto'],
  /* Esto me servirá cuando implemente borrar item
  
  methods: {
     async inventarioPacks() { // TODO: Esto hay que refactorizarlo ya que es codigo repetido -> Hay que cogerlo del padre
       try {
         const packs = await axios.get(`http://${this.serverip}/items`);
         this.items = items.data;
       }
       catch (e) {
         console.log(e);
       }
     }
   },*/



}

</script>