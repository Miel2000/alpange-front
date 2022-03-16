<template>

	<div class="team-wrapper">

		<!-- gallery -->
		<cards 
			v-if="artists.data"
			ref="cards-container"
			class="team-wrapper"
			:artists="artists.data"
		/>

		<!-- collaborative ethic -->
		<carousel-wrapper
			v-if="ethicMain && ethics"
			ref="carousel-wrapper"
			class="carousel-wrapper"
			:main-title="ethicMain.data.attributes.mainTitle"
			:sub-title="ethicMain.data.attributes.subTitle"
			:sentences="ethics.data"
		/>

		<!-- listing artists -->
		<team-listing  ref="team-listing"/>


		<!-- goToTop arrow -->
		<transition name="arrowToTop">

			<div 
				id="arrow-to-top"
				v-show="displayScroll" 
				class="only-desktop"
				@click="toTop"
			>
				
				<arrow-up />

			</div>

		</transition>

	</div> 

</template>

<script>

	import CarouselWrapper from '@/components/carousel-wrapper.vue';
	import wording from "@/assets/data/wording.js";
	import Cards   from "@/components/cards";
	import TeamListing from "@/components/team-listing";
	import ArrowUp from "@/assets/svg/arrowUp.svg";

	import allArtistsQuery from "~/apollo/queries/artist/artists"
	import allEthicMainsQuery from "~/apollo/queries/ethicmain/ethicmains"
	import allEthicsQuery from "~/apollo/queries/ethic/ethics"


	export default {
		layout: "mainLayout",
		components: {
			"cards": Cards,
			"team-listing": TeamListing,
			"arrow-up": ArrowUp,
			"carousel-wrapper": CarouselWrapper,
			"wording": wording
		},

		data() {
			return {
				displayScroll: false,
				galeryBottom: 0,
				artistDataIsLoaded: false,
				artists: {
					data: []
					}
				}
		},

		apollo: {

			artists: {
				prefetch: true,
				query: allArtistsQuery
			},

			ethicMain: {
				prefecth: true,
				query: allEthicMainsQuery
			},

			ethics: {
				prefecth: true,
				query: allEthicsQuery
			}

		},
	
		created() {			

			this.$nuxt.$on('click-on-artist', artistName => {

				this.goToArtistSelected(artistName)

			})

		},

		mounted() {

			this.defineGaleryBottom();

			window.addEventListener('scroll', this.handleScroll)

		},

		beforeDestroy() {

			this.$nuxt.$off('click-on-artist');

		},

		methods: {

			defineGaleryBottom(){

				
				const el = this.$refs["cards-container"];

				console.log('EL = ', this.$refs["cards-container"]);

				const { offsetTop, offsetHeight } = el.$el;

				this.galeryBottom = offsetTop + offsetHeight;

			},

			goToArtistSelected(artistName){

				console.log("goToArtistSelected arg : ", artistName)

				// Récupére l'obj artist
				this.currentArtist = this.artists.data.find( artist => artist.attributes.name === artistName);

				// Selection de l'artist dans le dom
				const elementToReach    =  this.$refs["team-listing"].$el.querySelector(`[data-bandeau-name='${this.currentArtist.attributes.name}']`);

				const positionToReach =  elementToReach?.getBoundingClientRect().top - this.$store.state.variables.headerHeight;

				// Scroll jusqu'a l'élèment data-artist
				if( positionToReach ){

					window.scrollTo({ top: positionToReach, behavior: 'smooth' });

				}

			},

			handleScroll() {

				if(window.scrollY >= this.galeryBottom) {

					this.displayScroll = true;

				} else {

					this.displayScroll = false;

				}

			},

			toTop() {

				window.scrollTo({

					top: 0,
					behavior: "smooth"

				});
			},
		},
	
	}

</script>

<style  lang="scss" scoped>

	#arrow-to-top {
		right: 50px;
		bottom: 50px;
		position: fixed;
		color: var(--color-primary);
		font-size: 40px;
		cursor: pointer;
		@media #{$mobile} {
			left: 21px;
			bottom: 9px;
		}
	}

	.team-wrapper {
		overflow: hidden;
		margin-bottom: $componentMargin;

		@media #{$mobile} {

			.cards-container {
				display:none;
			}
	
		}

	}

	.title-team {
		padding-top: 50px;
	}

	.arrowToTop-enter-active, 
	.arrowToTop-leave-active {
		transition: all .5s;
	}

	.arrowToTop-enter {
		opacity: 0;
	}

	.arrowToTop-enter-to {
		opacity: 0.80;
	}

	.arrowToTop-leave {
		opacity: 0.80;
	}

	.arrowToTop-leave-to {
		opacity: 0;
	}


</style>