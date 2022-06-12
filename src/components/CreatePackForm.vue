<template>
    <div clasS="createPack">
        <form ref="addPackForm">
            <v-text-field v-model="nombre" ref="nombre" :error-messages="nombreErrores" :counter="40" label="Nombre"
                required @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()"></v-text-field>
            <br>
            <v-autocomplete v-model="itemsEnElPack" ref="itemsEnElPack" :error-messages="itemsErrores" required
                @input="$v.itemsEnElPack.$touch()" @blur="$v.itemsEnElPack.$touch()" :items="items" dense chips
                label="Items" multiple></v-autocomplete>

            <v-btn class="mr-4" color="primary" @click="añadirPack()" :disabled="$v.$anyError || algunCampoEstaVacio()">
                añadir pack
            </v-btn>
            <v-btn color="warning" @click="clear">
                reset
            </v-btn>


        </form>
        <v-snackbar :color="snackbar.color" top multiline height="100" font-size="large" v-model="snackbar.show">
            <template v-slot:action="{ attrs }">
                {{ snackbar.message }}

                <v-btn v-if="snackbar.status == 'exito'" text v-bind="attrs" @click="actualizar">
                    Actualizar
                </v-btn>
                <v-btn text v-bind="attrs" @click="snackbar.show = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
        nombre: { required, minLength: minLength(3), maxLength: maxLength(40) },
        itemsEnElPack: { minLength: minLength(1) },

    },
    data: () => ({
        snackbar: {
            show: false,
            message: null,
            color: null
        },
        nombre: "",
        materiales: ["normal", "consumible", "indestructible"],
        serverip: "127.0.0.1:3000",
        errors: [],
        itemsEnElPack: [],
        items: [],
    }),
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
            !this.itemsEnElPack.length > 0 && errors.push("El campo items debe tener por lo menos 1 elemento seleccionado");

            return errors;
        },


    },
    methods: {
        actualizar() {
            window.location.reload();
        },
        gestionErroresMessage(statusCode) { if (statusCode == 409) { return "Ya hay un pack con ese nombre" } }, //la gestión de errores me gustaría haberla hecho en back pero no he podidp

        algunCampoEstaVacio() {
            return !this.nombre || this.itemsEnElPack.length < 1
        },

        submit() {
            this.$v.$touch();
        },
        clear() {
            this.$v.$reset();
            this.nombre = "";
            this.itemsEnElPack = []
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
        añadirPack() {
            let data = {
                nombre: this.nombre,
                items: this.itemsEnElPack,
            };
            fetch(`http://${this.serverip}/packs/add`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Response OK Status:", response.status);
                        console.log("Reponse OK status text:", response.statusText);
                        // this.$refs['itemsEnElPack'].reset();
                        // this.itemsEnElPack = []
                        this.snackbar = {
                            message: ` ${data.nombre} añadido con éxito, actualice para verlo`,
                            color: 'success',
                            show: true,
                            status: 'exito'
                        }
                        this.clear()


                    }
                    else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        this.snackbar = {
                            message: this.gestionErroresMessage(response.status),
                            color: 'error',
                            show: true,
                            status: 'error'
                        }
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    },
    components: {}
}
</script>
<style>
form {
    margin: 10%
}
</style>