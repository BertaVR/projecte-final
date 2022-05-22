<template>
    <div class="pantalla-de-packs">
        <div class="filtros">
            <v-text-field append-icon="search" label="Nombre" single-line hide-details @change="filtrarNombre">
            </v-text-field>
            <v-select multiple chips @change="filtrarCalidad" :items="this.calidades" label="Calidad"></v-select>
            <v-autocomplete ref="filtroItems" @change="filtrarContieneItems" :items="inventarioItems" dense chips
                label="Items" multiple></v-autocomplete>
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
            inventarioItems: [],
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
        }, a() { console.log(this.filtroPacks(this.packs, this.queryFiltro)) }
    },
    methods: {
        filtroPacks(packs, query) {

            return packs.filter(function (pack) {
                let filtradoPorNombre = pack.nombre.toLowerCase().includes(query.queryNombre.toLowerCase());
                console.log(query.queryContieneItems)
                const filtradoPorItems = query.queryContieneItems.every((i) => pack.items.map(i => i.nombre).includes(i))
                const filtradoPorCalidad = (query.queryCalidad.length) ? query.queryCalidad.map(x => x.toLowerCase()).includes(pack.calidad.toLowerCase()) : true;
                return (filtradoPorItems);

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

.filtros {}
</style>