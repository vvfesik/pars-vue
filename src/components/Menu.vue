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
  margin-left: 11.089rem;
  margin-right: 11.089rem;
  /* height: 100px;
  display: flex;
  align-items: center; */
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
  /* color: red; */
  text-decoration: none;
}
</style>
