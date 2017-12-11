<template>
  <div id="page" class="page" v-if="product" :class="animateEnter ? 'animateEnter' : ''">
    <div class="maincontent">
      <div class="hero-module hero__page isCase" :style="'color:' + product.color">
        <app-menu></app-menu>
        <div class="abstract">
          <div class="mediaCon">
            <div class="media image" :style="'background-position: 50% 50%; background-size: cover; background-image: url('+ product.img +');'" :class="isLoaded === true ? 'product-loaded' : ''"></div>
          </div>
          <div class="inner">
            <div class="display">
              <div class="mask">
                <!-- <h2 class="logo">
                  <router-link to="/">P.A.R.S.</router-link>
                </h2> -->
                <img src="../../static/img/logo_pars_small.png" alt="PARS logo" class="logo">
                <h1 class="caseName">{{ product.name }}</h1>
              </div>
              <div class="line top n1"></div>
              <div class="line top n2"></div>
              <div class="line bottom n1"></div>
              <div class="line bottom n2"></div>
            </div>
            <div class="descCon">
              <p>{{ product.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <section class="section-module dark" style="transition: transform 1s ease; transform: translateY(calc(20vw + 4.4rem));" :class="isLoaded === true ? 'product-loaded' : ''" :style="'background-color:' + product.color + ';'">
        <div>
          <div class="headline-module">
            <div class="inner">
              <h3>{{ product.textblock.title }}</h3>
            </div>
          </div>
          <div class="lead-module">
            <div class="inner">
              <p>{{ product.textblock.textBig }}</p>
            </div>
          </div>
          <div class="doubletext-module">
            <div v-html="product.textblock.textColumn1"></div>
            <div v-html="product.textblock.textColumn2"></div>
          </div>
        </div>
      </section>
      <section class="section-module" v-if="product.textblock.textFull" style="background-color: #fff;">
        <div>
          <div class="doubletext-module" :style="'color:' + product.color + ';'">
            <div style="width:100%;" v-html="product.textblock.textFull"></div>
          </div>
        </div>
      </section>
      <div class="media-grid-module num3" style="background-color:#CE363E;">
        <div class="media image loaded" :style="'background-position: 50% 50%; background-size: cover; background-image: url(' + product.img + ');'"></div>
        <div class="media image loaded" :style="'background-position: 50% 50%; background-size: cover; background-image: url(' + product.img + ');'"></div>
        <div class="media image loaded" :style="'background-position: 50% 50%; background-size: cover; background-image: url(' + product.img + ');'"></div>
      </div>
      <section class="section-module dark" :style="'background-color:' + product.color">
        <div>
          <div class="headline-module">
            <div class="inner">
              <h3>{{ contactpage.name }}</h3>
            </div>
          </div>
          <div class="lead-module">
            <div class="inner">
              <p>{{ contactpage.textblock.textBig }}</p>
            </div>
          </div>
          <div class="doubletext-module">
            <div v-html="contactpage.textblock.textColumn1"></div>
            <div v-html="contactpage.textblock.textColumn2"></div>
          </div>
          <!-- <div class="line-module"></div> -->
        </div>
      </section>
    </div>
    <div id="next-case-module-con" class="next-case-module-con" v-if="product">
      <router-link class="hero-module next-case-module" :to="'/p/' + productNext.slug" :style="'color:' + productNext.color">
        <app-menu></app-menu>
        <div class="inner">
          <div class="display">
            <div class="mask">
              <h2 class="label">Дивимось далі</h2>
              <!-- <h2 class="logo left"><router-link to="/">P.A.R.S.</router-link></h2> -->
              <img src="../../static/img/logo_pars_small.png" alt="PARS logo" class="logo">
              <div class="caseName active" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                <h2>{{ productNext.name }}</h2>
              </div>
            </div>
            <div class="line top n1"></div>
            <div class="line top n2"></div>
            <div class="line bottom n1"></div>
            <div class="line bottom n2"></div>
          </div>
          <div class="descCon">
            <div style="opacity: 0; transform: matrix(1, 0, 0, 1, 0, 0); display: block; pointer-events: all;">
              <div>
                <p>{{ productNext.text }}</p>
              </div>
            </div>
            <!-- <p>Read more</p><svg class="arrow" height="16" width="16"> -->
            <!-- <path d="M14.50000000,7.50000000 L14.50000000,7.50000000 M14.50000000,7.50000000 L14.50000000,7.50000000" fill="none" stroke="#27282c" stroke-width="1px"></path></svg> -->
          </div>
        </div>
        <div class="media image" :style="'background-position: 50% 50%; background-size: cover; background-image: url('+ productNext.img +');'" :class="isLoaded === true ? 'product-loaded' : ''"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import { mapGetters } from 'vuex'
import { TweenLite } from 'gsap'

export default {
  name: 'product',
  components: {
    'app-menu': Menu
  },
  data () {
    return {
      product: {},
      productNext: {},
      contactpage: {},
      animateEnter: false
    }
  },
  computed: {
    ...mapGetters([
      'isLoaded',
      'productBySlug',
      'productNextBySlug',
      'pageBySlug'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('notLoaded')
  },
  created () {
    this.product = this.productBySlug(this.$route.params.product_slug)
    this.contactpage = this.pageBySlug('contact')
    this.productNext = this.productNextBySlug(this.$route.params.product_slug)
    this.$store.dispatch('isLoaded')
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'Product') {
      this.productLeave()
      setTimeout(() => {
        next()
        this.$store.dispatch('notLoaded')
        this.product = this.productBySlug(this.$route.params.product_slug)
        this.productNext = this.productNextBySlug(this.$route.params.product_slug)
        this.productEnter()
        // setTimeout(() => {
        //   document.getElementById('temp').remove()
        // }, 300)
        // this.$store.dispatch('isLoadedMin')
      }, 1000)
    } else next()
  },
  methods: {
    productLeave () {
      let newDiv = document.createElement('div')
      newDiv.id = 'temp'
      newDiv.appendChild(document.getElementById('next-case-module-con').cloneNode(true))
      document.getElementById('page').appendChild(newDiv)
      // document.getElementById('page').appendChild(document.createElement('div').setAttribute('id', 'temp').appendChild(document.getElementById('next-case-module-con').cloneNode(true)))
      // document.getElementById('page').appendChild(document.getElementById('next-case-module-con').cloneNode(true))
      TweenLite.to('#temp .next-case-module', 0.6, {height: '100vh'})
      TweenLite.to('#temp h2.label', 0.3, {scaleX: 0, autoAlpha: 0})
      TweenLite.to('#temp h2.logo', 0.3, {autoAlpha: 1, delay: 0.6})
      TweenLite.to('#temp .descCon > div', 0.3, {autoAlpha: 1, delay: 0.6})
      // TweenLite.to('#temp .next-case-module .nav', 0.3, {autoAlpha: 1, y: 0, delay: 0.6})
      TweenLite.set('#temp .next-case-module-con', {top: 0, delay: 0.6})
      TweenLite.set('.menu', {autoAlpha: 0})
    },
    productEnter () {
      // TweenLite.to('#temp .next-case-module .media.image', 0.9, {scale: 1.3})
      this.$store.dispatch('isLoadedMin')
      setTimeout(() => {
        TweenLite.to('#temp .next-case-module .media.image', 1, {scale: 1.3})
        TweenLite.to('#temp .next-case-module-con', 1, {height: '80vh'})
      }, 300)
      setTimeout(() => {
        document.getElementById('temp').remove()
        TweenLite.to('.menu', 0.3, {autoAlpha: 1})
      }, 1300)
    }
  }
}
</script>

<style scoped>
.page {
  transition: transform 0.9s ease;
}
.section-module.product-loaded {
  transform: translateY(0) !important;
}
.hero-module.hero__page .media {
  top: 0;
  left: 0;
  height: initial;
  width: initial;
  transition: transform 1s ease;
  transform: scale(1.2);
}
.media.image.product-loaded {
  transform: scale(1.3);
}
#temp .next-case-module-con {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  height: inherit;
  overflow: hidden;
}
#temp a, #temp h2, #temp .caseName.active{
  pointer-events: none;
}
#temp .media.image.product-loaded,
#temp .media.image {
  transform: scale(1.2);
  transition: none;
}
.next-case-module .media.image,
.next-case-module .media.image.product-loaded {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}
</style>
