<template>

	<div :class="[
		'main-layout'
		]"
	>

		<navigation />

		<div :class="[
			'main-content',
			{ 'full-width': fullWidth }
		]">

			<Nuxt />

		</div>

	</div>

</template>

<script>

	import navigation from "@/components/navigation.vue";

	export default {
		components: {
			navigation
		},

		data(){
			return {
				fullWidth: false,
				fullWidthPages: []
			}
		},

		head(){
			return {
				bodyAttrs: {
					class: this.$nuxt.$store.state.variables.isMobileNavOpen ? "no-scroll" : ""
				}
			}
		},

		mounted(){

			window.addEventListener("resize", this.onResizehandler);

			this.onResizehandler();

		},

		methods: {
			
			onResizehandler(){

				this.$store.commit("variables/updateIsMobile");

			}

		}

	}

</script>

<style lang="scss">

	// here are transversal styles
	// fonts, mq, etc

	$colorRed: #bc4342;

	:root {

		// colors
		--color-bg: #0f0f10;
		--color-white: #fff;
		// --color-bg: ##FFF;
		// --color-white: #0f0f0f;

		--color-primary: #bc4342;
		// --color-secondary: #F6FF1A;
		--color-secondary: #1aff8d;
		--color-ternary: #5942BC;

		--color-type-smooth: rgba(255,255,255, 0.6);
		--color-type-smooth-plus: rgba(255,255,255, 0.5);
		--color-type-smooth-max: rgba(255,255,255, 0.3);

		// some widths
		--width-folio: 810px;
		--width-folio-ref-picture: 536px;
		--width-carousel-text: 260px;

	}

	body {
		// background-color: var(--color-bg);
		// color: var(--color-white);
	}

	.main-layout {
		width: 100vw;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			display: none;
		}

	}


</style>
