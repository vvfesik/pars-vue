<template>
  <div id="home">
    <div class="inner">
      <app-menu></app-menu>
      <div class="hero">
        <h1>h1-title</h1>
        <h2 :data-index="index" v-for="(product, index) in products" :key="index" :class="currentProduct === index ? 'active' : 'passive'">{{ product.name }}</h2>
      </div>
      <div class="subhero">
        <div class="desc">
          <p>Rokoko has developed a high-tech motion capture suit called Smartsuit Pro. </p>
          <a href="#" class="button">Подробнее</a>
        </div>
        <div class="list">
          <a href="#" v-for="(product, index) in products" :key="index">{{ product.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
// import IScroll from 'iscroll'
import NormalizeWheel from '@/assets/js/normwheel'
import { TweenLite } from 'gsap'
// import { TweenLite, TimelineLite } from 'gsap'
// import ScrollToPlugin from 'gsap/ScrollToPlugin' // eslint-disable-line no-unused-vars

export default {
  name: 'hello',
  components: {
    'app-menu': Menu
  },
  data () {
    return {
      currentProduct: 0,
      products: [
        {
          name: 'Product Name 1',
          active: true
        },
        {
          name: 'Product Name 2',
          active: false
        },
        {
          name: 'Product Name 3',
          active: false
        },
        {
          name: 'Product Name 4',
          active: false
        }
      ]
    }
  },
  mounted () {
    var vm = this
    TweenLite.fromTo('.hero h2[data-index="' + this.currentProduct + '"]', 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0})
    window.addEventListener('wheel', function (e) {
      event.preventDefault()
      let norm = NormalizeWheel(event)
      if (norm.spinY > 0) {
        vm.scrollUp()
      } else {
        vm.scrollDn()
      }
      // TweenLite.to('.list', 0.5, {
      //   // y:-currentS*factor,
      //   y: -currentS
      //   // overwrite: 5 // preexisting
      //   // onUpdate: function() {
      //   //   TweenLite.set('.nav ul',{y:-currentS});
      //   // },
      //   // onComplete: function() {
      //   //   gotoClosest();
      //   //   isScrolling = false;
      //   // }
      // })
    })
  },
  methods: {
    scrollUp () {
      console.log('debounce')
      console.log('this.currentProduct ' + this.currentProduct)
      // TweenLite.to('.list', 0.5, {y: '-=10'})
      if (this.currentProduct < this.products.length - 1) {
        this.currentProduct++
        // TweenLite.set('.hero h2[data-index="' + this.currentProduct++ + '"]', {autoAlpha: 0, y: 0})
        TweenLite.to('.hero h2[data-index="' + (this.currentProduct - 1) + '"]', 1, {autoAlpha: 0, y: -80})
        TweenLite.fromTo('.hero h2[data-index="' + this.currentProduct + '"]', 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 1})
      } else {
        this.currentProduct = 0
        TweenLite.to('.hero h2[data-index="' + (this.products.length - 1) + '"]', 1, {autoAlpha: 0, y: -80})
        TweenLite.fromTo('.hero h2[data-index="' + this.currentProduct + '"]', 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 1})
      }
    },
    scrollDn () {
      // TweenLite.to('.list', 0.5, {y: '+=10'})
      if (this.currentProduct > 0) {
        this.currentProduct--
        TweenLite.to('.hero h2[data-index="' + (this.currentProduct + 1) + '"]', 1, {autoAlpha: 0, y: 0})
        TweenLite.fromTo('.hero h2[data-index="' + this.currentProduct + '"]', 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 1})
      } else {
        this.currentProduct = this.products.length - 1
        TweenLite.to('.hero h2[data-index="' + (this.products.length - 1) + '"]', 1, {autoAlpha: 0, y: -80})
        TweenLite.fromTo('.hero h2[data-index="' + this.currentProduct + '"]', 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 1})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#home{
  /* background: url(http://lorempixel.com/800/600/abstract); */
  background: #000;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.inner {
  position: relative;
  margin: 0 100px;
}
.hero {
  position: relative;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
  height: 300px;
  margin: 0 20px;
  text-transform: uppercase;
  text-decoration: none;
}
h1, h2 {
  color: red;
  position: absolute;
  margin: 0;
}
h1 {
  top: 50px;
  left: 0;
  font-size: 60px;
}
h2 {
  font-size: 100px;
  right: 0;
  bottom: 50px;
  opacity: 0;
  visibility: hidden;
}
h2.active {
  /* opacity: 1; */
  /* visibility: visible; */
}
.subhero {
  padding-top: 50px;
}
.subhero > div {
  position: absolute;
  width: 50%;
}
.desc {
  left: 20px;
  color: red;
  text-decoration: none;
}
.desc p {
  margin: 0;
}
.desc a {
  padding: 10px 20px;
  margin-top: 50px;
  background: red;
  color: white;
  display: block;
  float: left;
  text-decoration: none;
  text-transform: uppercase;
}
.list {
  right: 20px;
}
.list a {
  display: block;
  text-align: right;
  text-decoration: none;
  text-transform: uppercase;
  color: red;
}
</style>
