import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoaded: false,
    products: [
      {name: 'Name1', img: 'https://picsum.photos/1900/1024?image=10', color: '#2f5050', textcolor: '#f8f8ff', text: '1 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name1'},
      {name: 'Name2', img: 'https://picsum.photos/1900/1024?image=51', color: '#008a8a', textcolor: '#afeeee', text: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name2'},
      {name: 'Name3', img: 'https://picsum.photos/1900/1024?image=32', color: '#000000', textcolor: '#800000', text: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name3'},
      {name: 'Name4', img: 'https://picsum.photos/1900/1024?image=43', color: '#ffd700', textcolor: '#ffd700', text: '4 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name4'}
    ],
    pages: [
      {
        name: 'Про нас',
        slug: 'about',
        img: 'https://picsum.photos/1900/1024?image=64',
        colorText: '#000000',
        colorBg: '#ffffff',
        textblock: {
          title: 'Хто ми є',
          textBig: 'A common denominator for all investments across the various industries is that the companies are adding brand and technological edge to the market, innovation and disruption in addition to including sustainable elements and a general ethical awareness.',
          textColumn1: '<p>A common denominator for all investments across the various industries is that the companies are adding brand and technological edge to the market, innovation and disruption in addition to including sustainable elements and a general ethical awareness.</p>',
          textColumn2: '<p>A common denominator for all investments across the various industries is that the companies are adding brand and technological edge to the market, innovation and disruption in addition to including sustainable elements and a general ethical awareness.</p>'
        }
      },
      {
        name: 'Контакти',
        slug: 'contact',
        img: 'https://picsum.photos/1900/1024?image=64',
        colorText: '#000000',
        colorBg: '#ffffff',
        textblock: {
          title: 'Способи зв\'язку',
          textBig: 'ООО «НВФ «ПАРС»',
          textColumn1: '<p>+38 (093) 889 83 80</p><p>+38 (096) 047 73 23</p>',
          textColumn2: '<p>Пропозиції надсилайте за адресою:</p><p><a href="mailto:basil2k2k@gmail.com">basil2k2k@gmail.com</a></p>'
        }
      }
    ]
  },
  getters,
  mutations,
  actions
})
