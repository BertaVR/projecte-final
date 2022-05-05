<template>
    <form>
        <v-text-field v-model="nombre" :error-messages="nombreErrores" :counter="10" label="Nombre" required
            @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()"></v-text-field>
        <v-text-field v-model="precio" :error-messages="precioErrores" label="Precio" type="number" required
            @input="$v.precio.$touch()" @blur="$v.precio.$touch()"></v-text-field>
        <v-text-field v-model="calidad" :error-messages="calidadErrores" label="Calidad" type="number" required
            @input="$v.calidad.$touch()" @blur="$v.calidad.$touch()"></v-text-field>
        <v-text-field v-model="demanda" :error-messages="demandaErrores" label="Demanda" type="number" required
            @input="$v.demanda.$touch()" @blur="$v.demanda.$touch()"></v-text-field>
        <div>Selecciona un tipo de material:
            <v-radio-group v-model="material" row>
                <v-radio v-for="material in materiales" :key="material"
                    :label="` ${material.charAt(0).toUpperCase() + material.slice(1)}`" :value="material"></v-radio>
            </v-radio-group>
        </div>
        <v-btn class="mr-4" @click="submit">
            añadir item
        </v-btn>
        <v-btn @click="clear">
            reset
        </v-btn>
    </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, decimal, alphaNum, integer, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
        nombre: { required, minLength: minLength(3), alphaNum },
        precio: { required, decimal, minValue: minValue(0) },
        calidad: { required, integer, minValue: minValue(0), maxValue: maxValue(50) },
        demanda: { required, integer, minValue: minValue(0), maxValue: maxValue(100) },
        

    },

    data: () => ({
        nombre: '',
        precio: '',
        calidad: '',
        demanda: '',
        material: 'normal',
        materiales: ['normal', 'consumible', 'indestructible']

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
            !this.$v.precio.decimal && errors.push('El campo precio tiene que ser un número entero o decimal.')
            !this.$v.precio.required && errors.push('Es necesario colocar un precio.')
            !this.$v.calidad.minValue && errors.push('El precio no puede ser menor a 0.')


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
        }
    },

    methods: {
        submit() {
            this.$v.$touch()
        },
        clear() {
            this.$v.$reset()
            this.nombre = ''
            this.precio = ''
            this.calidad = ''
            this.demanda = ''



        },
    },
}
</script>