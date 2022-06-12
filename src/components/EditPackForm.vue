<template>
<div>
    <v-dialog v-model="dialog" persistent max-width="800px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Editar
            </v-btn>
        </template>
        <v-card height="550px">
            <div class="top">
                <v-card-title>
                    <span class="text-h5">Editar {{ objeto.nombre }}</span>
                </v-card-title>
                <v-btn color="primary darken-1" text @click="dialog = false" id="cerrar">
                    Cerrar
                </v-btn>
            </div>
            <v-card-text>
                <v-container>
                    
                    <v-row class="fila">
                        <v-col>
                            <v-text-field v-model="nombre" ref="nombre" :error-messages="nombreErrores" :counter="40"
                                label="Nombre" required @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()">{{
                                        objeto.nombre
                                }}
                            </v-text-field>
                        </v-col>
                        <v-col class="boton">

                            <v-btn class="mr-4" color="primary" :disabled="$v.nombre.$anyError" @click="modificarNombre()">
                                modificar nombre
                            </v-btn>
                        </v-col>

                    </v-row>
                    <br>
                    <v-row class="fila">
                        <v-col>

                            <v-autocomplete v-model="itemsEnElPack" ref="itemsEnElPack" :error-messages="itemsErrores"
                                required @input="$v.itemsEnElPack.$touch()" @blur="$v.itemsEnElPack.$touch()"
                                :items="inventarioItems" dense chips label="Items" multiple></v-autocomplete>
                        </v-col>
                        <v-col class="boton">

                            <v-btn class="mr-4"  :disabled="$v.itemsEnElPack.$anyError" color="primary" @click="modificarItems()">
                                modificar items
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>


            </v-card-actions>
        </v-card>
      
    </v-dialog>
      <v-snackbar :color="snackbar.color" top multiline height="100" font-size="large" v-model="snackbar.show">
            <template v-slot:action="{ attrs }">
                {{ snackbar.message }}
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
        itemsEnElPack: { required },

    },
    beforeMount: function () {
        this.nombre = this.objeto.nombre;
        this.itemsEnElPack = this.objeto.items.map(item => item.nombre);

    },
    data: () => ({
        snackbar:{},
        dialog: false,
        nombre: "",
        materiales: ["normal", "consumible", "indestructible"],
        serverip: "127.0.0.1:3000",
        errors: [],
        itemsEnElPack: [],
        items: [],
    }),
    props: ['objeto', 'inventarioItems'],
    //mounted() { this.getNombresItems(); }, //evitar que llame a todos
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
        gestionErroresMessage(statusCode) { if (statusCode == 409) { return "Ya hay un pack con ese nombre" } }, //la gestión de errores me gustaría haberla hecho en back pero no he podidp

        submit() {
            this.$v.$touch();
        },
        clear() {
            this.$v.$reset();
            this.nombre = "";
        },
        modificarNombre() {
            let self = this;
            fetch(`http://${this.serverip}/packs/${self.objeto.nombre}/cambiarNombre/${this.nombre}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Response OK Status:", response.status);
                        console.log("Reponse OK status text:", response.statusText);
                        self.objeto.nombre = this.nombre //esta línea hace que puedas editar varias veces

                    } else {
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
        },

        modificarItems() {
            let self = this;
            let data = { items: this.itemsEnElPack }

            fetch(`http://${this.serverip}/packs/${self.objeto.nombre}/updateItems/`, {
                method: 'PUT',
                body: JSON.stringify(data),

                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Response OK Status:", response.status);
                        console.log("Reponse OK status text:", response.statusText);
                        self.objeto.nombre = this.nombre //esta línea hace que puedas editar varias veces
                         this.snackbar = {
                            message: "Items modificados",
                            color: 'success',
                            show: true,
                            status: 'error'
                        }

                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);

                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },


    },
}
</script>
<style>
form {
    margin: 10%
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}

div.boton {

    margin-top: 18px;

}

.fila {
    display: flex;
    align-items: flex-start;
    justify-items: space-around;
    padding: 10px;
}
</style>