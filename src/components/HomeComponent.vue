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
    </v-container>
</template>

<script>
    import techData from '../assets/tables/tech.json';
    export default {
        name: 'HomeComponent',
        data() {
            return {
                tab: 'manage-base',
                techData: techData,
                managingBase: false,
                snackbar: false,
                text: '',
                timeout: 2000,
            }
        },
        methods: {
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
            }
        },
        computed: {
            playerInventory() {
                return this.$store.state.playerResourceInventory;
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