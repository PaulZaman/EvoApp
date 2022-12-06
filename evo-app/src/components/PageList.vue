<template>
	<nav>
		<ul>
			<router-link to="/">
				<li id="login" class="link">
					{{login_or_profile}}
				</li>
			</router-link>
			<router-link to="/home">
				<li id="home" class="link">
					Home
				</li>
			</router-link>
			<router-link to="/events">
				<li id="events" class="link">
					Events
				</li>
			</router-link>
			<router-link to="/kitchen">
				<li id="kitchen" class="link">
					Kitchen
				</li>
			</router-link>
			<router-link to="/about">
				<li id="about" class="link">
					About
				</li>
			</router-link>

		</ul>
	</nav>
</template>

<script>

export default {
	data() {
		return {
			login_or_profile: 'Account',
		}
	},

}
</script>

<style scoped lang="scss">
* {
	margin: 0px;
	padding: 0px;
}

nav {
	padding-top: 30px;

	a {
		margin: 10px;
		font-weight: bold;
		color: #ffffff;
		text-decoration: none;

		&.router-link-exact-active {
			color: #ffffff;
		}
	}
}

ul {
	margin-top: 30px;
	list-style-type: none;
}

li {
	padding: 10px;
	text-align: center;
	transition: all 0.3s;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
}

li:hover {
	background-color: #3C5261;
	transform: scale(1.1);
}

.link {
	background-size: 30px 30px;
	background-repeat: no-repeat;
	background-position: 210px;

}

#home {
	background-image: url("../assets/home.png");
}

#events {
	background-image: url("../assets/social-media.png");
}

#kitchen {
	background-image: url("../assets/restaurant.png");
}

#about {
	background-image: url("../assets/info.png");
}

#login {
	background-image: url("../assets/user.png");
	margin-bottom: 50px;
}
</style>