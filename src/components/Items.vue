<template>
    <div class="items">
        <div v-for="item in items" :key="item.nombre">
            <ItemCard :objeto=item></ItemCard>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ItemCard from './ItemCard.vue'
export default {
    data() {
        return {
            serverip: "127.0.0.1:3000",
            items: [],
        };
    },
    mounted() { this.inventarioItems(); },
    methods: {
        async inventarioItems() {
            try {
                const items = await axios.get(`http://${this.serverip}/items`);
                this.items = items.data;
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