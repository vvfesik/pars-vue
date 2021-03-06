<template>
  <article class="page">
    <div class="hero-module main" :style="'color:' + products[activeProduct].color">
      <app-menu></app-menu>
      <div class="inner">
        <div class="display">
          <div class="mask" >
            <img src="../../static/img/logo_pars_small.png" alt="PARS logo" class="logo">
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
          <router-link class="caseListItem" :to="'/p/' + product.slug" :data-index="index" v-for="(product, index) in products" :key="index">
            <p>{{ product.name }}</p>
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="arrow" width="16" height="16" transform="matrix(1.0000000000, 0.0000000000, 0.0000000000, 1.0000000000, -14.5000000000, 0.0000000000)">
              <path d="M0.50000000,7.50000000 L14.50000000,7.50000000 M9.50000000,2.50000000 L14.50000000,7.50000000 L9.50000000,12.50000000" fill="none" :stroke="product.color" stroke-width="1px"></path>
            </svg>
          </router-link>
        </div>
        <div class="descCon">
          <div class="caseDesc" :data-index="index" v-for="(product, index) in products" :key="index" :style="'display: block; pointer-events: all; color:' + product.color">
            <div>
              <p class="desc">{{ product.text }}</p>
            </div>
            <router-link :to="'/p/' + product.slug" class="label-button" :style="'color:' + product.textcolor + '; background-color:' + product.color + ';'">
              <p>Інформація</p>
              <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="arrow" width="16" height="16">
                <path d="M0.50000000,7.50000000 L14.50000000,7.50000000 M9.50000000,2.50000000 L14.50000000,7.50000000 L9.50000000,12.50000000" fill="none" :stroke="product.textcolor" stroke-width="1px"></path>
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

export default {
  name: 'home',
  components: {
    'app-menu': Menu
  },
  data () {
    return {
      activeProduct: 0,
      isScrolling: false,
      minScroll: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Product' || from.name === 'Page') {
      TweenLite.to('.hero-module .line.top.n1, .hero-module .line.bottom.n1', 0.6, {scaleX: 0})
      TweenLite.to('.hero-module .line.top.n2, .hero-module .line.bottom.n2', 0.6, {scaleX: 1, delay: 0.3})
      setTimeout(() => {
        next()
      }, 900)
    } else next()
  },
  mounted () {
    var caseNames = document.getElementsByClassName('caseName')
    for (let caseName of caseNames) {
      TweenLite.set(caseName, {autoAlpha: 0, y: 216})
    }
    TweenLite.to('.caseName[data-index="0"]', 1, {autoAlpha: 1, y: 0})

    var caseBgs = document.getElementsByClassName('caseBg')
    for (let caseBg of caseBgs) {
      TweenLite.set(caseBg, {autoAlpha: 0, scale: 1.3, y: 0})
    }
    TweenLite.to('.caseBg[data-index="0"]', 1, {autoAlpha: 1, scale: 1.2, y: 0})

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
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: 50% 50%;
  transform: scale(1.2)
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
@media screen and (max-width: 1024px) {
  .caseDesc, .caseName {
    color: #fff !important;
  }
  .caseDesc p.desc {
    letter-spacing: 1px;
    font-size: 3rem;
    line-height: 1.3;
  }
}
</style>
