<template>
    <v-container>
        <v-row v-if="selectedLocation == null && activeMonster == null" class="justify-space-around">
            <v-col cols="2" v-for="location in locations" :key="location.name">
                <v-card>
                    <v-card-title>{{ location.name }}</v-card-title>
                    <v-card-subtitle>Recommended Level: {{ location.minLevel }} - {{ location.maxLevel }}</v-card-subtitle>
                    <v-card-text>
                        <v-img class="location-image" :src="require(`@/assets/locations/${convertToCamelCase(location.name)}.png`)" />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="selectedLocation = location">Enter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="selectedLocation != null && activeMonster == null" class="justify-space-around">
            <v-col cols="12" class="text-center">
                <v-btn text @click="selectedLocation = null" color="red">Leave</v-btn>
            </v-col>
            <v-col cols="2" v-for="resource in selectedLocation.resources" :key="resource">
                <v-card>
                    <v-card-title>Gather {{ resources.find(x => x.id == resource).name }}</v-card-title>
                    <v-card-text>
                        <v-img class="location-image" :src="require(`@/assets/resources/${convertToCamelCase(resources.find(x => x.id == resource).name)}.png`)" />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="gatherResource(resource)">Gather</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card>
                    <v-card-title>Hunt Monsters</v-card-title>
                    <v-card-text>
                        <v-img class="location-image" :src="require(`@/assets/icons/hunt.png`)" />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="huntMonsters()">Hunt</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="selectedLocation != null && activeMonster != null">
            <BattleComponent :monster="activeMonster" />
        </v-row>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
    import locationsData from "@/assets/tables/locations.json";
    import resourceData from "@/assets/tables/resources.json";
    import monstersData from "@/assets/tables/monsters.json";
    import itemData from "@/assets/tables/items.json";
    import BattleComponent from './BattleComponent.vue' // eslint-disable-line


    export default {
        name: 'WildernessComponent',
        components: {
            BattleComponent
        },
        data: () => ({
            locations: locationsData,
            resources: resourceData,
            items: itemData,
            selectedLocation: null,
            snackbar: false,
            text: '',
            timeout: 2000,
            tickCount: 0,
            activeMonster: null,
        }),
        methods: {
            convertToCamelCase(str) {
                return str.split(/[^a-zA-Z0-9]/g).map((x, index) => {
                    if (index === 0) return x.toLowerCase()
                    return x.substr(0, 1).toUpperCase() + x.substr(1).toLowerCase()
                }).join('')
            },
            gatherResource(resource) {
                //check if the player has either a conduit or a monster
                if(this.playerItemInventory.find(x => x.id == 2) || this.playerMonsterTeam > 0) {
                    // 10% chance to enter huntMonsters function
                    if (Math.random() < 0.1) {
                        this.huntMonsters();
                        return;
                    }
                }
                let playerHasGatherItem = false;
                if(this.resources.find(x => x.id == resource).gatherItem == "none"){
                    playerHasGatherItem = true;
                } else if(this.playerItemInventory.find(x => x.id == this.resources.find(x => x.id == resource).gatherItem)){
                    playerHasGatherItem = true;
                }
                if(playerHasGatherItem){
                    this.tickCount += 2;
                } else {
                    this.tickCount++;
                }
                if(this.tickCount >= this.resources.find(x => x.id == resource).gatherTicks) {
                    this.tickCount = 0;
                    this.$store.commit('addResourceToInventory', { id: resource, quantity: 1 });
                    if(this.resources.find(x => x.id == resource).gatherItem == "none"){
                        this.text = `You obtained ${this.resources.find(x => x.id == resource).name}.`
                    } else if(playerHasGatherItem){
                        this.text = `You obtained ${this.resources.find(x => x.id == resource).name}.`
                    } else {
                        this.text = `You obtained ${this.resources.find(x => x.id == resource).name}. Craft a ${this.items.find(x => x.id == this.resources.find(x => x.id == resource).gatherItem).name} to gather more efficiently.`
                    }
                    if(this.$store.state.tutorialObjectives.includes("Chop down trees for wood in the peaceful woods") && resource == 0){
                        this.$store.commit('completeTutorialObjective', "Chop down trees for wood in the peaceful woods");
                    }
                    if(this.$store.state.tutorialObjectives.includes("Mine for crystal in the peaceful woods") && resource == 5){
                        this.$store.commit('completeTutorialObjective', "Mine for crystal in the peaceful woods");
                    }
                    this.snackbar = true
                    this.tickCount = 0;
                    return;
                }
            },
            huntMonsters(){
                //select a random monster from the available encounters in a location
                const randomMonsterIndex = Math.floor(Math.random() * this.selectedLocation.encounters.length);
                let randomMonster = monstersData.find(x => x.id == this.selectedLocation.encounters[randomMonsterIndex]);
                //create a level for the monster based on location level range
                randomMonster.level = Math.floor(Math.random() * (this.selectedLocation.maxLevel - this.selectedLocation.minLevel + 1)) + this.selectedLocation.minLevel;
                // Use the randomMonster for further processing
                this.activeMonster = randomMonster;
            }
        },
        computed: {
            playerItemInventory() {
                return this.$store.state.playerItemInventory
            },
            playerMonsterTeam() {
                return this.$store.state.playerMonsterTeam
            }
        }
    }
</script>

<style lang="scss" scoped>
    .location-image {
        height: 200px;
        width: 200px;
    }
</style>