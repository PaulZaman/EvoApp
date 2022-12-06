<template>
    <div class="background"></div>
    <div class="container">
        <ul class="around">
            <li id="title">
                <ul class="headertitle">
                    <li>
                        <h1>SIGN UP </h1>
                    </li>
                    <li><img src="../assets/evomontreal_logo.png" /></li>
                </ul>
            </li>
            <li id="indications">
                <p>PLEASE SIGN UP WITH YOUR INFORMATION</p>
                <div id="errordiv">{{errormsg}}</div>
            </li>
        </ul>
        <ul class="MainContentLogIn">
            <li>
                <label for="fname"><b>FIRST NAME</b></label>
                <input class="forminput" type="name" placeholder="Enter your first name" v-model="fname" required>
            </li>
            <li>
                <label for="lname"><b>LAST NAME</b></label>
                <input class="forminput" type="name" placeholder="Enter your last name" v-model="lname" required>
            </li>
            <li>
                <label for="room"><b>ROOM NUMBER</b></label>
                <input class="forminput" type="integer" placeholder="Enter your room number" v-model="room" required>
            </li>
            <li>
                <label for="kitchenNumber"><b>KITCHEN NUMBER</b></label>
                <input class="forminput" type="integer" placeholder="Enter your Kitchen number" v-model="kitchenNumber"
                    required>
            </li>
            <li>
                <label for="email"><b>EMAIL</b></label>
                <input class="forminput" type="email" placeholder="Enter Email" v-model="email" required>
            </li>
            <li>
                <label for="psw"><b>PASSWORD</b></label>
                <input class="forminput" type="password" placeholder="Enter Password" v-model="psw" required>
            </li>
            <li id="remember">
                <label>
                    <input type="checkbox" name="remember"> Remember me
                </label>
            </li>
            <li>
                <button class="buttonSignUp" @click="signUp">SIGN UP</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            fname: '',
            lname: '',
            room: '',
            email: '',
            kitchenNumber: '',
            psw: '',
            errormsg: '',
        }
    },
    methods: {
        signUp() {
            if (this.fname == '' || this.lname == '' || this.room == '' || this.email == '' || this.psw == '' || this.room) {
                this.throwerror('Please fill all the fields')
            }
            const user = {
                "firstname": this.fname,
                "lastname": this.lname,
                "email": this.email,
                "kitchenNumber": this.kitchenNumber,
                "roomnumber": this.room,
                "password": this.psw,
            }
            this.postData('api/users', user).then(data => {
                if (data.message) {
                    this.throwerror(data.message)
                }
                else {
                    this.errormsg = 'User created successfully'
                    let errordiv = document.getElementById("errordiv");
                    errordiv.style.color = "#00ff00";
                    errordiv.style.fontSize = "30px";
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);

                }
            })

        },
        throwerror(message) {
            this.errormsg = message
            const inputs = document.getElementsByClassName('forminput')
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.borderColor = "1px solid  #ff5757"
            }
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
    }

}

</script>

<style lang="scss" scoped>
* {
    transition: all 0.2s;
}

B {
    font-size: 14px;
}

#errordiv {
    color: red;
    text-align: center;
    font-size: 20px;
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
    padding-top: 30px;
    padding-bottom: 30px;
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
    height: 100px;
}

.headertitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    list-style: none;

    li {
        margin: 0px;
    }
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
    margin-right: 5px;
    color: black;
}

li {
    margin: 20px;
}

.buttonSignUp {
    border: 2px solid #00CED1;
    background-color: white;
    border-radius: 25px;
    width: 70px;
    height: 30px;
    font-size: 12px;
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