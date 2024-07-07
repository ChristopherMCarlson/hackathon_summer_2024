import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerInventory: [],
    baseMonsters: [],
    seenMonsters: [],
    capturedMonsters: [],
    playerMonsters: [],
    playerMonstersTeam: [],
  },
  getters: {
  },
  mutations: {
    addItemToInventory(state, item) {
      if(state.playerInventory.find(i => i.id === item.id)) {
        state.playerInventory.find(i => i.id === item.id).quantity++;
        console.log('Item quantity increased');
      } else {
        state.playerInventory.push(item);
        console.log(state.playerInventory);
      }
    }
  },
  actions: {
    // Add item to player inventory
    addItemToInventory(store, item) {
      store.commit('addItemToInventory', item);
    },
  },
  modules: {
  }
})
