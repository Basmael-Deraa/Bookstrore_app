<template>
  <div class="login">
    <div class="container">
      <div class="login-title">
        <h3>Log in</h3>
      </div>
      <div class="row">
        <div class="col-md-6">
          <form class="login-form">
            <div class="row">
              <div class="col-sm-12 form-group">
                <label for="email">E-mail: </label>
                <input id="email" class="form-control" type="email" v-model="email" placeholder="Email" required autofocus>
              </div>
              <div class="col-sm-12 form-group">
                <label for="password">Password: </label>
                <input id="password" class="form-control" type="password" v-model="password" placeholder="Password" required>
              </div>
              <div class="col-sm-12">
                <button class="btn btn-dark form-control" type="submit" @click="handleSubmit()">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
          email : '',
          password : ''
        }
     },
     methods: {
         handleSubmit(e){
          e.preventDefault()
          if (this.password.length > 0) {
            this.$http.post('http://localhost:8080/login', {
              email: this.email,
              password: this.password
            })
            .then(response => {
              let is_admin = response.data.user.is_admin
              localStorage.setItem('user',JSON.stringify(response.data.user))
              localStorage.setItem('jwt',response.data.token)

              if (localStorage.getItem('jwt') != null){
                  this.$emit('loggedIn')
                  if(this.$route.params.nextUrl != null){
                      this.$router.push(this.$route.params.nextUrl)
                  }
                  else {
                      if(is_admin== 1){
                          this.$router.push('admin')
                      }
                      else {
                          this.$router.push('books')
                      }
                  }
              }
            })
            .catch(function (error) {
              console.error(error.response);
            });
          }
        }
     }
  }
</script>

<style>
</style>
