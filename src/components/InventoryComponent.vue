<template>
    <v-container>
        <v-row v-if="playerResourceInventory.length > 0">
            <v-col cols="2" v-for="item in playerResourceInventory" :key="item.id">
                <v-card>
                    <v-card-title>{{ resources.find(x => x.id == item.id).name }}</v-card-title>
                    <v-card-subtitle>{{ item.quantity }}</v-card-subtitle>
                    <v-img :src="require(`@/assets/resources/${convertToCamelCase(resources.find(x => x.id == item.id).name)}.png`)" />
                    <!-- <v-btn color="error" text>Drop</v-btn> -->
                </v-card>
            </v-col>
            <v-col cols="2" v-for="item in playerItemInventory" :key="item.id">
                <v-card>
                    <v-card-title>{{ items.find(x => x.id == item.id).name }}</v-card-title>
                    <v-card-subtitle>{{ item.quantity }}</v-card-subtitle>
                    <v-img :src="require(`@/assets/items/${convertToCamelCase(items.find(x => x.id == item.id).name)}.png`)" />
                    <!-- <v-btn color="error" text>Drop</v-btn> -->
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12" class="text-center mt-5">
                <h1>Your inventory is empty.</h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import resourcesData from "@/assets/tables/resources.json";
    import itemsData from "@/assets/tables/items.json";

    export default {
        name: 'InventoryComponent',
        data: () => ({
            resources: resourcesData,
            items: itemsData
        }),
        methods: {
            convertToCamelCase(str) {
                return str.split(/[^a-zA-Z0-9]/g).map((x, index) => {
                    if (index === 0) return x.toLowerCase()
                    return x.substr(0, 1).toUpperCase() + x.substr(1).toLowerCase()
                }).join('')
            },
        },
        computed: {
            playerResourceInventory() {
                return this.$store.state.playerResourceInventory;
            },
            playerItemInventory() {
                return this.$store.state.playerItemInventory;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>