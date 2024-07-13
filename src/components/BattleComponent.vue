<template>
    <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            <h1>{{ playerMonsters[0].name }}</h1>
                <h3>Level: {{ playerMonsters[0].level }}</h3>
                <v-img :src="require(`@/assets/monsters/${playerMonsters[0].image}.png`)" />
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
              class="pa-2"
            >
                <h1>{{ monster.name }}</h1>
                <h3>Level: {{ monster.level }}</h3>
                <v-img :src="require(`@/assets/monsters/${monster.image}.png`)" />
                <h3>HP:</h3>
                <v-progress-linear
                  :value="Math.floor((enemyCurrentHP/enemyStats.hp) * 100)"
                  color="green"
                  height="25"
                ></v-progress-linear>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
    import monstersData from "@/assets/tables/monsters.json";

    export default {
        name: 'BattleComponent',
        props: {
            monster: Object,
        },
        data: () => ({
            monsters: monstersData,
            enemyCurrentHP: 0
        }),
        computed: {
          playerMonsters() {
            return this.$store.state.playerMonstersTeam;
          },
          enemyStats(){
            let returnObj = {
              attack: Math.max(5, Math.floor((((Math.floor(Math.random() * 16)) + this.monster.stats.Attack * 2 / 4) * this.monster.level / 100 + 5))),
              defense: Math.max(5, Math.floor((((Math.floor(Math.random() * 16)) + this.monster.stats.Defense * 2 / 4) * this.monster.level / 100 + 5))),
              speed: Math.max(5, Math.floor((((Math.floor(Math.random() * 16)) + this.monster.stats.Speed * 2 / 4) * this.monster.level / 100 + 5))),
              hp: Math.max(11, Math.floor(((Math.floor(Math.random() * 16)) + this.monster.stats.HP * 2 / 4) * this.monster.level / 100 + 10 + this.monster.level))
            }
            return returnObj;
          }
        },
        beforeMount(){
          this.enemyCurrentHP = this.enemyStats.hp;
        }
    }
</script>

<style lang="scss" scoped>

</style>