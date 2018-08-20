<template>
  <div id="app">
  
  </div>
</template>

<script>
import Login from "./components/login"
import Books from "./components/books"

export default {
  name: 'App',
  components: {
    Login, Books
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
