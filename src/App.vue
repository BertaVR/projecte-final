<template>
  <v-app>
    

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#8E44AD',
        warning: '#8f8fff',
        error: '#f05666',
        secondary:  '#511863',
      },
    },
  },
})
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
