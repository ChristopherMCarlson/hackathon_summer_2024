<template>
    <v-container>
        <v-row class="justify-center mt-5">
                    <v-col cols="2" v-for="monster in activeTeam" :key="monster.uniqueId">
                        <v-card>
                            <v-row class="justify-center">
                                <v-col cols="12" class="text-center">
                                    <h3>{{ monster.name }}</h3>
                                </v-col>
                                <v-col cols="12">
                                    <v-img :src="require(`@/assets/monsters/${monster.image}.png`)" />
                                </v-col>
                                <v-col cols="6" class="text-center">
                                    <v-btn width="80%" @click="selectMonster(monster)">Replace</v-btn>
                                </v-col>
                                <v-col cols="6" class="text-center">
                                    <v-btn width="80%" @click="selectMonster(monster)">Store</v-btn>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn width="80%" @click="selectMonster(monster)">View Stats</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'ActiveTeamComponent',
        computed: {
            activeTeam() {
                return this.$store.state.playerMonstersTeam;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>