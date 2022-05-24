<template>
    <v-row>
        <span id="iconoCarro" v-on:mouseleave="opacidadNormal()" v-on:mouseover="hoverColorIcon()"
            @click="recuperarObjetosEnCarro()" class="material-icons">shopping_cart</span>



        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title v-if="compra.length == 0">Vaya, parece que el carrito está vacío!</v-card-title>
                <v-list>
                    <v-list-item-group>
                        <v-list-item v-for="(item, i) in compra" :key="i">
                            <v-list-item-content>
                                {{ item.cantidadEnCarro }}x ̣{{ item.nombre }}
                            </v-list-item-content>
                            <v-list-item-content>
                                {{ (item.precio * item.cantidadEnCarro).toFixed(2) }}{{currency}}
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>

                    <v-list-item-group>
                        <v-spacer />
                        <v-list-item v-if="this.compra.length > 0">
                            <v-list-item-content>

                                <b> Total</b>
                            </v-list-item-content>
                            <v-list-item-content>

                                <b> {{ sumatorioPrecio }}{{currency}}</b>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>

                </v-list>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <div class="botones">

                        <v-btn color="warning" @click="dialog = false">
                            Volver a resultados
                        </v-btn>
                        <v-btn color="error" @click="vaciarCarro()">
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
        calcularSumatorio() {
            console.log()
            this.sumatorioPrecio = this.compra.reduce((cuenta, item) => cuenta + (item.cantidadEnCarro * item.precio), 0);
        },
        vaciarCarro() {
            localStorage.setItem("packsEnCarro", "")
            this.recuperarObjetosEnCarro()
        },

        recuperarObjetosEnCarro() {
            if (localStorage.getItem("packsEnCarro") != "") {
                this.compra = JSON.parse(localStorage.getItem("packsEnCarro"));
            } else { this.compra = [] }
            this.calcularSumatorio();
            this.dialog = true

        },
        hoverColorIcon() {
            document.getElementById('iconoCarro').style.opacity = "0.6";

        },
        opacidadNormal() {
            document.getElementById('iconoCarro').style.opacity = "1";

        }
    }
}
</script>
<style>
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
}
</style>