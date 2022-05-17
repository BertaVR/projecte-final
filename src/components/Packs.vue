<template>
    <div class="packs">
        <div v-for="pack in packs" :key="pack.nombre">
            <PackCard :inventarioItems=inventarioItems :objeto=pack></PackCard>
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
        };
    },
    mounted() { this.inventarioPacks(); this.getNombresItems() },
    methods: {
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
.packs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 20px;
}
</style>