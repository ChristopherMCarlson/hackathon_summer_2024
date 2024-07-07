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
                    <v-col cols="3" v-for="tech in techData" :key="tech.name">
                        <v-card dark>
                            <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                class="text-h5"
                                > {{ tech.name }}</v-card-title>
        
                                <v-card-subtitle>{{ tech.description }}</v-card-subtitle>
                                <v-card-text>Requires:</v-card-text>
                                <v-card-text v-for="resource in tech.resources" :key="resource.name">{{ resource.name }} - {{ resource.quantity }}</v-card-text>
        
                                <v-card-actions>
        
                                <v-btn
                                    class="ml-2 mt-5"
                                    outlined
                                    rounded
                                    small
                                >
                                    Build
                                </v-btn>
                                </v-card-actions>
                            </div>
        
                            <v-avatar
                                class="ma-3"
                                size="125"
                                tile
                            >
                                <v-img :src="require(`@/assets/tech/${tech.image}`)"></v-img>
                            </v-avatar>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item value="manage-monsters">
                <!-- Content for Manage Monsters tab -->
            </v-tab-item>
        </v-tabs-items>
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