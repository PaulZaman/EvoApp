<template>
	<h1 hidden="true" id="error">{{error_msg}}</h1>
	<div class="calendar-container">
		<div class="header">
			<ul class="utensils">
				<li>Small Hob 1</li>
				<li>Small Hob 2</li>
				<li>Big Hob 1</li>
				<li>Big Hob 2</li>
			</ul>
		</div>

		<div class="timeslots-container">
			<ul class="timeslots">
				<li>00h</li>
				<li>1h</li>
				<li>2h</li>
				<li>3h</li>
				<li>4h</li>
				<li>5h</li>
				<li>6h</li>
				<li>7h</li>
				<li>8h</li>
				<li>9h</li>
				<li>10h</li>
				<li>11h</li>
				<li>12h</li>
				<li>13h</li>
				<li>14h</li>
				<li>15h</li>
				<li>16h</li>
				<li>17h</li>
				<li>18h</li>
				<li>19h</li>
				<li>20h</li>
				<li>21h</li>
				<li>22h</li>
				<li>23h</li>
			</ul>
		</div>

		<div class="event-container">

		</div>
	</div>
</template>

<script>

export default {
	name: "TimeTable",
	props: {
		dt: String,
		refresh: Boolean,
	},
	data() {
		return {
			data: Object,
			utensils: ["Small Hob 1", "Small Hob 2", "Big Hob 1", "Big Hob 2"],
			error_msg: "No connection to server"
		}
	},
	watch: {
		dt() {
			this.remove_all_uses();
			this.get_data();
		},
		refresh() {
			this.remove_all_uses();
			this.get_data();
		}
	},
	methods: {
		get_data: function () {
			fetch('api/use/kitchen?dt=' + this.dt).then((response) => {
				if (response.ok) {
					let errordiv = document.getElementById("error");
					errordiv.hidden = true;
					return response.json();
				} else {
					let errordiv = document.getElementById("error");
					errordiv.hidden = false;
				}
				return response.json()
			}).then((json) => {
				console.log(json)
				this.data = json
				this.mount_data(json)
			})
		},
		remove_all_uses: function () {
			let event_container = document.querySelector(".event-container");
			while (event_container.firstChild) {
				event_container.removeChild(event_container.firstChild);
			}
		},
		mount_data: function (data) {
			for (var i = 0; i < data.length; i++) {
				// Parse the data
				let start = data[i].start
				let end = data[i].end

				// get hours and minutes from start and end
				let start_hour = start.slice(11, 13)
				let start_min = start.slice(14, 16)
				let end_hour = end.slice(11, 13)
				let end_min = end.slice(14, 16)
				// calculate the  column of event
				let col = this.utensils.indexOf(data[i].utensil.name) + 1
				// get username
				let nameuser = data[i].user.firstname
				this.render_event(col, parseInt(start_hour), parseInt(start_min), parseInt(end_hour), parseInt(end_min), nameuser)
			}
		},
		render_event(col, hourbeg, minbeg, hourend, minend, nameuser) {
			let eventContainer = document.getElementsByClassName("event-container")[0]
			var Event = document.createElement("div");
			var name = document.createElement("a");

			// Event styling
			Event.style.gridColumnStart = col;
			if (parseInt(hourbeg) == 0) {
				Event.style.gridRowStart = 1 + minbeg;
			}
			else {
				Event.style.gridRowStart = hourbeg * 60 + minbeg;
			}

			Event.style.gridRowEnd = hourend * 60 + minend;
			Event.style.backgroundColor = '#00CED1';

			Event.style.borderRadius = '5px';
			Event.style.zIndex = "3";
			Event.style.border = "1px solid grey";
			// name styling
			name.style.position = 'relative';
			name.style.zIndex = "-1"
			name.style.textAlign = 'center';
			name.innerHTML = nameuser;

			// add clases
			Event.className = "events";
			name.className = "event-name"

			// add cross to delete

			/*if (this.$store.state.userId == userid) {
			var cross = document.createElement("div");
			var cross_image = require('../assets/cross.png');
			cross.style.width = "20px";
			cross.style.height = "20px";
			cross.style.backgroundImage = "url(" + cross_image + ")";
			cross.style.backgroundSize = "20px 20px";
			cross.style.zIndex = "1";
			// make cross clickable
			cross.addEventListener("click", () => {
				this.deleteUse(userid);
			});
			// bring event to front
			Event.addEventListener("mouseover", () => {
				Event.style.zIndex = "4";
			});
			cross.style.position = "relative";
			Event.appendChild(cross);
			//}
			*/

			/* add to screen */
			Event.appendChild(name);
			eventContainer.appendChild(Event);

		},
	},

}
</script>

<style scoped>
li {
	list-style: none;
}

#error {
	color: red;
}

ul {
	margin: 0px;
	padding: 0px;
}

.calendar-container {
	border-radius: 10px;
	display: grid;
	grid-template-columns: 50px auto;
	grid-template-rows: auto;
	width: 80%;
	grid-template-areas:
		". header"
		"timeslots-container main";
	margin: auto;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
	z-index: -1;
}

.utensils {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	background: rgb(194, 194, 194);
	min-height: 2em;
}

.utensils li {
	border-right: 1px solid black;
}

.header {
	background: white;
	grid-area: header;
}

.timeslots-container {
	background: lightblue;
	grid-area: timeslots-container;
	justify-items: left;
}

.timeslots {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.timeslots li {
	height: 60px;
}

.timeslots li::after {
	/* vertical lines */
	content: "";
	position: absolute;
	left: 10%;
	right: 10%;
	margin-left: 95px;
	margin-right: 2px;
	height: 1px;
	background: #afafaf;
	text-align: center;
	z-index: -1;
}

.event-container {
	margin: 0px;
	padding: 0px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(1441, 1fr);
	height: 1443px;
	background: rgb(222, 223, 231);
	grid-area: main;
	position: relative;
	white-space: nowrap;
	background: repeating-linear-gradient(to right, transparent 0%, transparent 24.5%, gray 25%);
	z-index: -1;
}
</style>