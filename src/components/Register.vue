<template>
    <div class="register">
        <div class="container">
            <div class="register-title">
                <h3>Register</h3>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <form class="form">
                        <div class="row">
                            <div class="col-sm-12 form-group">
                                <label for="name">Name</label>
                                <input id="name" class="form-control" type="text" v-model="name" required autofocus>
                            </div>
                            <div class="col-sm-12 form-group">
                                <label for="email">E-Mail</label>
                                <input id="email" class="form-control" type="email" v-model="email" required>
                            </div>
                            <div class="col-sm-12 form-group">
                                <label for="password">Password</label>
                                <input id="password" class="form-control" type="password" v-model="password" required>
                            </div>
                            <div class="col-sm-12 form-group">
                                <label for="password-confirm">Confirm Password</label>
                                <input id="password-confirm" class="form-control" type="password" v-model="password_confirmation" required>
                            </div>
                            <div class="col-sm-12 form-group">
                                <label for="password-confirm">Is this an administrator account?</label>
                                <select v-model="is_admin">
                                    <option value=1>Yes</option>
                                    <option value=0>No</option>
                                </select>
                            </div>
                            <div class="col-sm-12 form-group">
                                <button class="btn btn-dark form-control" type="submit" @click="handleSubmit">Register</button>
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
        name: 'register',
        props: ["nextUrl"],
        data() {
            return {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                is_admin: null
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()

                if (this.password === this.password_confirmation && this.password.length > 0) {
                    let url = "http://localhost:3000/register"
                    if (this.is_admin != null || this.is_admin == 1) url = "http://localhost:3000/register-admin"
                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                        .then(response => {
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                            localStorage.setItem('jwt', response.data.token)

                            if (localStorage.getItem('jwt') != null) {
                                this.$emit('loggedIn')
                                if (this.$route.params.nextUrl != null) {
                                    this.$router.push(this.$route.params.nextUrl)
                                }
                                else {
                                    this.$router.push('/')
                                }
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    this.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match")
                }
            }
        }
    }
</script>