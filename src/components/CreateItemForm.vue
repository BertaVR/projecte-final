<template>
    <div clasS="createItem">

        <form>
            <v-text-field v-model="nombre" ref="nombre" :error-messages="nombreErrores" :counter="40" label="Nombre"
                required @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()"></v-text-field>
            <v-text-field v-model="precio" ref="precio" :error-messages="precioErrores" label="Precio" type="number"
                required @input="$v.precio.$touch()" @blur="$v.precio.$touch()"></v-text-field>
            <v-text-field v-model="calidad" ref="calidad" :error-messages="calidadErrores" label="Calidad" type="number"
                required @input="$v.calidad.$touch()" @blur="$v.calidad.$touch()"></v-text-field>
            <v-text-field v-model="demanda" ref="demanda" :error-messages="demandaErrores" label="Demanda" type="number"
                required @input="$v.demanda.$touch()" @blur="$v.demanda.$touch()"></v-text-field>
            <v-text-field v-model="stock" ref="stock" :error-messages="stockErrores" label="Stock" type="number"
                required @input="$v.stock.$touch()" @blur="$v.stock.$touch()"></v-text-field>
            <div>Selecciona un tipo de material:
                <v-radio-group v-model="material" ref="material" row>
                    <v-radio v-for="material in materiales" :key="material" :label="capitalizar(material)"
                        :value="material"></v-radio>
                </v-radio-group>
            </div>
            <v-btn class="mr-4" color="primary" @click="addItem()" :disabled="$v.$anyError || algunCampoEstaVacio()">
                añadir item
            </v-btn>

            <v-btn class="mr-4" color="warning" @click="clear">
                reset
            </v-btn>

        </form>
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
        precio: { required, decimal, minValue: minValue(0) },
        calidad: { required, integer, minValue: minValue(0), maxValue: maxValue(50) },
        demanda: { required, integer, minValue: minValue(0), maxValue: maxValue(100) },
        stock: { required, integer, minValue: minValue(1) }


    },

    data: () => ({
        snackbar: {
            show: false,
            message: null,
            color: null
        },
        nombre: '',
        precio: '',
        calidad: '',
        demanda: '',
        material: 'normal',
        stock: '',
        materiales: ['normal', 'consumible', 'indestructible'],
        serverip: "127.0.0.1:3000",
        errors: []


    }),

    computed: {

        nombreErrores() {
            const errors = []
            if (!this.$v.nombre.$dirty) return errors
            !this.$v.nombre.minLength && errors.push('El nombre debe tener por lo menos 3 caracteres')
            !this.$v.nombre.required && errors.push('El campo nombre es obligatorio.')
            !this.$v.nombre.maxLength && errors.push('El nombre no puede tener más de 40 caracteres.')

            return errors
        },
        precioErrores() {
            const errors = []
            if (!this.$v.precio.$dirty) return errors
            !this.$v.precio.decimal && errors.push('El campo precio tiene que ser un número entero o decimal.')
            !this.$v.precio.required && errors.push('Es necesario colocar un precio.')
            !this.$v.precio.minValue && errors.push('El precio no puede ser menor a 0.')


            return errors
        },
        calidadErrores() {
            const errors = []
            if (!this.$v.calidad.$dirty) return errors
            !this.$v.calidad.required && errors.push('Es necesario especificar la calidad.')
            !this.$v.calidad.integer && errors.push('La calidad tiene que ser un número entero.')
            !this.$v.calidad.minValue && errors.push('La calidad tiene que ser un número positivo.')
            !this.$v.calidad.maxValue && errors.push('La calidad no puede ser mayor que 50.')


            return errors
        },
        demandaErrores() {
            const errors = []
            if (!this.$v.demanda.$dirty) return errors
            !this.$v.demanda.required && errors.push('Es necesario especificar la demanda.')
            !this.$v.demanda.integer && errors.push('La demanda tiene que ser un número entero.')
            !this.$v.demanda.minValue && errors.push('La demanda tiene que ser un número positivo.')
            !this.$v.demanda.maxValue && errors.push('La demanda no puede ser mayor que 100.')


            return errors
        },
        stockErrores() {
            const errors = []
            if (!this.$v.stock.$dirty) return errors
            !this.$v.stock.required && errors.push('Es necesario especificar el stock.')
            !this.$v.stock.integer && errors.push('El stock tiene que ser un número entero.')
            !this.$v.stock.minValue && errors.push('El stock tiene que ser un número positivo.')


            return errors
        }
    },

    methods: {

        algunCampoEstaVacio() {
            return !this.nombre || !this.precio || !this.calidad || !this.stock || !this.demanda || !this.material
        },

        submit() {
            this.$v.$touch()
        },
        clear() {
            this.$v.$reset()
            this.nombre = ''
            this.precio = ''
            this.calidad = ''
            this.demanda = ''
            this.material = 'normal'
            this.stock = ''
            this.demanda = ''

        },
        capitalizar(p) {
            return p.charAt(0).toUpperCase() + p.slice(1)
        },
        gestionErroresMessage(statusCode) { if (statusCode == 409) { return "Ya hay un item con ese nombre" } }, //la gestión de errores me gustaría haberla hecho en back pero no he podidp
        addItem() {


            let data = {
                nombre: this.$refs.nombre.value,
                precio: this.$refs.precio.value,
                calidad: this.$refs.calidad.value,
                material: this.$refs.material.value,
                demanda: this.$refs.demanda.value,
                stock: this.$refs.stock.value,



            };

            fetch(`http://${this.serverip}/items/add`, {
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
                        this.snackbar = {
                            message: ` Item ${this.nombre} añadido con éxito`,
                            color: 'success',
                            show: true
                        }
                        this.clear()
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        this.snackbar = {
                            message: this.gestionErroresMessage(response.status),
                            color: 'error',
                            show: true
                        }


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
</style>