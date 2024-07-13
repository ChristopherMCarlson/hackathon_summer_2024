<template>
    <v-container>        
        <v-row class="justify-center">
            <v-col cols="12" class="text-center">
                <h1 class="titles">MONSTER RANCH</h1>
            </v-col>
            <v-col cols="6" class="text-center" v-if="introStep == 0">
                <p>Welcome to Monster Ranch! This is a simple game where you can explore the wilderness, gather resources, hunt monsters, and build a team to challenge stronger and stronger enemies! You can navigate the game using the buttons on the left side of the screen.</p>
            </v-col>
            <v-col cols="6" class="text-center" v-if="introStep == 1">
                <p>If you're going to succeed, you're going to need a monster to get you started. Take a moment to select one of the following to get you started!</p>
            </v-col>
            <v-col cols="12" class="text-center" v-if="introStep == 1">
                <v-row class="justify-center">
                    <v-col cols="4" v-for="monster in filteredMonsters" :key="monster.id">
                        <v-card>
                            <v-row class="justify-center">
                                <v-col cols="12" class="text-center">
                                    <h3>{{ monster.name }}</h3>
                                </v-col>
                                <v-col cols="12">
                                    <v-img :src="require(`@/assets/monsters/${monster.image}.png`)" />
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn @click="selectMonster(monster)">Select</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" class="text-center" v-if="introStep == 2">
                <p>Great choice! Now that you have a monster, you can explore the wilderness. You can gather resources to build up your inventory, or hunt monsters to build up your team. Good luck!</p>
            </v-col>
            <v-col cols="12" class="text-center" v-if="introStep != 1">
                <v-btn @click="progressIntro()">Next</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import monsters from '@/assets/tables/monsters.json'
    export default {
        name: 'IntroComponent',
        data: () => ({
            introStep: 0,
            monsterData: monsters,
            selectedMonsterIds: [1, 2, 3]
        }),
        methods: {
            selectMonster(monster) {
                let selectedMonster = JSON.parse(JSON.stringify(monster));
                selectedMonster.uniqueId = this.generateGuid();
                selectedMonster.level = 1;
                this.$store.commit('captureMonster', selectedMonster);
                this.introStep++;
            },
            generateGuid() {
                const s4 = () => {
                    return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                };
                return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
            },
            progressIntro() {
                if(this.introStep < 2){
                    this.introStep++;
                } else {
                    this.$store.commit('completeIntro', true);
                }
            }
        },
        computed: {
        filteredMonsters() {
            return this.monsterData.filter(monster => 
                this.selectedMonsterIds.includes(monster.id)
            );
        }
    }
    }
</script>

<style>
  @font-face {
    font-family: 'Karmatic Arcade';
    src: url('~@/assets/ka1.ttf') format('truetype');
  }

  .titles {
    font-family: 'Karmatic Arcade', sans-serif;
    color: #00FFFF;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>