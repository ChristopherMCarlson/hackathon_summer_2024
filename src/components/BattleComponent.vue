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
            <h1>{{ playerMonster.name }}</h1>
                <h3>Level: {{ playerMonster.level }}</h3>
                <v-img :src="require(`@/assets/monsters/${playerMonster.image}.png`)" />
                <h3>HP:</h3>
                <v-progress-linear
                  :value="Math.floor((playerMonster.currentHP/playerMonster.maxHP) * 100)"
                  color="green"
                  height="25"
                ></v-progress-linear>
            </v-sheet>
            <v-sheet
              rounded="lg"
              class="mt-5 pa-2"
            >
            <v-row class="justify-end">
              <v-col cols="6" class="text-center">
                <v-btn @click="attack" width="100%">Attack</v-btn>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn @click="useItem" width="100%">Item</v-btn>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn @click="swap" width="100%">Swap</v-btn>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn @click="flee" width="100%">Flee</v-btn>
              </v-col>
            </v-row>
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
            <v-row class="mx-2">
              <v-col cols="12" class="text-center">
                <p v-for="(message, i) in battleProgress" :key="i">{{ message }}</p>
              </v-col>
            </v-row>
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
                <h1>{{ enemy.name }}</h1>
                <h3>Level: {{ enemy.level }}</h3>
                <v-img :src="require(`@/assets/monsters/${enemy.image}.png`)" />
                <h3>HP:</h3>
                <v-progress-linear
                  :value="Math.floor((enemyCurrentHP/enemy.maxHP) * 100)"
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
    import itemsData from "@/assets/tables/items.json";
    import resoucesData from "@/assets/tables/resources.json";

    export default {
        name: 'BattleComponent',
        props: {
            monster: Object,
        },
        data: () => ({
            monsters: monstersData,
            items: itemsData,
            resources: resoucesData,
            enemyCurrentHP: 0,
            enemy: null,
            playerMonster: null,
            fleeAttempts: 0,
            battleProgress: [],
        }),
        methods: {
          commitPlayerMonsterHP(monster){
            this.$store.commit('updateMonsterHP', {monster: monster, hp: monster.currentHP});
          },
          useItem(){
            this.battleProgress.push(`You used an item!`);
          },
          swap(){
            this.battleProgress.push(`You swapped monsters!`);
          },
          attack(){
            let playerDamage = this.calculateDamage(this.playerMonster, this.enemy);
            this.enemyCurrentHP -= playerDamage;
            this.battleProgress.push(`You dealt ${playerDamage} damage to the enemy!`);
            if(this.enemyCurrentHP <= 0){
              this.battleProgress.push(`You defeated the enemy!`);
              this.$emit('endEncounter', this.enemy);
            } else {
              let enemyDamage = this.calculateDamage(this.enemy, this.playerMonster);
              this.playerMonster.currentHP -= enemyDamage;
              this.battleProgress.push(`The enemy dealt ${enemyDamage} damage to you!`);
              if(this.playerMonster.currentHP <= 0){
                this.battleProgress.push(`You were defeated!`);
                this.$emit('endEncounter');
              }
            }
            // this.commitPlayerMonsterHP(this.playerMonster);
          },
          calculateDamage(attacker, defender){
            console.log(attacker, defender)
            let randomModifier = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
            console.log(randomModifier)
            let damage = Math.max(1, Math.floor((((2 * attacker.level / 5 + 2) * attacker.calculatedStats.attack * 50 / defender.calculatedStats.defense) / 50) + 2) * (randomModifier / 255))
            if ((attacker.type === 'water' && defender.type === 'fire') ||
              (attacker.type === 'fire' && defender.type === 'grass') ||
              (attacker.type === 'grass' && defender.type === 'water') ||
              (attacker.type === 'light' && defender.type === 'dark') ||
              (attacker.type === 'dark' && defender.type === 'light')){
              damage *= 2;
            }
            if ((attacker.type === 'fire' && defender.type === 'water') ||
              (attacker.type === 'grass' && defender.type === 'fire') ||
              (attacker.type === 'water' && defender.type === 'grass') ||
              (attacker.type === 'light' && defender.type === 'neutral') ||
              (attacker.type === 'dark' && defender.type === 'neutral')){
              damage *= 0.5;
            }
            return Math.floor(damage);
          },
          flee(){
            if(this.playerMonster.calculatedStats.speed > this.enemy.calculatedStats.speed){
              this.battleProgress.push(`You fled successfully!`);
              this.$emit('endEncounter');
            } else {
              let randomModifier = Math.floor(Math.random() * 256);
              let fleeChance = Math.floor((this.playerMonster.calculatedStats.speed * 128) / this.enemy.calculatedStats.speed + 30 * this.fleeAttempts) % 256;
              if(fleeChance > randomModifier){
                this.battleProgress.push(`You fled successfully!`);
                this.$emit('endEncounter');
              } else {
                this.battleProgress.push(`You couldn't flee!`);
                this.fleeAttempts++;
              }
            }
          },
          capture(conduit){
            let conduitMultiplier = 1;
            let randomNum = Math.floor(Math.random() * 256);
            if(conduit.id == 3){
              conduitMultiplier = 1.5;
            } else if(conduit.id == 4){
              conduitMultiplier = 2;
            }
            let successRate = Math.floor((this.enemy.maxHP * 255 / 4) / this.enemy.currentHP * conduitMultiplier);
            if(successRate > randomNum){
              this.battleProgress.push(`You captured the enemy!`);
              this.$emit('endEncounter', this.enemy);
            } else {
              this.battleProgress.push(`The enemy broke free!`);
            }
          },
          generateGuid() {
              const s4 = () => {
                  return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              };
              return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
          }
        },
        computed: {
          playerMonsters() {
            return this.$store.state.playerMonstersTeam;
          },
          playerInventory() {
            return this.$store.state.playerItemInventory;
          }
        },
        beforeMount(){
          let enemyMonster = JSON.parse(JSON.stringify(this.monster));
          enemyMonster.uniqueId = this.generateGuid();
          enemyMonster.exp = 0;
          enemyMonster.randomModifiers = {
              attack: Math.floor(Math.random() * 16),
              defense: Math.floor(Math.random() * 16),
              speed: Math.floor(Math.random() * 16),
              hp: Math.floor(Math.random() * 16)
          }
          enemyMonster.calculatedStats = {
              attack: Math.max(5, Math.floor(((enemyMonster.randomModifiers.attack + enemyMonster.stats.Attack * 2 / 4) * enemyMonster.level / 100 + 5))),
              defense: Math.max(5, Math.floor(((enemyMonster.randomModifiers.defense + enemyMonster.stats.Defense * 2 / 4) * enemyMonster.level / 100 + 5))),
              speed: Math.max(5, Math.floor(((enemyMonster.randomModifiers.speed + enemyMonster.stats.Speed * 2 / 4) * enemyMonster.level / 100 + 5))),
              hp: Math.max(11, Math.floor((enemyMonster.randomModifiers.hp + enemyMonster.stats.HP * 2 / 4) * enemyMonster.level / 100 + 10 + enemyMonster.level))
          }
          enemyMonster.currentHP = enemyMonster.calculatedStats.hp;
          enemyMonster.maxHP = enemyMonster.calculatedStats.hp;
          this.enemy = enemyMonster;
          this.enemyCurrentHP = this.enemy.currentHP;
          this.playerMonster = this.playerMonsters.find(x => x.currentHP > 0);
          this.battleProgress.push(`A wild ${this.enemy.name} appeared!`);
          this.battleProgress.push(`What will you do?`);
        }
    }
</script>

<style lang="scss" scoped>

</style>