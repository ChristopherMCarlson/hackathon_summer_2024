<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-btn color="blue">Manage Base</v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn color="blue">Manage Monsters</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'HomeComponent',
    }
</script>

<style lang="scss" scoped>
    .icon-img {
        width: 100px;
        height: 100px;
    }
</style>