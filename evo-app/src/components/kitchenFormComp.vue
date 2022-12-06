<template>
	<div id="date-container">
		<button class="date-button" id="left" @click="remove_day"></button>
		<h1>{{dt}}</h1>
		<button class="date-button" id="right" @click='add_day'></button>
	</div>
	<a v-if='error' id="error">{{errormsg}}</a>
	<form id="kitchen-form">
		<div id="time">
			<label>Start: </label>
			<input type="time" v-model="starttime" />
		</div>
		<div id="time">
			<label>End: </label>
			<input type="time" v-model="endtime" />
		</div>
		<div id="select-utensil">
			<label for="utensil-type">Utensil(s): </label>
			<table>
				<tr>
					<td>
						<label>Small Hob 1</label>
					</td>
					<td>
						<input type="checkbox" v-model="SH1" />
					</td>
				</tr>
				<tr>
					<td>
						<label for="SH2">Small Hob 2</label>
					</td>
					<td>
						<input type="checkbox" v-model="SH2" />
					</td>
				</tr>
				<tr>
					<td>
						<label>Big Hob 1</label>
					</td>
					<td>
						<input type="checkbox" v-model="BH1" />
					</td>
				</tr>
				<tr>
					<td>
						<label>Big Hob 2</label>
					</td>
					<td>
						<input type="checkbox" v-model="BH2" />
					</td>
				</tr>
			</table>
			<button @click="submit">Add</button>
		</div>
	</form>
</template>

<script scoped>
export default {
	name: "KitchenForm",
	emits: ['newdate', 'refresh'],
	props: {
		dt: String,

	},
	data() {
		return {
			error: false,
			errormsg: "Error",
			starttime: "",
			endtime: "",
			SH1: false,
			SH2: false,
			BH1: false,
			BH2: false,
		}
	},
	methods: {
		add_day() {
			var result = new Date(this.dt);
			result.setDate(result.getDate() + 1);
			this.$emit('newdate', result.toISOString().slice(0, 10))
		},
		remove_day() {
			var result = new Date(this.dt);
			result.setDate(result.getDate() - 1);
			this.$emit('newdate', result.toISOString().slice(0, 10))
		},
		submit() {
			if (!this.starttime || !this.endtime) {
				this.error = true;
				this.errormsg = 'Missing time'
				return;
			}
			if (this.starttime >= this.endtime) {
				this.error = true
				this.errormsg = "The start time has to be before the end time"
				return
			}
			if (!this.BH1 && !this.BH2 && !this.SH1 && !this.SH2) {
				this.error = true
				this.errormsg = "Select an ustensil"
				return
			}
			let date = new Date()
			date.setHours(date.getHours() - 4)
			date = date.toISOString().slice(0, 10)
			if (this.dt < date) {
				this.error = true
				this.errormsg = "Date selected is before current date and time"
				return
			}
			this.error = false
			// convert data to correct format
			// find utensilid
			let utensils = [this.SH1, this.SH2, this.BH1, this.BH2];
			let utensils_names = ['Small Hob 1', 'Small Hob 2', 'Big Hob 1', 'Big Hob 2'];
			for (let i = 0; i < utensils.length; i++) {
				if (utensils[i]) {
					var data = {
						start: this.dt + 'T' + this.starttime + ':00.000Z',
						end: this.dt + 'T' + this.endtime + ':00.000Z',
						userId: localStorage.getItem('userId'),
						utensilname: utensils_names[i]
					}
					this.postData('api/use', data);
				}
			}

		},

		postData: async function (url = '', data = {}) {
			// Default options are marked with *
			fetch(url, {
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
			}).then(data => {
				// set error message to success
				if (data.ok) {
					this.error = true;
					this.errormsg = 'Success !';
					let errordiv = document.getElementById("error");
					errordiv.style.color = "green";
					document.body.append(errordiv);
					this.$emit('refresh')
				} else {
					this.error = true;
					this.errormsg = 'Utensil is already used for givent time period !';
				}
			})


		}
	},

}
</script>

<style scoped lang="scss">
#error {
	color: red;
	font-size: 30px;
}

#kitchen-form {
	display: flex;
	flex-direction: column;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 04px 15px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
	border-radius: 15px;
	border: 3px solid lightblue;
	margin: auto;
	margin-bottom: 20px;
	width: 350px;
	height: 230px;
	background-color: #3c526155;
	color: white;
	font-style: bold;
	font-weight: 700;
}


form input {
	width: 100px;
	margin: auto;
	border-radius: 10px;
	border: 1px solid;
}

form input:hover {
	transform: scale(1.1);
	transition: all 0.3s;
}


form button {
	margin-top: 10px;
	width: 100px;
	margin: auto;
	background-color: white;
	border: 2px solid lightblue;
	border-radius: 15px;
	box-shadow: rgba(0, 0, 0, 0.102) 0px 04px 15px, rgba(0, 0, 0, 0.012) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

}

form button:hover {
	transform: scale(1.2);
	transition: all 0.3s;
}

form #time {
	margin: 5px;

}


#date-container {
	display: flex;
	justify-content: center;
}

.date-button {
	background-repeat: no-repeat;
	height: 30px;
	width: 30px;
	background-size: contain;
	background-color: white;
	border: 0px;
	transition: all 0.2s;
	margin: 30px;
}

.date-button:hover {
	transform: scale(1.3);
}

#left {
	background-image: url(../assets/angle-left-black.png);
}

#right {
	background-image: url(../assets/angle-right-black.png);
}

table {
	margin: auto;
	text-align: left;
	color: white;
}

#time input {
	border: 1px solid lightblue;
}
</style>