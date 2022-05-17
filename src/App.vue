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
        secondary: '#b0bec5',
        warning: '#F1C40F',
        error: '#E74C3C',
        accent:  '#511863',
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
