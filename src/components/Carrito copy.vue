<template>
    <v-row>
        <span id="iconoCarro" v-on:mouseleave="opacidadNormal()" v-on:mouseover="hoverColorIcon()"
            @click="recuperarObjetosEnCarro()" class="material-icons">shopping_cart</span>



        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-list>
                    <v-list-item-group>
                        <v-list-item v-for="(item, i) in compra" :key="i">
                            <v-list-item-content>
                                ̣{{ item.nombre }}
                            </v-list-item-content>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.precio"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">
                        Disagree
                    </v-btn>

                    <v-btn color="green darken-1" text @click="dialog = false">
                        Agree
                    </v-btn>
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

            compra: [],
        }
    },
    methods: {
        recuperarObjetosEnCarro() {
            if (localStorage.getItem("packsEnCarro")) {
                this.compra = JSON.parse(localStorage.getItem("packsEnCarro"));
            }
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
</style>