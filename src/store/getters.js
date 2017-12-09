export default {
  isLoaded (state) {
    return state.isLoaded
  },
  products (state) {
    return state.products
  },
  productBySlug (state, slug) {
    return function (slug) {
      if (state.products.length) {
        return state.products.find(x => x.slug === slug)
      }
    }
  }
}
