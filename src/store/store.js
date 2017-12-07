import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [
      {name: 'Name1', img: 'https://picsum.photos/1900/1024?image=10', color: '#2f5050', textcolor: '#f8f8ff', text: '1 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name1'},
      {name: 'Name2', img: 'https://picsum.photos/1900/1024?image=51', color: '#008a8a', textcolor: '#afeeee', text: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name2'},
      {name: 'Name3', img: 'https://picsum.photos/1900/1024?image=32', color: '#000000', textcolor: '#800000', text: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name3'},
      {name: 'Name4', img: 'https://picsum.photos/1900/1024?image=43', color: '#ffd700', textcolor: '#ffd700', text: '4 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name4'}
    ]
  },
  getters,
  mutations,
  actions
})
