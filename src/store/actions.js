import $ from 'jquery'
import imagesLoaded from 'imagesloaded'

export default {
  isLoaded ({commit}) {
    $(document).ready(function () {
      imagesLoaded(document.querySelector('#app'), { background: true }, function (instance) {
        commit('isLoaded')
      })
    })
  },
  notLoaded ({commit}) {
    commit('notLoaded')
  }
}
