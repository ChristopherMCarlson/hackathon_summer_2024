<template>
    <v-container>
        <v-row class="justify-center mt-5" v-if="!viewStatsScreen">
            <v-col cols="3" v-for="monster in activeTeam" :key="monster.uniqueId">
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
                            <v-btn width="80%" @click="viewStats(monster)">View Stats</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="viewStatsScreen">
            <v-col cols="6" class="text-center">
                <h3>{{ activeMonster.name }}</h3>
                <v-img :src="require(`@/assets/monsters/${activeMonster.image}.png`)" />
            </v-col>
            <v-col cols="6">
                <p>HP: {{ activeMonster.calculatedStats.hp }}</p>
                <p>Attack: {{ activeMonster.calculatedStats.attack }}</p>
                <p>Defense: {{ activeMonster.calculatedStats.defense }}</p>
                <p>Speed: {{ activeMonster.calculatedStats.speed }}</p>
            </v-col>
            <v-col cols="12" class="text-center">
                <v-btn @click="viewStatsScreen = false">Close</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'ActiveTeamComponent',
        data: () => ({
            activeMonster: null,
            viewStatsScreen: false
        }),
        methods: {
            viewStats(monster) {
                this.viewStatsScreen = true;
                this.activeMonster = monster;
            }
        },
        computed: {
            activeTeam() {
                return this.$store.state.playerMonstersTeam;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>