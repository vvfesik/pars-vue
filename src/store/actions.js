import imagesLoaded from 'imagesloaded'

export default {
  imgLoaded ({commit}) {
    window.onload(function () {
      imagesLoaded(document.querySelector('#page-wrapper'), { background: true }, function (instance) {
        setTimeout(function () {
          commit('imgLoaded')
        }, 1000)
      })
    })
  },
}

// transform: translateY(calc(20vw + 4.4rem));
// transition: transform 1s ease;
// section.section-module.dark {}