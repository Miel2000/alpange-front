<template>

	<div :class="[
		'main-layout anim-colors',
		currentDesign
		]"
	>

		<navigation :design="currentDesign"/>

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
				fullWidthPages: ["index", "cases"]
			}
		},

		head(){
			return {
				bodyAttrs: {
					class: this.$nuxt.$store.state.variables.isMobileNavOpen ? "no-scroll" : ""
				}
			}
		},

		computed: {

			currentDesign(){

				return $nuxt.$route.path === '/' ? 'primary' : 'secondary';

			}

		},

		mounted(){

			window.addEventListener("resize", this.onResizehandler);

			this.onResizehandler();

		},

		watch: {

			artists( newVal ){

				console.log("watch artists : ", newVal.data[0].attributes);
				
				this.$store.commit('variables/setAllArtists', newVal.data);

			},

			cases( newVal ){

				console.log("watch artists : ", newVal.data[0].attributes);

				this.$store.commit('variables/setAllArtists', newVal.data);

			}

		},
		methods: {
			
			onResizehandler(){

				this.$store.commit("variables/updateIsMobile");

				this.$store.commit("variables/updateHeaderHeight", this.currentDesign);

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
		background-color: var(--color-bg);
		// color: var(--color-white);
	}

	.main-layout {
		width: 100vw;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			display: none;
		}

		.main-content {

			@include mainColumn;

			transition: margin-top .4s;

			&.full-width {
				max-width: 100%;
				width: 100%;
			}

		}

		&.primary {
			
			.main-content {
				
				margin-top: calc($headerHeightPrimary);

			}
			
		}

		&.secondary {
			
			.main-content {

				margin-top: calc($headerHeightSecondary);

			}

		}
		
		.margined-component {

			margin-top: $componentMargin;
			margin-bottom: $componentMargin;
			
		}

	}


</style>
