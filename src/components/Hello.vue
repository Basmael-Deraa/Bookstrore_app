<template>
  <div class="hello">
      <h1>Basma Bookstore</h1>
      <ul>
        <li><router-link to="/Books">View Books</router-link></li>
        <span> or </span>
        <li><router-link to="/Login">Log in</router-link></li>
      </ul>
  </div>
</template>

<script>

export default {
  name: "hello"
}

</script>

<style>
.hello ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.hello li {
  display: inline-block;
  border: 2px solid #eee;
  border-radius: 5px;
  padding: 10px 19px;
}
.hello li a {
  color: white;
}
.hello li a:hover {
  text-decoration: none;
  color: white
}
</style>
