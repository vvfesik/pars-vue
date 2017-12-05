<template>
  <div class="menu nav desktopNav">
    <ul>
      <li><router-link to="/">Portfolio</router-link></li>
      <li><router-link to="/about/">About</router-link></li>
      <li><router-link to="/contact/">Contact</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
    }
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
