<template>
    <div class="packs">
        <div v-for="pack in packs" :key="pack.nombre" :actualizar="inventarioPacks()">
            <PackCard :objeto=pack></PackCard>
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
        };
    },
    mounted() { this.inventarioPacks(); },
    methods: {
        async inventarioPacks() {
            try {
                const packs = await axios.get(`http://${this.serverip}/packs`);
                this.packs = packs.data;
            }
            catch (e) {
                console.log(e);
            }
        }
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