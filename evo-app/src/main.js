import { createApp } from "vue";
import { createStore } from 'vuex'
import App from "./App.vue";
import router from "./router";

// Create store instance
const store = createStore({
	state() {
		return {
			token: "",
			userId: 0,
		}
	},
	mutations: {
		// Mutators
		setToken(state, token) {
			state.token = token
		},
		setUserId(state, userId) {
			state.userId = userId
		},
	},
	actions: {
		// Check token valididity
		async isLogged() {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");
			const data = fetch('api/users/login/check', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify({ token: token, id: userId }) // body data type must match "Content-Type" header
			}).then(response => {
				return response.json()
			}).then(data => {
				return data.isLoggedIn
			})
			return data
		},
		// Logout
		logout: function () {
			localStorage.clear()
		},

		// set info
		setInfo: function ({ state }, { token, userId }) {
			state.token = token
			state.userId = userId
			console.log("setting info : ", token, userId)
			localStorage.setItem("token", token);
			localStorage.setItem("userId", userId);
		}

	}
})


createApp(App).use(router).use(store).mount("#app");

