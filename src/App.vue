<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-img>
        <v-img src="@/assets/logo.png" />
      </v-img>
      <v-list>
        <v-list-item
          v-for="component in components"
          :key="component.label"
          @click="activeComponent = component"
        >
          <v-list-item-icon>
            <v-img :src="require(`@/assets/icons/${component.icon}.png`)" class="icons"></v-img>
          </v-list-item-icon>
          <v-list-item-title>{{ component.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list class="mt-5">
        <v-list-item>
          <p style="color: #00FFFF">OBJECTIVES:</p>
        </v-list-item>
        <v-list-item
          v-for="tutorial in tutorialObjetives"
          :key="tutorial"
        >
          <p style="color: #00FFFF">{{ tutorial }}</p>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title class="titles">{{ activeComponent.label }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <intro-component v-if="!introComplete" />
      <component v-if="introComplete" :is="activeComponent.component" />
    </v-main>
  </v-app>
</template>

<script>
  import Home from './components/HomeComponent.vue' // eslint-disable-line
  import ActiveTeam from './components/ActiveTeamComponent.vue' // eslint-disable-line
  import Wilderness from './components/WildernessComponent.vue' // eslint-disable-line
  import Encyclopedia from './components/EncyclopediaComponent.vue' // eslint-disable-line
  import Inventory from './components/InventoryComponent.vue' // eslint-disable-line
  import Intro from './components/IntroComponent.vue' // eslint-disable-line
import IntroComponent from './components/IntroComponent.vue'
  export default {
  components: { IntroComponent },
    data: () => ({
      drawer: true,
      activeComponent: {
            label: 'Wilderness',
            icon: 'wilderness',
            component: Wilderness,
          },
        components: [
          {
            label: 'Base',
            icon: 'base',
            component: Home,
          },
          {
            label: 'Inventory',
            icon: 'inventory',
            component: Inventory,
          },
          {
            label: 'Active Team',
            icon: 'team',
            component: ActiveTeam,
          },
          {
            label: 'Wilderness',
            icon: 'wilderness',
            component: Wilderness,
          },
          // {
          //   label: 'Encyclopedia',
          //   icon: 'encyclopedia',
          //   component: Encyclopedia,
          // },
        ]
      }),
      computed: {
        tutorialObjetives(){
          return this.$store.state.tutorialObjectives;
        },
        introComplete(){
          return this.$store.state.introComplete;
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

  .icons {
    height: 1.5rem;
    width: 1.5rem;
  }
</style>