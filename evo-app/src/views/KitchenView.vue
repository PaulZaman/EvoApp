<template>
	<HeaderComp title="KITCHEN"></HeaderComp>
	<KitchenFormComp :dt=dt @newdate='newdate' @refresh='refresh' />
	<TimeTable :dt=dt :refresh=go_refresh />
</template>

<script>
import TimeTable from '@/components/TimeTable.vue';
import KitchenFormComp from '@/components/kitchenFormComp.vue';
import HeaderComp from "../components/headerComp.vue"

export default {
	name: "KitchenView",
	data: function () {
		return {
			dt: "",
			go_refresh: false
		};
	},
	components: { TimeTable, KitchenFormComp, HeaderComp },
	methods: {
		newdate(date) {
			this.dt = date;
		},
		async refresh() {
			this.go_refresh = true
			setTimeout(() => {
				this.go_refresh = false
			}, 500);
		}
	},
	mounted() {
		// remove 4 hours from the current time
		let date = new Date()
		date.setHours(date.getHours() - 4)
		this.dt = date.toISOString().slice(0, 10)
	},
	async beforeCreate() {
		let logged = await this.$store.dispatch('isLogged')
		if (!logged) {
			this.$router.push('/')
		}
	}
}
</script>

<style>

</style>