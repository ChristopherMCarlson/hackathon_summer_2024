<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-list style="overflow-y: auto; max-height: 90vh;">
                    <v-list-item
                    v-for="monster in monsters"
                    :key="monster.name"
                    @click="activeMonster = monster"
                    >
                    <v-list-item-title>{{ monster.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="10">
                <v-card v-if="activeMonster">
                    <v-card-title>{{ activeMonster.name }}</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-img :src="require(`@/assets/monsters/${activeMonster.name}.png`)" />
                            </v-col>
                            <v-col cols="6">
                                <p>{{ activeMonster.description }}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import monstersData from "@/assets/tables/monsters.json";

    export default {
        name: 'EncyclopediaComponent',
        
        data: () => ({
            monsters: monstersData,
            activeMonster: null,
        }),
    }
</script>

<style lang="scss" scoped>

</style>