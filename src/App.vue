<template>
  <div id="app">
    <div class="pages">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* #app {
  font-family: Tahoma, sans-serif;
} */
.hero-module .line.top.n1, .hero-module .line.bottom.n2 {
  transform-origin: left;
}
.hero-module .line.top.n2, .hero-module .line.bottom.n1 {
  transform-origin: right;
}
.hero-module img.logo {
  max-width: initial;
  transform: scale(1) !important;
}
</style>
