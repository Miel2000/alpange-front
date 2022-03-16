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


		.index-folio {
			margin-top: calc($componentMargin * -1);

			@media #{$mobile} {
				margin-top: $componentMargin;
			}

		}

		& > * {

			&:last-of-type {
				margin-bottom: 0;
			}

		}

	}

</style>
