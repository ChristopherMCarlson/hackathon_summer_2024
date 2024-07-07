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
                    <v-card-title>{{ resources.find(x => x.id == resource).name }}</v-card-title>
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
    import BattleComponent from './BattleComponent.vue' // eslint-disable-line


    export default {
        name: 'WildernessComponent',
        components: {
            BattleComponent
        },
        data: () => ({
            locations: locationsData,
            resources: resourceData,
            selectedLocation: null,
            snackbar: false,
            text: '',
            timeout: 2000,
            stoneCount: 0,
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
                // 10% chance to enter huntMonsters function
                if (Math.random() < 0.1) {
                    this.huntMonsters();
                    return;
                }
                //check if resource is stone
                if (resource == 1) {
                    //check if player has pickaxe
                    if (!this.playerInventory.find(x => x.id == 67)) {
                        this.stoneCount++;
                        if(this.stoneCount == 3) {
                            //add stone to inventory
                            this.$store.commit('addItemToInventory', { id: 1, quantity: 1 })
                            this.text = `You gathered ${this.resources.find(x => x.id == resource).name} but you need a pickaxe to gather more efficiently.`
                            this.snackbar = true
                            this.stoneCount = 0;
                            return;
                        }
                    }
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
            playerInventory() {
                return this.$store.state.playerInventory
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