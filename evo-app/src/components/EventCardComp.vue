<template>
    <div id="card-container">
        <h1>{{title}}<br>{{date}}</h1>
        <h2>{{organisator}}</h2>
        <div class="rows">
            <div class="box">
                <div><img src="../assets/vieux-montreal.jpg" /></div>
            </div>
            <div class="box" id="second">
                <h3>{{description}}</h3>
                <a>Meet-up point : {{location}} </a><br>
                <a>Date : {{date}} </a><br>
                <a>Time : {{time}} </a><br>
                <button @click="displayParticipants" v-if="particpantButtonDispalyed">Participants</button>
                <ul id="participant-list" v-if="participantsDisplayed">
                    <li v-for="participant in participations" :key="participant.id">
                        {{participant.user.firstname + " " + participant.user.lastname}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActivityCard',
    props: {
        organisatorId: Number,
        title: String,
        description: String,
        datejson: String,
        time: String,
        location: String,
        participants: String,
        image: String,
        particpantButtonDispalyed: Boolean,
    },
    data() {
        return {
            date: new Date(this.datejson).toDateString(),
            organisator: String,
            participations: "",
            participantsDisplayed: false,
        }
    },
    mounted() {
        fetch('api/users/find?id=' + this.organisatorId)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.organisator = json.firstname + " " + json.lastname
                if (this.participants) {
                    this.participations = JSON.parse(this.participants)
                }
            })

    },
    methods: {
        displayParticipants() {
            this.participantsDisplayed = !this.participantsDisplayed
        }
    },
}
</script>

<style scoped lang="scss">
* {
    margin: 0px;
}

#participant-list {
    border-radius: 3px;
    padding: 0px;
    list-style-type: none;
    position: relative;
    width: 100px;
    height: auto;
    background-color: #f9f9f9;
    // center element
    margin: 0 auto;
    top: 0px;
    background-color: #ffffff;
    border: 3px solid #5b839d;
    border-radius: 5px;

    li {
        border-top: 0.5px solid #5b839d;
        color: #5b839d;
        font-size: 11px;
        font-weight: bold;
    }

}


#card-container {
    width: 60%;
    margin: auto;
    margin-bottom: 75px;
    margin-top: 0x;
    height: auto;
    background-color: #8ca7ba;
    border-radius: 20px;
    border: 5px solid white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    color: white;
    transition: all 0.3s;
}

img {
    position: relative;
    margin: auto;
    text-align: center;
    top: 0px;
    height: 150px;
    width: 200px;
    border-radius: 20px;
}

#second {
    width: 320px;
}

.rows {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.box {
    padding: 20px;
    width: 200px;
}

h1 {
    margin-top: 20px;
}


button {
    background-color: white;
    border-radius: 5px;
    border: 3px solid #00CED1;
    color: #00CED1;
    margin: 15px;
    font-weight: bold;
}

button:hover {
    transform: scale(1.2);
    transition: all 0.3s;
}

@media screen and (max-width: 600px) {
    #card-container {
        margin-left: 5px;
        margin-right: 5px;
        width: auto;
    }
}
</style>