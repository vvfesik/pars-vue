<template>
  <article class="page">
    <div class="hero-module main" :style="'color:' + products[activeProduct].color">
      <app-menu></app-menu>
      <div class="inner">
        <div class="display">
          <div class="mask" >
            <!-- <h1 class="logo large"><a href="/">North-East Venture</a></h1> -->
            <h1 class="logo small"><a href="/">P.A.R.S.</a></h1>
            <div class="caseName" :data-index="index" v-for="(product, index) in products" :key="index">
              <h2>{{ product.name }}</h2>
            </div>
          </div>
          <div class="line top n1"></div>
          <div class="line top n2"></div>
          <div class="line bottom n1"></div>
          <div class="line bottom n2"></div>
          <div class="progressLine top"></div>
          <div class="progressLine bottom"></div>
        </div>
        <div class="caseList">
          <a class="caseListItem" href="/aiayu/" :data-index="index" v-for="(product, index) in products" :key="index">
            <p>{{ product.name }}</p>
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="arrow" width="16" height="16" transform="matrix(1.0000000000, 0.0000000000, 0.0000000000, 1.0000000000, -14.5000000000, 0.0000000000)">
              <path d="M0.50000000,7.50000000 L14.50000000,7.50000000 M9.50000000,2.50000000 L14.50000000,7.50000000 L9.50000000,12.50000000" fill="none" :stroke="product.textcolor" stroke-width="1px"></path>
            </svg>
          </a>
        </div>
        <div class="descCon">
          <div class="caseDesc" :data-index="index" v-for="(product, index) in products" :key="index" :style="'display: block; pointer-events: all; color:' + product.textcolor">
            <div>
              <p>{{ product.text }}</p>
            </div>
            <!-- <router-link :to="{ name: 'Product', params: { product_slug: product.slug, product: product } }" :product="product" class="label-button" :style="'color: black; background-color:' + product.textcolor + ';'"> -->
            <router-link :to="'/p/' + product.slug" class="label-button" :style="'color: black; background-color:' + product.textcolor + ';'">
              <p>Read more</p>
              <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="arrow" width="16" height="16">
                <path d="M0.50000000,7.50000000 L14.50000000,7.50000000 M9.50000000,2.50000000 L14.50000000,7.50000000 L9.50000000,12.50000000" fill="none" stroke="#000000" stroke-width="1px"></path>
              </svg>
            </router-link>
          </div>
        </div>
        <div class="indexCon">
          <div class="runner"></div><div class="amount"></div>
        </div>
      </div>
      <div class="caseBg" :data-index="index" v-for="(product, index) in products" :key="index" :style="'background-image:url(' + product.img + ');'"></div>
    </div>
  </article>
</template>

<script>
import Menu from '@/components/Menu'
import NormalizeWheel from '@/assets/js/normwheel'
import { TweenLite } from 'gsap'
import { mapGetters } from 'vuex'
// require('../../static/js/main.js')

export default {
  name: 'home',
  components: {
    'app-menu': Menu
  },
  data () {
    return {
      // products: [
      //   {name: 'Name1', img: 'https://picsum.photos/1900/1024?image=10', color: '#2f5050', textcolor: '#f8f8ff', text: '1 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name1'},
      //   {name: 'Name2', img: 'https://picsum.photos/1900/1024?image=51', color: '#008a8a', textcolor: '#afeeee', text: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name2'},
      //   {name: 'Name3', img: 'https://picsum.photos/1900/1024?image=32', color: '#000000', textcolor: '#800000', text: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name3'},
      //   {name: 'Name4', img: 'https://picsum.photos/1900/1024?image=43', color: '#ffd700', textcolor: '#ffd700', text: '4 Lorem ipsum dolor sit amet consectetur adipisicing elit.', slug: 'name4'}
      // ],
      activeProduct: 0,
      isScrolling: false,
      minScroll: 0
    }
  },
  mounted () {
    // var vm = this
    // let currentS = 0
    // let lastS = 0
    // let lastTime = 0
    // function Velocity (e) {
    //   if (vm.isScrolling) {
    //     let speed = (currentS - lastS) / (e - lastTime)
    //     if (speed < -5) speed = -5
    //     if (speed > 5) speed = 5
    //     lastTime = e
    //     lastS = currentS
    //     console.log('speed: ' + speed)
    //     window.requestAnimationFrame(Velocity)
    //   }
    // }
    // Velocity()

    var caseNames = document.getElementsByClassName('caseName')
    for (let caseName of caseNames) {
      TweenLite.set(caseName, {autoAlpha: 0, y: 216})
    }
    TweenLite.to('.caseName[data-index="0"]', 1, {autoAlpha: 1, y: 0})

    var caseBgs = document.getElementsByClassName('caseBg')
    for (let caseBg of caseBgs) {
      TweenLite.set(caseBg, {autoAlpha: 0, scale: 1.2, y: 0})
    }
    TweenLite.to('.caseBg[data-index="0"]', 1, {autoAlpha: 1, scale: 1.1, y: 0})

    var caseDescs = document.getElementsByClassName('caseDesc')
    for (let caseDesc of caseDescs) {
      TweenLite.set(caseDesc, {autoAlpha: 0, y: 100})
    }
    TweenLite.to('.caseDesc[data-index="0"]', 1, {autoAlpha: 1, y: 0})

    var caseListItems = document.getElementsByClassName('caseListItem')
    for (let i = 0; i < caseListItems.length; i++) {
      TweenLite.set(caseListItems[i], {autoAlpha: 1, y: (i - 1) * 24})
    }
    TweenLite.to('.caseListItem[data-index="0"]', 1, {autoAlpha: 0, y: -24})

    // let minScroll = 0
    // window.addEventListener('wheel', this.test (event))
    // window.addEventListener('wheel', function (event) {
    //   console.log(event)
    // })
    window.addEventListener('wheel', this.homeScroll)
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.homeScroll)
  },
  computed: {
    ...mapGetters([
      'products'
    ])
  },
  methods: {
    homeScroll (event) {
      event.preventDefault()
      let norm = NormalizeWheel(event)
      this.minScroll += norm.spinY
      if (this.minScroll - norm.spinY < this.minScroll) {
        if (!this.isScrolling) {
          this.isScrolling = true
          this.scrollDn()
          this.minScroll = 0
        }
      } else if (this.minScroll - norm.spinY > this.minScroll) {
        if (!this.isScrolling) {
          this.isScrolling = true
          this.scrollUp()
          this.minScroll = 0
        }
      }
    },
    scrollDn () {
      if (this.activeProduct < this.products.length - 1) {
        this.activeProduct++
        TweenLite.to('.caseName[data-index="' + (this.activeProduct - 1) + '"]', 1, {autoAlpha: 0, y: -216})
        TweenLite.to('.caseDesc[data-index="' + (this.activeProduct - 1) + '"]', 1, {autoAlpha: 0, y: -100})
        TweenLite.to('.caseBg[data-index="' + (this.activeProduct - 1) + '"]', 1, {autoAlpha: 0, scale: 1.1, y: -54})
      } else {
        this.activeProduct = 0
        TweenLite.to('.caseName[data-index="' + (this.products.length - 1) + '"]', 1, {autoAlpha: 0, y: -216})
        TweenLite.to('.caseDesc[data-index="' + (this.products.length - 1) + '"]', 1, {autoAlpha: 0, y: -100})
        TweenLite.to('.caseBg[data-index="' + (this.products.length - 1) + '"]', 1, {autoAlpha: 0, scale: 1.1, y: -54})
      }
      TweenLite.fromTo('.caseName[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, y: 216}, {autoAlpha: 1, y: 0})
      // TweenLite.fromTo('.caseName[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, y: 216}, {autoAlpha: 1, y: 0, onComplete () {let vm = this; console.log('vm.isScrolling: ' + vm.isScrolling); vm.isScrolling = false; console.log('vm.isScrolling: ' + vm.isScrolling)}}) // eslint-disable-line
      TweenLite.fromTo('.caseDesc[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, y: 100}, {autoAlpha: 1, y: 0})
      TweenLite.fromTo('.caseBg[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, scale: 1.1, y: 0}, {autoAlpha: 1, scale: 1.2, y: 0})
      if (this.activeProduct === 0) {
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -24})
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 0 * 24})
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 0, y: 3 * 24}, {autoAlpha: 1, y: 2 * 24})
      } else if (this.activeProduct === 1) {
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -24})
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 0 * 24})
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 0, y: 3 * 24}, {autoAlpha: 1, y: 2 * 24})
      } else if (this.activeProduct === 2) {
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -24})
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 0 * 24})
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 0, y: 3 * 24}, {autoAlpha: 1, y: 2 * 24})
      } else if (this.activeProduct === 3) {
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -24})
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 0 * 24})
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 0, y: 3 * 24}, {autoAlpha: 1, y: 2 * 24})
      }
      setTimeout(() => {
        this.isScrolling = false
      }, 1000)
    },
    scrollUp () {
      if (this.activeProduct !== 0) {
        this.activeProduct--
        TweenLite.to('.caseName[data-index="' + (this.activeProduct + 1) + '"]', 1, {autoAlpha: 0, y: 216})
        TweenLite.to('.caseDesc[data-index="' + (this.activeProduct + 1) + '"]', 1, {autoAlpha: 0, y: 100})
        TweenLite.to('.caseBg[data-index="' + (this.activeProduct + 1) + '"]', 1, {autoAlpha: 0, scale: 1.2, y: 0})
      } else {
        this.activeProduct = this.products.length - 1
        TweenLite.to('.caseName[data-index="0"]', 1, {autoAlpha: 0, y: 216})
        TweenLite.to('.caseDesc[data-index="0"]', 1, {autoAlpha: 0, y: 100})
        TweenLite.to('.caseBg[data-index="0"]', 1, {autoAlpha: 0, scale: 1.2, y: 0})
      }
      TweenLite.fromTo('.caseName[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, y: -216}, {autoAlpha: 1, y: 0})
      TweenLite.fromTo('.caseDesc[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0})
      TweenLite.fromTo('.caseBg[data-index="' + this.activeProduct + '"]', 1, {autoAlpha: 0, scale: 1.1, y: -54}, {autoAlpha: 1, scale: 1.2, y: 0})
      if (this.activeProduct === 3) {
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 0, y: -24}, {autoAlpha: 1, y: 0})
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 1, y: 0 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 2 * 24})
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 0, y: 3 * 24})
      } else if (this.activeProduct === 0) {
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 0, y: -24}, {autoAlpha: 1, y: 0})
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 1, y: 0 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 2 * 24})
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 0, y: 3 * 24})
      } else if (this.activeProduct === 1) {
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 0, y: -24}, {autoAlpha: 1, y: 0})
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 1, y: 0 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 2 * 24})
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 0, y: 3 * 24})
      } else if (this.activeProduct === 2) {
        TweenLite.fromTo('.caseListItem[data-index="3"]', 1, {autoAlpha: 0, y: -24}, {autoAlpha: 1, y: 0})
        TweenLite.fromTo('.caseListItem[data-index="0"]', 1, {autoAlpha: 1, y: 0 * 24}, {autoAlpha: 1, y: 1 * 24})
        TweenLite.fromTo('.caseListItem[data-index="1"]', 1, {autoAlpha: 1, y: 1 * 24}, {autoAlpha: 1, y: 2 * 24})
        TweenLite.fromTo('.caseListItem[data-index="2"]', 1, {autoAlpha: 1, y: 2 * 24}, {autoAlpha: 0, y: 3 * 24})
      }
      setTimeout(() => {
        this.isScrolling = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.logo.small {
  transform: scale(0.333);
}
.caseBg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  contain: strict;
  width: 100vw;
  height: 100vh;
  background-size: cover;
}
.caseDesc a svg, .caseList a svg {
  transform: scale(0);
  transition: transform .3s ease;
  transform-origin: right;
}
.caseDesc a:hover svg, .caseList a:hover svg {
  transform: scale(1);
}
.caseDesc a p, .caseList a p {
  transform: translateX(0);
  transition: transform .3s ease;
  transform-origin: right;
}
.caseDesc a:hover p {
  transform: translateX(-10px);
}
.caseList a:hover p {
  transform: translateX(-20px);
}
</style>
