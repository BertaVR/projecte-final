<template>
    <v-dialog v-model="dialog" persistent max-width="800px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Editar
            </v-btn>
        </template>
        <v-card  height="550px">
            <v-card-title>
                <span class="text-h5">Editar {{ objeto.nombre }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field v-model="nombre" ref="nombre" :error-messages="nombreErrores" :counter="40"
                        label="Nombre" required @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()">{{ objeto.nombre
                        }}
                    </v-text-field>
                    <br>
                    <v-autocomplete v-model="itemsEnElPack" ref="itemsEnElPack" :error-messages="itemsErrores" required
                        @input="$v.itemsEnElPack.$touch()" @blur="$v.itemsEnElPack.$touch()" :items="items" dense chips
                        label="Items" multiple></v-autocomplete>
                    <v-btn class="mr-4" color="primary" @click="modificarPack()">
                        modificar pack
                    </v-btn>
                    <v-btn color="warning" @click="clear">
                        reset
                    </v-btn>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { objectToString } from '@vue/shared';
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'
import ModalCreatePack from './ModalCreatePack.vue'

export default {
    mixins: [validationMixin],
    validations: {
        nombre: { required, minLength: minLength(3), maxLength: maxLength(40) },
        itemsEnElPack: { required },

    },
    beforeMount: function () {
        this.nombre = this.objeto.nombre;
        this.itemsEnElPack = this.objeto.items.map(item => item.nombre);

    },
    data: () => ({
        dialog: false,
        nombre: "",
        materiales: ["normal", "consumible", "indestructible"],
        serverip: "127.0.0.1:3000",
        errors: [],
        itemsEnElPack: [],
        items: [],
    }),
    props: ['objeto'],
    mounted() { this.getNombresItems(); },
    computed: {
        nombreErrores() {
            const errors = [];
            if (!this.$v.nombre.$dirty)
                return errors;
            !this.$v.nombre.minLength && errors.push("El nombre debe tener por lo menos 3 caracteres");
            !this.$v.nombre.required && errors.push("El campo nombre es obligatorio.");
            !this.$v.nombre.maxLength && errors.push("El nombre no puede tener más de 40 caracteres.");
            return errors;
        },
        itemsErrores() {
            const errors = [];
            if (!this.$v.itemsEnElPack.$dirty)
                return errors;
            !this.$v.itemsEnElPack.required && errors.push(`Añada al menos un item`);

            return errors;
        }
    },
    methods: {
        submit() {
            this.$v.$touch();
        },
        clear() {
            this.$v.$reset();
            this.nombre = "";
        },
        getNombresItems() {
            var miHeaders = new Headers();
            var miInit = {
                method: "GET",
                headers: miHeaders,
                mode: "cors",
                // cambiarlo a force-cache => carga del disco
                cache: "default"
            };
            fetch(`http://${this.serverip}/items`, miInit)
                .then((response) => {
                    if (response.ok) {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        response.json().then((json) => {
                            console.log(json);
                            let nombres = json.map(item => item.nombre);
                            console.log(nombres);
                            this.items = nombres;
                        });
                    }
                    else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        return [];
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },

    },
    components: { ModalCreatePack }
}
</script>
<style>
form {
    margin: 10%
}
</style>