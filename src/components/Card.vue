<template>
  <v-card  class="mx-auto my-12" max-width="374">
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
              <div id="items" v-for="item in objeto.items">
        <div>{{item.nombre}}</div>
        </div>
      <v-btn color="blue" elevation="2">Editar</v-btn>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>


      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
          sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
          add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
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
 props: ['objeto']
}

</script>