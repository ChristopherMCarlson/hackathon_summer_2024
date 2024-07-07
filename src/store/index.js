import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerResourceInventory: [],
    playerItemInventory: [],
    baseMonsters: [],
    seenMonsters: [],
    capturedMonsters: [],
    playerMonsters: [],
    playerMonstersTeam: [],
    tutorialObjectives: [
      "Chop down trees for wood in the peaceful woods",
      "Build a workbench to craft items in your base",
      "Mine for crystal in the peaceful woods",
      "Craft a conduit to capture monsters on a workbench",
      "Capture a monster in the peaceful woods",
    ],
  },
  getters: {
  },
  mutations: {
    addResourceToInventory(state, item) {
      if(state.playerResourceInventory.find(i => i.id === item.id)) {
        state.playerResourceInventory.find(i => i.id === item.id).quantity++;
        console.log('Item quantity increased');
      } else {
        state.playerResourceInventory.push(item);
        console.log(state.playerResourceInventory);
      }
    }
  },
  actions: {
    // Add item to player inventory
    addResourceToInventory(store, item) {
      store.commit('addResourceToInventory', item);
    },
  },
  modules: {
  }
})
