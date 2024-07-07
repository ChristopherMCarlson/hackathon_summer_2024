<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="component in components"
          :key="component.label"
          @click="activeComponent = component"
        >
          <v-list-item-icon>
            <v-icon>{{ component.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ component.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>{{ activeComponent.label }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <component :is="activeComponent.component" />
    </v-main>
  </v-app>
</template>

<script>
  import Home from './components/HomeComponent.vue' // eslint-disable-line
  import Skills from './components/SkillsComponent.vue' // eslint-disable-line
  import ActiveTeam from './components/ActiveTeamComponent.vue' // eslint-disable-line
  import Wilderness from './components/WildernessComponent.vue' // eslint-disable-line
  import Encyclopedia from './components/EncyclopediaComponent.vue' // eslint-disable-line
  export default {
    data: () => ({
      drawer: true,
      activeComponent: {
          label: 'Home',
          icon: 'mdi-home',
          component: Home,
        },
        components: [
          {
            label: 'Home',
            icon: 'mdi-home',
            component: Home,
          },
          {
            label: 'Skills',
            icon: 'mdi-account-group',
            component: Skills,
          },
          {
            label: 'Active Team',
            icon: 'mdi-account-group',
            component: ActiveTeam,
          },
          {
            label: 'Wilderness',
            icon: 'mdi-forest-outline',
            component: Wilderness,
          },
          {
            label: 'Encyclopedia',
            icon: 'mdi-book-outline',
            component: Encyclopedia,
          },
        ]
      }),
  }
</script>