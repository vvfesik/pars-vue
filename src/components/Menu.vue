<template>
  <div class="menu nav desktopNav">
    <ul>
      <li><router-link to="/">Каталог</router-link></li>
      <li v-for="(page, index) in pages" :key="index" v-if="pages">
        <router-link :to="{ name: 'Page', params: { page_slug: page.slug } }">{{ page.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'menu',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'pages'
    ])
  }
}
</script>

<style scoped>
.menu {
  max-width: 1440px;
  margin-left: 2.618rem;
  margin-right: 2.618rem;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  padding: 20px;
  text-transform: uppercase;
  text-decoration: none;
}
@media screen and (min-width: 321px) {
  .menu {
    margin-left: 2.618rem;
    margin-right: 2.618rem;
  }
}
@media screen and (min-width: 769px) {
  .menu {
    margin-left: 4.236rem;
    margin-right: 4.236rem;
  }
}
@media screen and (min-width: 1024px) {
  .menu {
    margin-left: 6.854rem;
    margin-right: 6.854rem;
  }
}
@media screen and (min-width: 1440px) {
  .menu {
    margin-left: 11.089rem;
    margin-right: 11.089rem;
  }
}
@media screen and (min-width: 1550px) {
  .menu {
    margin: 0 auto;
  }
}
@media screen and (max-width: 375px) {
  .menu ul {
    justify-content: space-around;
  }
  .menu ul li:first-child {
    margin-left: initial;
  }
  .menu ul li a {
    padding: 0;
  }
}
</style>
