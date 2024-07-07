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
            >
                <h1>{{ monster.name }}</h1>
                <h3>Level: {{ monster.level }}</h3>
                <v-img :src="require(`@/assets/monsters/${monster.name}-${monster.id < 10 ? '0' : ''}${monster.id}.png`)" />
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
            monsters: monstersData
        }),
    }
</script>

<style lang="scss" scoped>

</style>