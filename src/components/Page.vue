<template>
  <div class="page" v-if="page">
    <div class="hero-module hero__page" :style="'color:' + page.colorText">
      <app-menu></app-menu>
      <div class="abstract">
        <div class="mediaCon">
          <div class="media image" :style="'background-position: 50% 50%; background-size: cover; background-image: url('+ page.img +');'" :class="isLoaded === true ? 'page-loaded' : ''"></div>
        </div>
        <div class="inner">
          <div class="display">
            <div class="mask">
              <h2 class="logo">
                <router-link to="/">P.A.R.S.</router-link>
              </h2>
              <h1 class="caseName" style="opacity: 1;">{{ page.name }}</h1>
            </div>
            <div class="line top n1"></div>
            <div class="line top n2"></div>
            <div class="line bottom n1"></div>
            <div class="line bottom n2"></div>
          </div>
          <div class="descCon" style="opacity: 1;"></div>
        </div>
      </div>
    </div>
    <section class="section-module" style="transition: transform 1s ease; transform: translateY(calc(20vw + 4.4rem));" :class="isLoaded === true ? 'page-loaded' : ''" :style="'background-color:' + page.colorBg + ';'">
      <div>
        <div class="headline-module">
          <div class="inner">
            <h3>{{ page.textblock.title }}</h3>
          </div>
        </div>
        <div class="lead-module">
          <div class="inner">
            <p>{{ page.textblock.textBig }}</p>
          </div>
        </div>
        <div class="doubletext-module">
          <div v-html="page.textblock.textColumn1"></div>
          <div v-html="page.textblock.textColumn2"></div>
        </div>
        <div class="line-module"></div>
      </div>
    </section>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import { mapGetters } from 'vuex'
import { TweenLite } from 'gsap'

export default {
  name: 'page',
  components: {
    'app-menu': Menu
  },
  data () {
    return {
      page: {}
    }
  },
  computed: {
    ...mapGetters([
      'isLoaded',
      'pageBySlug'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('notLoaded')
  },
  created () {
    this.page = this.pageBySlug(this.$route.params.page_slug)
    this.$store.dispatch('isLoaded')
  },
  beforeRouteEnter (to, from, next) {
    TweenLite.fromTo('.hero-module .line.top.n1, .hero-module .line.bottom.n1', 0.6, {scaleX: 1}, {scaleX: 0})
    TweenLite.fromTo('.hero-module .line.top.n2, .hero-module .line.bottom.n2', 0.6, {scaleX: 0}, {scaleX: 1, delay: 0.3})
    setTimeout(() => {
      next()
    }, 900)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('notLoaded')
    TweenLite.fromTo('.hero-module .line.top.n1, .hero-module .line.bottom.n1', 0.6, {scaleX: 1}, {scaleX: 0})
    TweenLite.fromTo('.hero-module .line.top.n2, .hero-module .line.bottom.n2', 0.6, {scaleX: 0}, {scaleX: 1, delay: 0.3})
    TweenLite.to('.hero-module h1', 0.3, {autoAlpha: 0, delay: 0.3})
    setTimeout(() => {
      next()
      TweenLite.fromTo('.hero-module h1', 0.3, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.3})
      this.page = this.pageBySlug(this.$route.params.page_slug)
      this.$store.dispatch('isLoaded')
    }, 900)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('notLoaded')
    TweenLite.fromTo('.hero-module .line.top.n1, .hero-module .line.bottom.n1', 0.6, {scaleX: 1}, {scaleX: 0})
    TweenLite.fromTo('.hero-module .line.top.n2, .hero-module .line.bottom.n2', 0.6, {scaleX: 0}, {scaleX: 1, delay: 0.3})
    TweenLite.to('.hero-module h1', 0.3, {autoAlpha: 0, delay: 0.3})
    setTimeout(() => {
      next()
    }, 900)
  }
}
</script>

<style scoped>
.page {
  transition: transform 0.9s ease;
}
.section-module.page-loaded {
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
.media.image.page-loaded {
  transform: scale(1.3);
}

</style>
