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
                <h2 class="logo">
                  <router-link to="/">P.A.R.S.</router-link>
                </h2>
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
              <h3>About</h3>
            </div>
          </div>
          <div class="lead-module">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt sed maxime voluptate quia deserunt modi vero, commodi, nostrum sunt, sapiente voluptas optio. Neque sequi earum, culpa voluptas officiis laboriosam accusantium.</p>
            </div>
          </div>
          <div class="doubletext-module">
            <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, provident! Tempore, natus! Voluptatum mollitia dolorem fugit modi pariatur et impedit placeat, fuga accusamus quibusdam consectetur excepturi aliquam. Asperiores, perspiciatis nulla!</p>
            </div>
            <div>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint optio distinctio, corrupti tenetur reiciendis aliquam. Nobis labore voluptate soluta incidunt id nisi, quam iure officia est culpa corrupti commodi deserunt.</p>
            </div>
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
              <h3>Contact</h3>
            </div>
          </div>
          <div class="doubletext-module">
            <div>
              <h4>Rokoko</h4>
              <p><span>Sankt Gertruds Stræde 6E</span></p>
              <p><span>1129 Copenhagen K</span></p>
              <p><span>Denmark</span></p>
            </div>
            <div>
              <h4>Visit</h4>
              <p><a href="https://www.rokoko.com/" rel="noopener noreferrer" target="_blank" title="Rokoko.com">Rokoko.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="next-case-module-con" class="next-case-module-con" v-if="product">
      <router-link class="hero-module next-case-module" :to="'/p/' + productNext.slug" :style="'color:' + productNext.color">
        <div class="nav desktopNav">
          <ul>
            <li>
              <p>Portfolio</p>
            </li>
            <li>
              <p>About</p>
            </li>
            <li>
              <p>Contact</p>
            </li>
          </ul>
        </div>
        <div class="inner">
          <div class="display">
            <div class="mask">
              <h2 class="label">Дивимось далі</h2>
              <h2 class="logo left"><router-link to="/">P.A.R.S.</router-link></h2>
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
      animateEnter: false
    }
  },
  computed: {
    ...mapGetters([
      'isLoaded',
      'productBySlug',
      'productNextBySlug'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('notLoaded')
  },
  created () {
    this.product = this.productBySlug(this.$route.params.product_slug)
    this.productNext = this.productNextBySlug(this.$route.params.product_slug)
    this.$store.dispatch('isLoaded')
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to.name)
    if (to.name === 'Product') {
      this.productLeave()
      // setTimeout(() => {
      //   next()
      //   this.productEnter()
      //   this.$store.dispatch('notLoaded')
      //   this.product = this.productBySlug(this.$route.params.product_slug)
      //   this.productNext = this.productNextBySlug(this.$route.params.product_slug)
      //   this.$store.dispatch('isLoaded')
      // }, 1000)
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
    },
    // productLeave () {
    //   TweenLite.to('.next-case-module-con, .next-case-module', 0.6, {height: '100vh'})
    //   TweenLite.set('.next-case-module', {position: 'absolute', bottom: 0, pointerEvents: 'none'})
    //   TweenLite.to('.next-case-module h2.label', 0.3, {scaleX: 0})
    //   TweenLite.fromTo('.next-case-module h2.logo', 0.3, {scale: 0}, {autoAlpha: 1, scale: 0.333, delay: 0.6})
    //   TweenLite.to('.next-case-module .descCon > div', 0.3, {autoAlpha: 1, delay: 0.6})
    //   TweenLite.set('.maincontent', {autoAlpha: 0})
    //   TweenLite.to('.maincontent', 0.6, {height: 0})
    //   TweenLite.to('.next-case-module-con', 0.1, {autoAlpha: 0, delay: 0.9})
    // },
    productEnter () {
      TweenLite.set('.next-case-module-con, .next-case-module, .next-case-module h2.label, .next-case-module h2.logo, .next-case-module .descCon > div, .maincontent', {height: 'initial', position: 'initial', bottom: 'initial', pointerEvents: 'initial', scaleX: 1, scale: 1, autoAlpha: 1})
    }
  }
}
</script>

<style scoped>
.page {
  transition: transform 0.9s ease;
}
/* .page.animateEnter {
  transform: translateY(-20vh);
}
.page.animateEnter .hero-module {
  transition: color .36s cubic-bezier(.455,.03,.515,.955), transform 1s ease;
  transform-origin: bottom;
  transform: translateY(20vh);
} */
/* .hero-module.hero__page .media {
  transition: transform 1s ease;
  transform: scale(1);
}
.hero-module.hero__page.animate .media {
  transform: scale(1.2);
} */
.section-module.product-loaded {
  transform: translateY(0) !important;
}
.hero-module.hero__page .media {
  top: 0;
  left: 0;
  height: initial;
  width: initial;
  transition: transform 1s ease;
  transform: scale(1);
}
.media.image.product-loaded {
  transform: scale(1.2);
}
</style>
