<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
            max-width="500px"

    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
        >
        {{item.nombre}}
        </div>
      </template>
      <v-card class="mx-auto my-12 itemCard" max-width="500px">
    <template slot="progress">
      <v-progress-linear color="deep-purple" indeterminate></v-progress-linear>
    </template>

    <v-img height="300" src="https://imborrable.com/wp-content/uploads/2021/04/fotos-gratis-de-stock-1.jpg"></v-img>

    <v-card-title id="titulo">{{item.nombre}}</v-card-title>

    <v-card-text>

      <div id="price">
        <div id="amount">
            {{item.precio}}
         
        </div>
        <div id="currency">
            {{this.currency}}
        </div>

      </div>
      <div id="calidad">Calidad: {{item.calidad}}</div>
      <div id="demanda">Demanda: {{item.demanda}}</div>
      <div id="material">Material: {{item.mmaterial}}</div>
      <div id="stock">Stock: {{item.stock}} </div>
    </v-card-text>


    <v-card-actions>



   <v-btn color="primary darken-1" text @click="dialog = false" id="cerrar">
                    Cerrar
                </v-btn>










                
    </v-card-actions>


  </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      currency: '€'
      
    }),
    props:['item'],
  }
</script>