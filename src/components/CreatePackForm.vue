<template>
    <form>
        <v-text-field v-model="nombre" ref="nombre" :error-messages="nombreErrores" :counter="40" label="Nombre"
            required @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()"></v-text-field>
        <v-select v-model="itemsEnElPack" :items="items" label="Items" multiple chips
            hint="Seleccione los items que tiene el pack" persistent-hint></v-select>
        <!-- Pendiente añadir buscador por usabilidad-->

        <v-btn class="mr-4" @click="añadirPack()">
            añadir pack
        </v-btn>
        <v-btn @click="clear">
            reset
        </v-btn>
        <p v-if="errors.length">{{ errors[0] }}</p>

    </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        nombre: { required, minLength: minLength(3), maxLength: maxLength(40) },


    },

    data: () => ({
        nombre: '',
        materiales: ['normal', 'consumible', 'indestructible'],
        serverip: "127.0.0.1:3000",
        errors: [],
        itemsEnElPack: [],
        items: [],

    }),
    mounted() { this.getNombresItems() },

    computed: {

        nombreErrores() {
            const errors = []
            if (!this.$v.nombre.$dirty) return errors
            !this.$v.nombre.minLength && errors.push('El nombre debe tener por lo menos 3 caracteres')
            !this.$v.nombre.required && errors.push('El campo nombre es obligatorio.')
            !this.$v.nombre.maxLength && errors.push('El nombre no puede tener más de 40 caracteres.')

            return errors
        },

    },

    methods: {
        submit() {
            this.$v.$touch()
        },
        clear() {
            this.$v.$reset()
            this.nombre = ''
        },
        getNombresItems() {


            var miHeaders = new Headers();

            var miInit = {
                method: 'GET',
                headers: miHeaders,
                mode: 'cors',
                // cambiarlo a force-cache => carga del disco
                cache: 'default'
            };


            fetch(`http://${this.serverip}/items`, miInit)
                .then((response) => {
                    if (response.ok) {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        response.json().then((json) => {
                            console.log(json)

                            let nombres = json.map(item => item.nombre)
                            console.log(nombres)
                            this.items = nombres
                        }
                        )

                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        return []
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
        añadirPack() {
            let data = {
                nombre: this.nombre,
                items: this.items
                ,




            };

            fetch(`http://${this.serverip}/packs/add`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Response OK Status:", response.status);
                        console.log("Reponse OK status text:", response.statusText);

                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);

                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }


    },



}
</script>
<style>
form {
    margin: 10%
}
</style>