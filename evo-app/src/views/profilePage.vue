<template>
    <div class="background"></div>
    <div class="container">
        <img src="../assets/user-profil.png" />
        <ul class="around">
            <li id="title">
                <h1>YOUR PROFILE</h1>
            </li>
        </ul>
        <ul class="MainContent">
            <li>
                <p>{{user.firstname + " " + user.lastname}}</p>
            </li>
            <li>
                <p>Room Number : {{user.roomnumber}}</p>
            </li>
            <li>
                <p>Kitchen Number : {{user.kitchenNumber}}</p>
            </li>
        </ul>
        <router-link to="/">
            <button class="buttonLogout" @click="logout">LOG OUT</button>
        </router-link>
    </div>
    <div class="spacing">

    </div>
</template>

<script>

export default {

    name: 'ProfileView',
    data() {
        return {
            user: [],
        }
    },
    methods: {
        get_data() {
            fetch('api/users/find?id=' + localStorage.getItem('userId'))
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    this.user = json
                    console.log(json)
                })
        },
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
    },
    async beforeMount() {
        let logged = await this.$store.dispatch('isLogged')
        if (!logged) {
            this.$router.push('/')
        }
        this.get_data()
    }
}
</script>
>

<style lang="scss" scoped>
* {
    transition: all 0.2s;
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
    width: 40%;
    height: 70%;
    margin: auto;
    margin-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 15px;
    border: 5px solid rgb(178, 198, 210);
    vertical-align: middle;
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
    width: 50%;
}

.MainContent {
    list-style-type: none;
    margin-top: 40px;
    padding-left: 0px;
    padding-bottom: 20px;
}

.around {
    list-style-type: none;
    text-align: center;
    padding-left: 0px;

}

li {
    margin: 20px;
}

.buttonLogout {
    border: 2px solid #00CED1;
    background-color: white;
    border-radius: 25px;
    width: 80px;
    height: 30px;
}

.buttonLogout:hover {
    transform: scale(1.2);
    background-color: #00CED1;
    font-style: bold;
}

p {
    font-size: 20px;
    font-weight: 500;
}

.spacing {
    height: 500px;
}
</style>