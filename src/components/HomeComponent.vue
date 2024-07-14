<template>
    <v-container>
       <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab href="#view-base">View Base</v-tab>
          <v-tab href="#manage-base">Manage Base</v-tab>
          <v-tab href="#manage-monsters">Manage Monsters</v-tab>
       </v-tabs>
       <v-tabs-items v-model="tab">
          <v-tab-item value="view-base">
             <!-- Content for View Base tab -->
             <v-row>
                <v-col cols="6" v-for="tech in playerBase" :key="tech.id">
                   <v-card dark height="100%">
                      <div class="d-flex flex-no-wrap justify-space-between">
                         <div class="">
                            <v-card-title
                               class="text-h5"
                               > {{ tech.name }}</v-card-title>
                            <v-card-subtitle>{{ tech.description }}</v-card-subtitle>
                         </div>
                         <div>
                            <v-avatar
                               class="ma-3"
                               size="125"
                               tile
                               >
                               <v-img :src="require(`@/assets/tech/${tech.image}`)"></v-img>
                            </v-avatar>
                            <v-card-actions>
                               <v-btn
                                  class="ml-2 mt-5"
                                  outlined
                                  rounded
                                  small
                                  @click="open(tech)"
                                  >
                                  Use {{ tech.name }}
                               </v-btn>
                            </v-card-actions>
                         </div>
                      </div>
                   </v-card>
                </v-col>
             </v-row>
          </v-tab-item>
          <v-tab-item value="manage-base">
             <!-- Content for Manage Base tab -->
             <v-row>
                <v-col cols="6" v-for="tech in techData" :key="tech.name">
                   <v-card dark height="100%">
                      <div class="d-flex flex-no-wrap justify-space-between">
                         <div class="">
                            <v-card-title
                               class="text-h5"
                               > {{ tech.name }}</v-card-title>
                            <v-card-subtitle>{{ tech.description }}</v-card-subtitle>
                            <v-card-text>Requires:</v-card-text>
                            <v-card-text v-for="resource in tech.resources" :key="resource.name" :class="checkInventory(resource) ? '' : 'red--text'">{{ resource.name }}: {{ resource.quantity }}</v-card-text>
                         </div>
                         <div>
                            <v-avatar
                               class="ma-3"
                               size="125"
                               tile
                               >
                               <v-img :src="require(`@/assets/tech/${tech.image}`)"></v-img>
                            </v-avatar>
                            <v-card-actions>
                               <v-btn
                                  class="ml-2 mt-5"
                                  outlined
                                  rounded
                                  small
                                  @click="buildTech(tech)"
                                  >
                                  Build
                               </v-btn>
                            </v-card-actions>
                         </div>
                      </div>
                   </v-card>
                </v-col>
             </v-row>
          </v-tab-item>
          <v-tab-item value="manage-monsters">
             <!-- Content for Manage Monsters tab -->
          </v-tab-item>
       </v-tabs-items>
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
       <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          >
          <v-card>
             <v-toolbar
                dark
                color="primary"
                >
                <v-btn
                   icon
                   dark
                   @click="dialog = false"
                   >
                   <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ activeTech ? activeTech.name : null }}</v-toolbar-title>
                <v-spacer></v-spacer>
             </v-toolbar>
             <v-row v-if="activeTech">
                <v-col cols="6" v-for="item in itemData.filter(x => activeTech.craftableItems.includes(x.id))" :key="item.name">
                   <v-card dark height="100%">
                      <div class="d-flex flex-no-wrap justify-space-between">
                         <div class="">
                            <v-card-title
                               class="text-h5"
                               > {{ item.name }}</v-card-title>
                            <!-- <v-card-subtitle>{{ tech.description }}</v-card-subtitle> -->
                            <v-card-text>Requires:</v-card-text>
                            <v-card-text v-for="resource in item.requiredResources" :key="resource.name" :class="checkInventory(resource) ? '' : 'red--text'">{{ resource.name }}: {{ resource.quantity }}</v-card-text>
                         </div>
                         <div>
                            <v-avatar
                               class="ma-3"
                               size="125"
                               tile
                               >
                               <v-img :src="require(`@/assets/items/${item.image}`)"></v-img>
                            </v-avatar>
                            <v-card-actions>
                               <v-btn
                                  class="ml-2 mt-5"
                                  outlined
                                  rounded
                                  small
                                  @click="buildItem(item)"
                                  >
                                  Build
                               </v-btn>
                            </v-card-actions>
                         </div>
                      </div>
                   </v-card>
                </v-col>
             </v-row>
          </v-card>
       </v-dialog>
    </v-container>
 </template>

<script>
    import techData from '../assets/tables/tech.json';
    import itemData from '../assets/tables/items.json';
    export default {
        name: 'HomeComponent',
        data() {
            return {
                tab: 'manage-base',
                techData: techData,
                itemData: itemData,
                managingBase: false,
                snackbar: false,
                text: '',
                timeout: 2000,
                dialog: false,
                activeTech: null,
            }
        },
        methods: {
            open(tech) {
               console.log(tech.name);
               if(tech.name == 'Stone Quarry'){
                  this.$store.commit('addResourceToInventory', {id: 1, quantity: 1});
                  this.snackbar = true
                  this.text = 'Stone added to inventory.';
               } else if (tech.name == 'Logging Site'){
                  this.$store.commit('addResourceToInventory', {id: 0, quantity: 1});
                  this.snackbar = true
                  this.text = 'Wood added to inventory.';
               } else if (tech.name == 'Workbench'){
                  this.dialog = true;
                  this.activeTech = tech;
               }
            },
            checkInventory(resource) {
                if(this.playerInventory.find(x => x.id == resource.id)){
                    return this.playerInventory.find(x => x.id == resource.id).quantity >= resource.quantity;
                } else {
                    return false;
                }
            },
            buildTech(tech) {
                tech.resources.forEach(resource => {
                    if(this.playerInventory.find(x => x.id == resource.id)){
                        if(this.playerInventory.find(x => x.id == resource.id).quantity < resource.quantity){
                            this.text = 'You do not have enough resources to build this.';
                            this.snackbar = true;
                            return;
                        }
                    } else {
                        this.text = 'You do not have enough resources to build this.';
                        this.snackbar = true;
                        return;
                    }
                });
                tech.resources.forEach(resource => {
                    this.$store.commit('removeResourceFromInventory', resource);
                });
                let techToAdd = JSON.parse(JSON.stringify(tech));
                techToAdd.id = this.generateGuid();
                this.$store.commit('addTechToBase', techToAdd);
                if(this.$store.state.tutorialObjectives.includes("Build a workbench to craft items in your base") && techToAdd.name == "Workbench"){
                    this.$store.commit('completeTutorialObjective', "Build a workbench to craft items in your base");
                }
                this.text = 'Tech built successfully.';
                this.snackbar = true;
            },
            buildItem(item){
               item.requiredResources.forEach(resource => {
                    if(this.playerInventory.find(x => x.id == resource.id)){
                        if(this.playerInventory.find(x => x.id == resource.id).quantity < resource.quantity){
                            this.text = 'You do not have enough resources to build this.';
                            this.snackbar = true;
                            return;
                        }
                    } else {
                        this.text = 'You do not have enough resources to build this.';
                        this.snackbar = true;
                        return;
                    }
                });
               item.requiredResources.forEach(resource => {
                  this.$store.commit('removeResourceFromInventory', resource);
               });
               this.$store.dispatch('addItemToInventory', item);
               if(this.$store.state.tutorialObjectives.includes("Craft a conduit to capture monsters on a workbench") && item.id == 2){
                   this.$store.commit('completeTutorialObjective', "Craft a conduit to capture monsters on a workbench");
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
            playerInventory() {
                return this.$store.state.playerResourceInventory;
            },
            playerBase() {
                return this.$store.state.playerBase;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .icon-img {
        width: 100px;
        height: 100px;
    }
</style>