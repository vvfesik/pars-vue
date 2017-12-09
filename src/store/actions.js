import imagesLoaded from 'imagesloaded'

export default {
  isLoaded ({commit}) {
    window.addEventListener('DOMContentLoaded', function () {
      imagesLoaded(document.querySelector('#app'), { background: true }, function (instance) {
        commit('isLoaded')
      })
    })
  },
  notLoaded ({commit}) {
    commit('notLoaded')
  }
}
