import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {path: '/', name: 'Hello', component: Hello}
    {path: '/', name: 'Home', component: Home},
    {path: '/p/:product_slug', name: 'Product', component: Product}
  ]
})
