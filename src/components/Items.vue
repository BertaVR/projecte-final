
<template>
    <div class="pantallaItems">
        <v-btn class="tituloFiltros" color=" accent" @click="expand = !expand">
            <div>Filtrar</div>
            <v-btn icon>
                <v-icon>{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-btn>
        <v-expand-transition class="filtros">
            <div class="filtros" v-show="expand">
                <v-text-field append-icon="search" label="Nombre" single-line hide-details @change="filtrarNombre" />

                <v-range-slider class="precio" ref="precio" label="Precio" persistent-hint hint="Seleccione un rango"
                    v-model="queryFiltro.queryRangoPrecio" :max="precioMax" :min="precioMin" @change="filtrarPrecio"
                    @click="hacerThumbLabelVisible()" :thumb-label="thumbVisible" />

            </div>
        </v-expand-transition>

        <div class="items">
            <div v-for="item in this.resultadosFiltrados" :key="item.nombre">
                <ItemCard :objeto=item></ItemCard>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ItemCard from './ItemCard.vue'
export default {
    data() {
        return {
            expand: false,
            serverip: "127.0.0.1:3000",
            items: [],

            queryFiltro: {
                queryNombre: "",
                queryRangoPrecio: [0, 99999],

            },
            precioMin: 1,
            precioMax: 99999,
            thumbVisible: true,
        };
    },
    mounted() { this.inventarioItems(); },
    computed: {
        resultadosFiltrados() {
            return this.filtroItems(this.items, this.queryFiltro);
        },
    },
    methods: {
        getPrecioMax() {
            let setDePrecios = new Set(this.items.map(x => Math.round(x.precio)));
            this.precioMax = Math.max(...setDePrecios) + 1
            this.queryFiltro.queryRangoPrecio[1] = this.precioMax

        },
        getPrecioMin() {
            let setDePrecios = new Set(this.items.map(x => Math.round(x.precio)));
            this.precioMin = Math.min(...setDePrecios) - 1
            this.queryFiltro.queryRangoPrecio[0] = this.precioMin

        },
        filtroItems(items, query) {

            return items.filter(function (item) {
                const filtradoPorNombre = item.nombre.toLowerCase().includes(query.queryNombre.toLowerCase());
                const filtradoPrecioMin = item.precio >= (query.queryRangoPrecio[0])
                const filtradoPrecioMax = item.precio <= (query.queryRangoPrecio[1])

                return (filtradoPorNombre && filtradoPrecioMin && filtradoPrecioMax);

            })
        },
        hacerThumbLabelVisible() {
            this.thumbVisible = 'always';

        },
        filtrarPrecio(val) {
            this.queryFiltro.queryRangoPrecio = val

        },

        filtrarNombre(val) {
            this.queryFiltro.queryNombre = val;
        },
        async inventarioItems() {
            try {
                const items = await axios.get(`http://${this.serverip}/items`);
                this.items = items.data;
                this.getPrecioMin();
                this.getPrecioMax();

            }
            catch (e) {
                console.log(e);
            }
        }
    },
    components: { ItemCard }
}
</script>
<style>
.items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 20px;
}
</style>