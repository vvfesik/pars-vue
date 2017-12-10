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
  },
  productNextBySlug (state, slug) {
    return function (slug) {
      if (state.products.length) {
        let index = state.products.findIndex(x => x.slug === slug)
        if (index === state.products.length - 1) {
          return state.products[0]
        } else {
          return state.products[index + 1]
        }
      }
    }
  },
  pages (state) {
    return state.pages
  },
  pageBySlug (state, slug) {
    return function (slug) {
      if (state.pages.length) {
        return state.pages.find(x => x.slug === slug)
      }
    }
  }
}
