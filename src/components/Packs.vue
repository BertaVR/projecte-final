<template>
    <div class="pantalla-de-packs">
        <div class="filtros">
            <v-text-field append-icon="search" label="Nombre" single-line hide-details @change="filtrarNombre">
            </v-text-field>
            <v-select multiple chips @change="filtrarCalidad" :items="this.calidades" label="Calidad"></v-select>
            <v-autocomplete class="auto" ref="filtroItems" @change="filtrarContieneItems" :items="inventarioItems" dense
                chips label="Items" multiple></v-autocomplete>
            <v-range-slider class="precio" ref="precio" label="Precio" persistent-hint hint="Seleccione un rango"
                v-model="rangoPrecio" :max="precioMax" :min="precioMin" @click="hacerThumbLabelVisible()"
                :thumb-label="thumbVisible"></v-range-slider>
        </div>
        <div class="packs">

            <div v-for="pack in this.resultadosFiltrados" :key="pack.nombre">
                <PackCard :inventarioItems=inventarioItems :objeto=pack></PackCard>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import PackCard from './PackCard.vue';
export default {
    data() {
        return {
            serverip: "127.0.0.1:3000",
            calidades: ['Basic', 'Standard', 'Premium'],
            packs: [],
            precioMax: 300,
            precioMin: 3,
            thumbVisible: 'true',
            inventarioItems: [],
            rangoPrecio: [0, 99999],
            queryFiltro: {
                queryContieneItems: [],
                queryCalidad: [],
                queryNombre: "",
            },
        };
    },
    mounted() { this.inventarioPacks(); this.getNombresItems(); },
    computed: {
        resultadosFiltrados() {
            return this.filtroPacks(this.packs, this.queryFiltro);
        },
    },
    methods: {
        hacerThumbLabelVisible() {
            this.thumbVisible = 'always';

        },
        getPrecioMax() {
            let setDePrecios = new Set(this.packs.map(x => Math.round(x.precio)));
            this.precioMax = Math.max(...setDePrecios)
            this.rangoPrecio[1] = this.precioMax

        },
        getPrecioMin() {
            let setDePrecios = new Set(this.packs.map(x => Math.round(x.precio)));
            this.precioMin = Math.min(...setDePrecios)
            this.rangoPrecio[0] = this.precioMin

        },
        filtroPacks(packs, query) {

            return packs.filter(function (pack) {
                let filtradoPorNombre = pack.nombre.toLowerCase().includes(query.queryNombre.toLowerCase());
                const filtradoPorItems = query.queryContieneItems.every((i) => pack.items.map(i => i.nombre).includes(i))
                const filtradoPorCalidad = (query.queryCalidad.length) ? query.queryCalidad.map(x => x.toLowerCase()).includes(pack.calidad.toLowerCase()) : true;
                return (filtradoPorItems && filtradoPorNombre && filtradoPorCalidad);

            })
        },

        filtrarContieneItems(val) {
            this.queryFiltro.queryContieneItems = val
        },
        filtrarCalidad(val) {
            this.queryFiltro.queryCalidad = val
        },
        filtrarNombre(val) {
            this.queryFiltro.queryNombre = val;
        },
        async inventarioPacks() {
            try {
                const packs = await axios.get(`http://${this.serverip}/packs`);
                this.packs = packs.data;
                this.getPrecioMax();
                this.getPrecioMin();

            }
            catch (e) {
                console.log(e);
            }
        }, getNombresItems() {
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
                            this.inventarioItems = nombres;
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



    components: { PackCard }
}
</script>
<style>
.pantalla-de-packs {
    margin: 20px;
}

.packs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.filtros .auto {
    margin-top: 0px;
}

.precio {
    margin-top: 20px;
}
</style>