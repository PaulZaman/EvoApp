<template>

	<div id="menu" class="hidden-menu">
		<h1>MENU</h1>
		<PageList />
	</div>
	<button id="menu-button" class="" @click="menu_animate"></button>
</template>

<script>
import PageList from './PageList.vue';

export default {
	name: "MenuSlider",
	data() {
		return { menuOpened: false };
	},
	methods: {
		menu_animate() {
			let menu = document.getElementById("menu");
			let btn = document.getElementById("menu-button");
			// if menu is closed
			if (this.menuOpened == false) {
				// set menu container form hidden to shown
				menu.classList.remove("hidden-menu");
				menu.classList.add("shown-menu");
				// set button state
				btn.classList.remove("menuClosedButton");
				btn.classList.add("menuOpenedButton");
			}
			// if menu is opened
			if (this.menuOpened == true) {
				// set menu container from shown to hidden
				menu.classList.remove("shown-menu");
				menu.classList.add("hidden-menu");
				// set button state
				btn.classList.remove("menuOpenedButton");
				btn.classList.add("menuClosedButton");
			}
			this.menuOpened = !this.menuOpened;
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			document.getElementById("menu-button").classList.add("menuClosedButton");
		});
	},
	components: { PageList }
}
</script>

<style lang="scss" scoped>
* {
	margin: 0px;
	padding: 0px;
}

h1{
	color: white;
}

#menu {
	position: fixed;
	top: 0px;
	height: 100vh;
	width: 250px;
	background-color: #00CED1;
	transition: all 0.5s;
}

.hidden-menu {
	left: -200px;
}

.shown-menu {
	left: 0px;
}

#menu-button {
	position: fixed;
	background-repeat: no-repeat;
	height: 30px;
	width: 30px;
	background-size: contain;
	background-color: #00CED1;
	border: 0px;
	top: 10px;
	transition: all 0.5s;
}

.menuClosedButton {
	left: 10px;
	background-image: url("../assets/angle-right.png");
}

.menuOpenedButton {
	left: 210px;
	background-image: url("../assets/angle-left.png");
}

#menu-button:hover {
	transform: scale(1.3);
}
</style>