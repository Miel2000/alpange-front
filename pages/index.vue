<template>
	<div :class="[
			'home-wrapper',
		]"

	>


		
	</div>
</template>

<script>


	import wording from "@/assets/data/wording.js";


	export default {

		layout: "mainLayout",

		components: {

			"wording": wording
		},


		data(){
			return {
			}
		},

		apollo: {

		},

		computed: {


		},

		methods: {

		
		}

	}

</script>

<style lang="scss" scoped>

	.home-wrapper {
		position: relative;
	}

</style>
