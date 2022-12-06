<template>
	<div class="background"></div>
	<HeaderComp title="EVENTS"></HeaderComp>
	<h1 v-if=is_there_events>NEXT EVENTS AT EVO</h1>
	<NewEventComponent v-if=is_there_events @reload='get_data' />
	<div id="noEvents" v-if=!is_there_events>
		<h2>THERE ARE NO EVENTS TO WHICH YOU CAN PARTICIPATE YET !</h2>
		<h2>DON'T HESITATE TO CREATE, ADD AND HOST AN EVENT :)</h2>
		<h3>PING PONG, SWIMMING POOL, BILLARD, TERRASSE...</h3>
		<NewEventComponent @reload='get_data' />
	</div>
	<EventCard v-for="event in events" :title="event.name" :description="event.description" :datejson="event.date"
		:time="event.date.slice(11, 16)" :location="event.location" :organisatorId="event.organisatorId"
		:participants="JSON.stringify(event.participations)" :key="event.id" @redOrderBtn="btncolor='red'"
		:particpantButtonDispalyed=true />
</template>

<script>
import HeaderComp from "../components/headerComp.vue"
import NewEventComponent from '@/components/NewEventComponent.vue'
import EventCard from '../components/EventCardComp.vue'
export default {
	name: "ActivityView",
	data() {
		return {
			events: [],
			is_there_events: false,

		}
	},
	components: {
		//ActivityCard,
		HeaderComp,
		NewEventComponent,
		EventCard
	},
	methods: {
		get_data() {
			fetch('api/event/chronological')
				.then((response) => {
					return response.json()
				})
				.then((json) => {
					this.events = json
					//console.log(json)
					if (this.events.length > 0) {
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
	}
}
</script>

<style scoped lang="scss">
.background {
	background-image: url(../assets/flou.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	width: 100%;
	height: 900px;
	position: fixed;
	z-index: -1;
	top: 0px;

}




h1 {
	color: white;
	background-color: #00CED1;
	width: 50%;
	margin: auto;
	margin-top: 50px;
	margin-bottom: 20px;
	border-radius: 15px;
	border: 3px solid white;
}

#noEvents {
	color: white;
	background-color: #8ca7ba;
	width: 70%;
	margin: auto;
	margin-top: 120px;

	border-radius: 15px;
	border: 3px solid white;

	h2 {
		font-size: 30px;
		margin-bottom: 50px;
	}

	@media screen and (max-width: 550px) {
		h1 {
			margin: 0px;
		}
	}
}
</style>