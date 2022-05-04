<template>
    <form>
        <v-text-field v-model="nombre" :error-messages="nombreErrores" :counter="10" label="Nombre" required
            @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()"></v-text-field>
        <v-text-field v-model="precio" :error-messages="precioErrores" label="Precio" type="number" required
            @input="$v.precio.$touch()" @blur="$v.precio.$touch()"></v-text-field>
                <v-text-field v-model="calidad" :error-messages="precioErrores" label="Calidad" type="number" required
            @input="$v.calidad.$touch()" @blur="$v.calidad.$touch()"></v-text-field>

        <v-btn class="mr-4" @click="submit">
            submit
        </v-btn>
        <v-btn @click="clear">
            reset
        </v-btn>
    </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal, alphaNum } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        nombre: { required, minLength: minLength(3), alphaNum },
        precio: { required, decimal },
        select: { required },
        checkbox: {
            checked(val) {
                return val
            },
        },
    },

    data: () => ({
        nombre: '',
        precio: '',

    }),

    computed: {
        
        nombreErrores() {
            const errors = []
            if (!this.$v.nombre.$dirty) return errors
            !this.$v.nombre.minLength && errors.push('El nombre debe tener por lo menos 3 caracteres')
            !this.$v.nombre.required && errors.push('El campo nombre es obligatorio.')
            !this.$v.nombre.alphaNum && errors.push('Por favor, escriba únicamente letras y números para el nombre.')

            return errors
        },
        precioErrores() {
            const errors = []
            if (!this.$v.precio.$dirty) return errors
            !this.$v.precio.decimal && errors.push('El campo precio tiene que ser un número.')
            !this.$v.precio.required && errors.push('Es necesario colocar un precio.')

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
            this.precio = ''

        },
    },
}
</script>