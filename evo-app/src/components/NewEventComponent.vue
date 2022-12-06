<template>
	<div id="buttons-event">
		<ul>
			<li>
				<button id="btn" @click='open_popup'></button>
			</li>
			<li>
				<p>ADD EVENT</p>
			</li>
		</ul>

	</div>
	<div id="popup-container">
		<div id="popup" class="popup-hidden">
			<form v-if=popupshown>
				<h1>New Event</h1>
				<div id='error' v-if="error">{{errormsg}}</div>
				<div id="form-center-container">
					<ul class="form">
						<li>
							<ul class="couple">
								<li>
									<label>Enter a name for your event :</label>
								</li>
								<li>
									<input type='text' v-model="event_name" placeholder="Event name" />
								</li>
							</ul>
						</li>
						<li>
							<ul class="couple">
								<li>
									<label>Enter a description :</label>
								</li>
								<li>
									<textarea name="event-description" id='description' v-model='event_description'
										placeholder="This event..."> </textarea>
								</li>
							</ul>
						</li>
						<li>
							<ul class="couple">
								<li>
									<label>Enter a location for meet up:</label>
								</li>
								<li>
									<input type="text" v-model="event_location" placeholder="777 boulevard..." />
								</li>
							</ul>
						</li>
						<li>
							<ul class="couple">
								<li>
									<label>Enter a date for meet up :</label>
								</li>
								<li>
									<input type="date" v-model="date" id='time' />
								</li>
							</ul>
						</li>
						<li>
							<ul class="couple">
								<li>
									<label>Enter a time for meet up :</label>
								</li>
								<li>
									<input type="time" v-model="event_time" id="time" />
								</li>
							</ul>
							<div class="chooseParticipants">

							</div>
						</li>
					</ul>
				</div>

				<div id='buttons'>
					<button type="button" id="cancel" @click='close_popup'></button>
					<button type="button" id="publish" @click="publish"></button>
				</div>

				<label>

				</label>
			</form>
		</div>
	</div>

</template>

<script>


export default {
	name: 'NewEventComp',
	emits: ['reload'],
	data() {
		return {
			popupshown: false,
			event_name: '',
			event_location: '',
			event_time: '',
			event_description: '',
			date: '',
			error: false,
			errormsg: "Error",
		}
	},
	methods: {
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
		publish() {
			if (!this.event_name || !this.event_location || !this.event_time || !this.event_description) {
				this.error = true;
				this.errormsg = 'Missing information'
				return;
			}
			let date = new Date()
			date.setHours(date.getHours() - 4)
			date = date.toISOString().slice(0, 10)
			if (this.date < date) {
				this.error = true;
				this.errormsg = 'Event date must be after the current date'
				return;
			}
			var data = {
				"name": this.event_name,
				"description": this.event_description,
				"date": this.date + "T" + this.event_time + ":00.000Z",
				"location": this.event_location,
				"organisatorId": localStorage.getItem('userId'),
				"participants": []
			}

			this.postData('api/event', data)
			this.close_popup();
			window.location.reload();
			this.error = false;

		},
		open_popup() {
			let popup = document.getElementById('popup');
			popup.classList.remove('popup-hidden');
			popup.classList.add('popup-shown');
			setTimeout(() => { this.popupshown = true }, 350);
		},
		close_popup() {
			this.popupshown = false;
			let popup = document.getElementById('popup');
			popup.classList.remove('popup-shown');
			popup.classList.add('popup-hidden');

		}

	}

}
</script>

<style scoped lang="scss">
* {
	color: white;
}

.couple,
.form {
	list-style-type: none;
	padding: 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
}

#form-center-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
}

p {
	font-size: 12px;
	font-weight: bold;
}

#imglabel {
	line-height: 77px;
}

#buttons {
	display: flex;
	justify-content: center;

}

#buttons-event {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
	padding-top: 30px;

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
}

#popup-container {
	transition: all 0.3s;
	display: flex;
	justify-content: center;
	width: 50%;
	height: auto;
	margin: 0 auto;
}

#btn {
	transition: all 0.3s;
	background-image: url("../assets/plus.png");
	background-size: cover;
	height: 40px;
	width: 40px;
	border: 5px solid #00CED1;
	background-color: #00CED1;
	border-radius: 50px;
	margin: 3px;
}

#error {
	color: red;
	font-size: 20px;
	font-weight: bold;
	display: flex;
	justify-content: center;
}

#btn:hover {
	transform: scale(1.3);
}

#popup {
	transition: all 0.5s;
}

.popup-shown {
	position: fixed;
	top: 100px;
	width: 320px;
	height: 600px;
	background-color: rgb(123, 202, 229);
	border: 5px solid white;
	z-index: 1;
	border-radius: 30px;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.popup-hidden {
	position: absolute;
	width: 10px;
	height: 10px;
	top: 200px;
	margin: auto;
	margin-right: 100px;
	z-index: -1;
}


label {
	font-size: medium;
	font-style: bold;
	font-weight: 700;
}

input,
textarea {
	border: 1px solid white;
	background-color: rgb(255, 255, 255);
	border-radius: 5px;
	color: black;
	width: 200px;
	margin: auto;
	font-size: medium;
}

#description {
	width: 300px;
	height: 100px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#cancel,
#publish {
	width: 50px;
	height: 50px;
	background-color: white;
	background-size: contain;
	background-color: rgb(123, 202, 229);
	border: none;
	margin: 20px;
	transition: all 0.2s;
}

#publish:hover {
	transform: scale(1.3);
}

#cancel:hover {
	transform: scale(1.3);
}

#cancel {
	background-image: url('../assets/cancel.png');
}

#publish {
	background-image: url('../assets/share.png');
}

#time {
	margin: auto;
	width: 100px;
}

div {
	display: flex;
}

#buttons-event {
	background-color: #8ca7ba;
	border-radius: 15px;
	border: 2px solid white;
	margin: auto;
	width: 100px;
	padding-top: 10px;
	height: 100px;
	margin-bottom: 50px;
	padding-top: 0px;
}

// when screen is smaller than 400px
</style>