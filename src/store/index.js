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
    playerBase: [],
    tutorialObjectives: [
      "Chop down trees for wood in the peaceful woods",
      "Build a workbench to craft items in your base",
      "Mine for crystal in the peaceful woods",
      "Craft a conduit to capture monsters on a workbench",
      "Capture a monster in the peaceful woods",
    ],
    introComplete: false,
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
    },
    removeResourceFromInventory(state, item) {
      if(state.playerResourceInventory.find(i => i.id === item.id)) {
        state.playerResourceInventory.find(i => i.id === item.id).quantity -= item.quantity;
      } else {
        console.log('Item not found');
      }
    },
    addTechToBase(state, tech) {
      state.playerBase.push(tech);
      console.log(state.playerBase);
    },
    completeTutorialObjective(state, objective) {
      state.tutorialObjectives.splice(state.tutorialObjectives.indexOf(objective), 1);
    },
    completeIntro(state) {
      state.introComplete = true;
    },
    captureMonster(state, monster) {
      state.capturedMonsters.push(monster);
      if(state.playerMonstersTeam.length < 7) {
        state.playerMonstersTeam.push(monster);
      }
    },
    addItemToInventory(state, item) {
      if(state.playerItemInventory.find(i => i.id === item.id)) {
        state.playerItemInventory.find(i => i.id === item.id).quantity++;
      } else {
        state.playerItemInventory.push(item);
      }
    }
  },
  actions: {
    addResourceToInventory(store, item) {
      store.commit('addResourceToInventory', item);
    },
    removeResourceFromInventory(store, item) {
      store.commit('removeResourceFromInventory', item);
    },
    addTechToBase(store, tech) {
      store.commit('addTechToBase', tech);
    },
    completeTutorialObjective(store, objective) {
      store.commit('completeTutorialObjective', objective);
    },
    completeIntro(store) {
      store.commit('completeIntro');
    },
    captureMonster(store, monster) {
      store.commit('captureMonster', monster);
    },
    addItemToInventory(store, item) {
      store.commit('addItemToInventory', item);
    }
  },
  modules: {
  }
})
