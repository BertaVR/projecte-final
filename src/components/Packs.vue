<template>
    <div class="pantalla-de-packs">
        <div class="filtros">  
        <v-flex xs4>
          <v-text-field append-icon="search" label="Nombre" single-line hide-details @change="buscarNombre">
            </v-text-field>
        </v-flex>
        </div>
        <div class="packs">

            <div v-for="pack in this.resultadosFiltrados" :key="pack.nombre">
                <PackCard :inventarioItems=inventarioItems :objeto=pack></PackCard>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import PackCard from './PackCard.vue'
export default {
    data() {
        return {
            serverip: "127.0.0.1:3000",
            packs: [],
            inventarioItems: [],
            queryFiltro: {

                queryNombre: "",
            },
        };
    },
    mounted() { this.inventarioPacks(); this.getNombresItems() },
      computed: {
    resultadosFiltrados() {
      return this.filtroPacks(this.packs, this.queryFiltro);
    }
  },
    methods: {
        filtroPacks(arr, query) {
      return arr.filter(function(pack) {
        let filtradoPorNombre = pack.nombre.toLowerCase().includes(query.queryNombre.toLowerCase());
        return (filtradoPorNombre);
      })},
        buscarNombre(val) {
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
.filtros{margin:50px}
</style>