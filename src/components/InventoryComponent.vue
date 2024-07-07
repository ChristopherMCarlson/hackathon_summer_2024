<template>
    <v-row>
        <v-col cols="1">
            <v-card>
                <v-card-title>Wood</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-img src="@/assets/wood.png" />
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary">Use</v-btn>
                            <v-btn color="error">Drop</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="1">
            <v-card>
                <v-card-title>Granite</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-img src="@/assets/granite.png" />
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary">Use</v-btn>
                            <v-btn color="error">Drop</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="1" v-for="i in 20" :key="i">
            <v-card>
                <v-card-title>Item {{ i }}</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-img src="https://via.placeholder.com/100" />
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary">Use</v-btn>
                            <v-btn color="error">Drop</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'InventoryComponent',
    }
</script>

<style lang="scss" scoped>

</style>