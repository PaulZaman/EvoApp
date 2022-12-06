<template>
  <HeaderComp title="HOME"></HeaderComp>
  <div class="background-img"></div>

  <div class="mainContent">
    <div class="row">
      <div id="box">
        <div class="col" id="events" v-if="is_there_events">
          <EventCard :title="event.name" :description="event.description" :time="event.date.slice(11, 16)"
            :datejson="event.date" :location="event.location" :organisatorId="event.organisatorId"
            :participants="JSON.stringify(event.participants)" style="width:100%" :particpantButtonDispalyed=false />
        </div>
        <div class="col" id="kitchen">
          <h1>YOUR KITCHEN</h1>
          <ul>
            <li>
              <p>Discover the best time to eat and use your kitchen today !</p>
              <p>Make a reservation ! :)</p>
            </li>
            <li>
              <router-link to="/kitchen"><img src="../assets/kitchen.jpg" /></router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col" id="about">
        <h1>ABOUT US</h1>
        <ul>
          <li>
            <router-link to="/about"><img src="../assets/evo-logo.png" /></router-link>
          </li>
          <li>
            <p>This web site has been created especially for evo's residents.</p>
            <p>We know the issues you face being either new to the city or resident here in evo.</p>
            <p>As our guests, we created this web site to enhance and brighten your stay.</p>
            <p>The events page is here to keep you informed on what is happening in and at evo.</p>
            <p>You can therefore participate to activities, to hang outs and parties that are posted but also post your
              own.</p>
            <p>The kitchen page allows you to check the reservations made for the utilities but also to make your own
              reservation.</p>
            <p class="last_phrase">We hope this web site we will help and don't hesitate to keep us informed on any
              enhancements we could make :).</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script scoped>
import HeaderComp from "../components/headerComp.vue"
import EventCard from "../components/EventCardComp.vue"


export default {
  name: "HomeView",
  components: { HeaderComp, EventCard },
  data() {
    return {
      event: {},
      is_there_events: false,
    }
  },
  methods: {
    get_data() {
      fetch('api/event/recent')
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.event = json[0]
          if (typeof this.event != "undefined") {
            this.is_there_events = true
          }
        })
    },
  },

  async beforeMount() {
    let logged = await this.$store.dispatch('isLogged')
    if (!logged) {
      this.$router.push('/')
    }
    this.get_data()
  },
}
</script>

<style lang="scss" scoped>
.background-img {
  background-image: url(../assets/montreal-night.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  top: 0px;
}

#box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

}

.row {
  width: 80%;
  margin: auto;
}


h1 {
  color: white;
}

#events {
  flex-grow: 2;
  margin-right: 20px;

  p {
    color: white;
  }
}

#kitchen {
  width: 300px;
  background-color: #8ca7ba;
  border: 5px solid white;
  border-radius: 15px;
  height: 335px;

  ul {
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
  }

  img {
    max-height: 100px;
    width: auto;
    border-radius: 50%;
    border: 2px solid white;
  }

  p {

    color: white;
  }
}

@media screen and (max-width: 1088px) {
  #kitchen {
    margin-top: 0px;
  }
}

#about {
  margin-top: 50px;
  background-color: #8ca7ba;
  border: 5px solid white;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  p {
    color: white;
    text-align: left;
    margin-left: 20px;
  }

  img {
    margin: auto;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    margin: auto;
    padding: 0;
  }

  li {
    max-width: 600px;
  }

  .last_phrase {
    padding-bottom: 50px;
  }
}
</style>