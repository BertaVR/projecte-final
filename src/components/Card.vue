<template>
  <v-card class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

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

      <v-btn color="blue" elevation="2">Editar</v-btn>
    </v-card-text>

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

<script>

</script>
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

export default {
      data: () => ({
      show: false,
    }),
 props: ['objeto']
}

</script>