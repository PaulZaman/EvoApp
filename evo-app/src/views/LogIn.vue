<template>
    <div class="background"></div>
    <div class="container">
        <img src="../assets/evomontreal_logo.png" />
        <ul class="around">
            <li id="title">
                <h1>LOG IN </h1>
            </li>
            <li id="indications">
                <p>PLEASE LOG IN WITH YOUR EVO ACCOUNT</p>
            </li>
        </ul>
        <div id="error-msg" v-if="login_error">Login Failed</div>
        <ul class="MainContentLogIn">
            <li>
                <label for="uname"><b>Email address</b></label>
                <input type="text" placeholder="Enter Email Address" id="uname" v-model="username" required>
            </li>
            <li>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="psw" v-model="password" required>
            </li>
            <li id="remember">
                <label>
                    <input type="checkbox" name="remember"> Remember me
                </label>
            </li>
            <li>
                <button class="buttonLogin" type="submit" @click="login">LOG IN</button>
            </li>
            <li>
                <p></p>
            </li>
            <li>
                <router-link to="/SignUp">
                    <button class="buttonSignUp" type="submit">SIGN UP</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            remember: false,
            login_error: false,
        }
    },

    watch: {
        login_error: function () {
            let usernamediv = document.getElementById("uname");
            let passworddiv = document.getElementById("psw");
            usernamediv.style.border = "1px solid  #ff5757";
            passworddiv.style.border = "1px solid  #ff5757";
        },
    },
    methods: {
        login() {
            this.postData('api/users/login', {
                "email": this.username,
                "password": this.password,
            }).then((result) => {
                if (result.token) {
                    // sucess
                    const token = result.token
                    const userId = result.id
                    this.$store.dispatch('setInfo', {
                        token,
                        userId
                    });
                    this.$router.push('/home')
                } else {
                    // failure
                    this.login_error = true
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        postData: async function (url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        },
    },

    async beforeMount() {
        if (await this.$store.dispatch('isLogged')) {
            this.$router.push('/profile')
        }
    }
}
</script>


<style lang="scss" scoped>
* {
    transition: all 0.2s;
}

#error-msg {
    color: red;
    font-size: 20px;
    margin: 0px;
    padding: 0px;
}

.background {
    background-image: url(../assets/evoBuilding.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(2px);
    position: fixed;
    z-index: -1;
    top: 0px;

}

.container {
    background-color: white;
    padding: 60px;
    width: 400px;
    margin: auto;
    margin-top: 40px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 15px;
    border: 5px solid rgb(178, 198, 210);
}

@media screen and (max-width: 621px) {
    .container {
        width: 300px;
    }
}

@media screen and (max-width: 480px) {
    .container {
        width: 90%;
        padding: 10px;
    }
}

img {
    align-items: left;
}

input {
    border: 2px solid rgb(178, 198, 210);
    border-radius: 30px;
    text-align: center;
    margin-left: 20px;
    height: 50px;
    width: 200px;
    font-size: 15px;
}

.MainContentLogIn {
    list-style-type: none;
    margin-top: 40px;
    padding-left: 0px;
}

.around {
    list-style-type: none;
    text-align: left;
    padding-left: 0px;

}

label {
    margin-right: 10px;
    color: black;
}

li {
    margin: 20px;
}

.buttonLogin,
.buttonSignUp {
    border: 2px solid #00CED1;
    background-color: white;
    border-radius: 25px;
    width: 80px;
    height: 30px;
}

.buttonLogin:hover {
    transform: scale(1.2);
    background-color: #00CED1;
    font-style: bold;
}

.buttonSignUp:hover {
    transform: scale(1.2);
    background-color: #00CED1;
    font-style: bold;
}

#remember {
    label {
        padding-bottom: 10px;
    }

    input {
        width: 10px;
        height: 22px
    }
}
</style>