<template>
  <div class="hello">
      <h1>Basma Bookstore</h1>
      <ul>
        <li><router-link to="/books">View books</router-link></li>
        <span> or </span>
        <li><router-link to="/login">Log in</router-link></li>
      </ul>
  </div>
</template>

<script>

export default {
  name: "hello"
}

</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
li {
  display: inline-block;
  border: 2px solid #eee;
  border-radius: 5px;
  padding: 10px 19px;
}
li a {
  color: white;
}
li a:hover {
  text-decoration: none;
  color: white
}
</style>
