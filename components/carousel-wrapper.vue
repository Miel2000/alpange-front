<template>
	<div class="carousel-wrapper-container">

		<micro-title
			:main-title="mainTitle"
			:sub-title="subTitle"
		/>

		<carousel-text class="carousel" :wording="sentences"/>

	</div>
</template>

<script>

	import MicroTitle from "@/components/micro/title.vue";
	import CarouselText from "@/components/carousel-text.vue";
	
	export default {

		components: {
			"micro-title": MicroTitle,
			"carousel-text": CarouselText
		},


		props: {
			
			mainTitle: {
				type: String,
				required: true
			},

			subTitle: {
				type: String,
				required: true
			},

			sentences: {
				type: Array,
				required: true
			}

		},


	}

</script>

<style lang="scss" scoped>

	.carousel-wrapper {

		&-container {
			// 

			.carousel {
				margin-top: 90px;
			}

		}

	}

</style>
