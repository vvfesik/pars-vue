export default {
  notLoaded (state) {
    console.log('isLoaded = false')
    state.isLoaded = false
  },
  isLoaded (state) {
    console.log('isLoaded = true')
    state.isLoaded = true
  }
}
