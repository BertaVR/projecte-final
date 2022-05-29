<template>
    <v-row>
        <span id="iconoCarro" v-on:mouseleave="opacidadNormal()" v-on:mouseover="hoverColorIconoCarro()"
            @click="recuperarObjetosEnCarro()" class="material-icons">shopping_cart</span>



        <v-dialog v-model="dialog" max-width="600">
            <v-card>

                <div class="cerrar">
                    <v-btn color="primary darken-1" text @click="dialog = false" id="cerrar">
                        Cerrar
                    </v-btn>
                </div>
                <v-card-title v-if="compra.length == 0">Vaya, parece que el carrito está vacío!</v-card-title>
                <v-card-title v-else>Resumen del carrito:</v-card-title>
                <br>


                <v-list>
                    <v-list-item v-for="(item, i) in compra" :key="i">
                        <v-list-item-content>
                            {{ item.cantidadEnCarro }}x ̣{{ item.nombre }}
                        </v-list-item-content>
                        <v-list-item-content>
                            {{ (item.precio * item.cantidadEnCarro).toFixed(2) }}{{ currency }}
                        </v-list-item-content>
                        <div class="quantity">
                            <v-icon id="menos" large color="primary" @click="disminuirCantidad(item)" >
                                mdi-minus-circle
                            </v-icon>
                            <v-icon id="mas" large color="primary" @click="aumentarCantidad(item)">
                                mdi-plus-circle
                            </v-icon> 
                        </div>

                               <v-icon  color="error" @click="borrarDelCarro(item)">
                                mdi-delete
                            </v-icon> 

                    </v-list-item>

                    <v-list-item-group>
                        <br>
                        <v-list-item v-if="compra.length > 0">
                            <v-list-item-content>

                                <b> Total</b>
                            </v-list-item-content>

                            <v-list-item-content>

                                <b> {{ sumatorioPrecio.toFixed(2) }}{{ currency }}</b>
                            </v-list-item-content>

                        </v-list-item>

                    </v-list-item-group>

                </v-list>
                <v-card-actions>
                    <v-spacer></v-spacer>


                    <div class="botones">

                        <v-btn color="error" @click="vaciarCarro()"   :disabled="this.compra.length<1 ? '' : disabled"
>
                            Vaciar el carrito
                        </v-btn>

                        <v-btn color="primary" @click="dialog = false">
                            Ir al checkout
                        </v-btn>
                    </div>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>

export default {

    data() {
        return {
            dialog: false,
            currency: "€",
            compra: [],
            sumatorioPrecio: 0,
        }
    },
    methods: {
        borrarDelCarro(itemABorrar) {
            const borrar = this.compra.find(item => item._id === itemABorrar._id);
            borrar.cantidadEnCarro = 0
            localStorage.setItem('packsEnCarro', JSON.stringify(this.compra));
            this.recuperarObjetosEnCarro()
        },
        calcularSumatorio() {
            this.sumatorioPrecio = this.compra.reduce((cuenta, item) => cuenta + (item.cantidadEnCarro * item.precio), 0);
        },
        vaciarCarro() {
            localStorage.setItem("packsEnCarro", "[]")
            this.recuperarObjetosEnCarro()
        },

        recuperarObjetosEnCarro() {
            if (localStorage.getItem("packsEnCarro") != "") {
                this.compra = JSON.parse(localStorage.getItem("packsEnCarro")).filter((item)=> item.cantidadEnCarro>0);
            } else { this.compra = [] }
            this.calcularSumatorio();
            this.dialog = true

        },
        hoverColorIconoCarro() {
            document.getElementById('iconoCarro').style.opacity = "0.6";

        },
        opacidadNormal() {
            document.getElementById('iconoCarro').style.opacity = "1";

        },
        aumentarCantidad(itemAIncrementar) {
            const incrementar = this.compra.find(item => item._id === itemAIncrementar._id);
            console.log(incrementar)
            incrementar.cantidadEnCarro += 1
            localStorage.setItem('packsEnCarro', JSON.stringify(this.compra));
            this.recuperarObjetosEnCarro();

        },
        disminuirCantidad(itemADisminuir) {
            const incrementar = this.compra.find(item => item._id === itemADisminuir._id);
            console.log(incrementar)
            incrementar.cantidadEnCarro -= 1
            localStorage.setItem('packsEnCarro', JSON.stringify(this.compra));
            this.recuperarObjetosEnCarro();

        }
    }
}
</script>
<style>
#borrarDeCarro {
    color: red;
}

#iconoCarro {
    margin-left: 20px;
    margin-top: 28px;
    width: 28px;
    filter: brightness(0) invert(1);
}

#cantidad {
    max-width: 100px;
}

.botones {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
}

#volver {
    padding-top: 10px;
    color: blue
}

.cerrar {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
}
</style>