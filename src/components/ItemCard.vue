<template>
  <v-card class="mx-auto my-12 itemCard" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"></v-img>

    <v-card-title id="titulo">Holi</v-card-title>

    <v-card-text>

      <div id="price">
        <div id="amount">
           20
        </div>
        <div id="currency">
          €
        </div>

      </div>
    </v-card-text>

      
    <v-card-actions>

      <v-btn color="primary" elevation="2">Editar</v-btn>
      
      
          <v-btn color="error" elevation="2">Borrar</v-btn>

      </v-card-actions>

      
  </v-card>
</template>
