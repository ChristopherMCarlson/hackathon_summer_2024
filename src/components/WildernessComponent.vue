<template>
    <v-container>
        <v-row v-if="selectedLocation == null" class="justify-space-around">
            <v-col cols="2" v-for="location in locations" :key="location.name">
                <v-card>
                    <v-card-title>{{ location.name }}</v-card-title>
                    <v-card-subtitle>Recommended Level: {{ location.level }}</v-card-subtitle>
                    <v-card-text>
                        <v-img class="location-image" :src="require(`@/assets/locations/${convertToCamelCase(location.name)}.png`)" />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="selectedLocation = location">Enter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else class="justify-space-around">
            <v-col cols="2" v-for="resource in selectedLocation.resources" :key="resource">
                <v-card>
                    <v-card-title>{{ resources.find(x => x.id == resource).name }}</v-card-title>
                    <v-card-text>
                        <v-img class="location-image" :src="require(`@/assets/resources/${convertToCamelCase(resources.find(x => x.id == resource).name)}.png`)" />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn>Gather</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import locationsData from "@/assets/tables/locations.json";
    import resourceData from "@/assets/tables/resources.json";

    export default {
        name: 'WildernessComponent',
        data: () => ({
            locations: locationsData,
            resources: resourceData,
            selectedLocation: null,
        }),
        methods: {
            convertToCamelCase(str) {
                return str.split(/[^a-zA-Z0-9]/g).map((x, index) => {
                    if (index === 0) return x.toLowerCase()
                    return x.substr(0, 1).toUpperCase() + x.substr(1).toLowerCase()
                }).join('')
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