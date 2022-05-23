<template>
    <div class="añadir.carro">
        <v-btn color="accent" @click="añadirAlCarro(objeto)"> <img id="iconoAñadirACarro" src="../assets/add-cart.png">
        </v-btn>
        <v-snackbar v-model="snackbar">
            {{ objeto.nombre }} añadido al carrito

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>



<script>


export default {
    data: () => ({


        packsEnCarro: [],
        snackbar: false,


    }),
    props: ['objeto'],

    methods: {
        recuperarPacksPrevios() {
            if (localStorage.getItem("packsEnCarro")) {
                this.packsEnCarro = JSON.parse(localStorage.getItem("packsEnCarro"));
            }

        },

        añadirAlCarro(pack) {

            this.snackbar = true

            this.recuperarPacksPrevios()
            this.packsEnCarro.push(pack)
            localStorage.setItem("packsEnCarro", JSON.stringify(this.packsEnCarro));
        },

    },




}


</script>

<style>
#iconoAñadirACarro {
    width: 28px;
    filter: brightness(0) invert(1);
}
</style>