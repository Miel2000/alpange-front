<template>
	<div :class="[
			'home-wrapper',
			{ 'active3d': active3d }
		]"
		@mousemove="onMouseMoveHandler"
		@mousewheel="onMouseWheelHandler"
		@DOMMouseScroll="onMouseWheelHandler"
	>

		<losange 
			ref="losange" 
			text="dare to care"
		/>

		<folio 
			v-if="homefolios"
			ref="folio" 
			class="margined-component index-folio"
			path-name="home" 
			:content="homefolios.data"
			:mouse-pos="mousePos"
		/>

		<squared-text
			v-if="philosophyMain && philosophies"
			ref="squared-text"
			:titles="philosophyMain.data"
			:entries="philosophies.data"
		/> 

		<manifesto
			v-if="manifesto"
			class="margined-component"
			ref="manifesto"
			:content="manifestoParsed.data"
		/>
		
	</div>
</template>

<script>

	import Folio from "@/components/folio.vue";
	import Losange from '@/components/losange.vue';
	import SquaredText from '@/components/squared-text.vue';
	import Manifesto from "@/components/manifesto.vue";
	import wording from "@/assets/data/wording.js";

	import manifestoQuery from "~/apollo/queries/manifesto/manifesto"
	import philosophyMainQuery from "~/apollo/queries/philosophymain/philosophymains"
	import allPhilosophiesQuery from "~/apollo/queries/philosophy/philosophies"
	import allHomeFolios from "~/apollo/queries/homeFolio/homefolios"


	export default {

		layout: "mainLayout",

		components: {
			"folio": Folio,
			"losange": Losange,
			"squared-text": SquaredText,
			"manifesto": Manifesto,
			"wording": wording
		},


		data(){
			return {
				mousePos: {
					x: 0,
					y: 0
				},
				active3d: false,
				philosophyEntries: {
					data: []
				}
			}
		},

		apollo: {

			philosophyMain: {
				prefetch: true,
				query: philosophyMainQuery
			},

			philosophies: {
				prefetch: true,
				query: allPhilosophiesQuery
			},
			
			manifesto: {
				prefetch: true,
				query: manifestoQuery
			},

			homefolios: {
				prefetch: true,
				query: allHomeFolios
			}

		},

		computed: {

			manifestoParsed() {

				if(this.manifesto.data) {

					// on vérifie que la data est brute (qu'elle arrive directement d'apollo)
					if( typeof this.manifesto.data.attributes.textFirst === "string" ){

						// si c'est le cas :
						// PARSE
						this.manifesto.data.attributes.textFirst = this.manifesto.data.attributes.textFirst.split(new RegExp("\n\n"));
	
						this.manifesto.data.attributes.textSecond = this.manifesto.data.attributes.textSecond.split(new RegExp("\n\n"))

					}
					
					// Dans tous les cas, on rebalance ce qu'on a
					return this.manifesto;


				} else {

					return null;

				}

			}

		},

		methods: {

			onMouseWheelHandler(){

				console.log("mouseWheelHandler !");

				const { top, bottom } = this.$refs.folio?.$el.getBoundingClientRect();

				if( top && bottom ){

					this.$refs.folio.isActive = (top <= window.innerHeight && bottom > 0);

				}

			},

			onMouseMoveHandler( event ){

				this.mousePos = {
					x: event.x / window.innerWidth - 0.5,
					y: event.y / window.innerHeight - 0.5
				}

			}

		}

	}

</script>

<style lang="scss" scoped>

	.home-wrapper {
		position: relative;

		&.active3d {

			perspective: 3000px;
			
		}

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
