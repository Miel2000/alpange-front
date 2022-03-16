<template>
	<div class="folio-wrapper" :class="{ 'isActive': isActive }" 
		:style="{
			'top': topCssString,
			'transform': transformString
		}"
	>

		<div class="particles-container"
			:style="{
				'transform': transformStringParticles
			}"
		>

			<span 
				v-for="(index, id) of 7" :key="id"
				:class="[
					'particle-' + index,
					'particle-anim-' + (index % 2 === 0 ? '2' : '1')
				]"
			></span>

		</div>

		<div ref="folioContainer" class="folio-container">

			<div v-for="(item, index, id) of content" :class="'item item-num-' + (index + 1)">
					
				<div :class="['picture-wrapper', 'picture-num-' + (index + 1)]">

					<media-handler 
						v-if="item.attributes.visual.data.attributes"
						:content="item.attributes.visual.data.attributes.formats || {
							thumbnail: {
								url: item.attributes.visual.data.attributes.url,
								ext: item.attributes.visual.data.attributes.ext
							}
						}"
					/>

				</div>

				<div :class="'wording-num-' + (index + 1)">
					<h4 class="title">{{ item.attributes.title }}</h4>
					<p class="description">{{ item.attributes.description }}</p>
				</div>

			</div>

		</div>

	</div>
</template>

<script>

	import MediaHandler from "@/components/micro/media-handler.vue"

	export default {

		components: {
			"media-handler": MediaHandler
		},
	
		props: {

			pathName: {
				type: String,
				required: true
			},

			mousePos: {
				type: Object,
				required: true
			},

			content: {
				type: Array,
				required: true
			}

		},

		data(){
			return {
				isActive: false,
				topCssString: "",
				ratioTransform: 0.05,
				transformString: `rotate3d(${this.mousePos.x}px, ${this.mousePos.y}px, 0, 0deg) translate3d(0,0,0)`,
				transformStringParticles: `rotate3d(${this.mousePos.x}px, ${this.mousePos.y}px, 0, 0deg) translate3d(0,0,0)`
			}
		},

		computed: {
			
			isMobile(){
				return this.$store.state.variables.isMobile;
			}
			
		},

		watch: {

			mousePos(){

				this.setRotate();

			},

			isActive( newVal ) {

				if( newVal ){

					this.setRotate();

				}

			},

			"$store.state.variables.isMobile"( newVal ){

				if( newVal ){

					this.resetRotate();
					
				}

			}

		},

		methods: {

			setRotate(){

				if( this.$store.state.variables.isMobile ){

					this.resetRotate();

					return;
				}

				this.$parent.active3d = this.isActive;

				const { x, y } = this.mousePos;

				if( this.isActive ){

					this.transformString = `rotate3d(
						${y * this.ratioTransform * 0.5},
						${x * this.ratioTransform * 2}, 
						0,
						10deg) 
						translate3d(
							${x * 250}px,
							${y * 150}px,
							0
						)`;

					this.transformStringParticles = `rotate3d(
						${(y + 0.5) * this.ratioTransform * 1.5},
						${(x + 0.5) * this.ratioTransform * 1.5}, 
						0,
						10deg) 
						translate3d(
							${x * 50}px,
							${y * 20}px,
							150px
						)`;

				}

			},

			resetRotate(){

				this.transformString = "";

				this.transformStringParticles = "";

			}

		}

	}
	
</script>

<style lang="scss" scoped>

	.folio-wrapper {
		$innerMargin: calc((var(--width-folio) - var(--width-folio-ref-picture))/2);
		$borderTransitionDuration: 5s;
		$pictureAfterTransitionDuration: 0.3s;

		position: relative;
		display: block;
		width: 100%;
		max-width: var(--width-folio);
		height: 1036px;

		margin-left: auto;
		margin-right: auto;

		transform-origin: center center;

		will-change: transform;
		transition: transform .1s;

		@media #{$mobile} {
			height: auto;
			left: unset;
		}

		&.isActive {
			position: relative;
			// left: unset;

			.particles-container {
				opacity: 1;
			}

		}

		.folio-container {
			z-index: 5;
			position: relative;
			width: var(--width-folio);
			display: block;
			margin: 0 auto;

			@media #{$mobile} {
				width: 100%;
				height: auto;
			}

			*[class^="item"] {
				position: absolute;
				line-height: 0;

				@media #{$mobile} {
					position: relative;
					margin-bottom: 80px;
				}

				&:hover {
					z-index: 15;

					*[class^="wording"] {
						opacity: 1;
						transform: translateY(0);
					}

					*[class^="picture"] {

						opacity: 1;

					}
					
				}
				
				&.item-num {

					&-1 {
						top: 0;
						left: $innerMargin;
					}

					&-2 {
						top: 255px;
						right: 0;
					}

					&-3 {
						top: 450px;
						left: 0;
					}

					&-4 {
						top: 536px;
						right: $innerMargin;
					}

					&-1,
					&-2,
					&-3,
					&-4 {
						@media #{$mobile} {
							top: unset;
							left: unset;
							right: unset;
						}
					}

				}

			}

			.picture {

				&-wrapper {
	
					z-index: 10;
					display: block;
					overflow: hidden;
	
					opacity: 0.4;
					border-radius: 0px;
	
					will-change: opacity;
	
					transition: opacity .8s;
	
					// transition-timing-function: cubic-bezier(.12,.98,.78,1);
	
					@media #{$mobile} {
						opacity: 1;
					}
	
					::v-deep img {
						width: 100%;
					}
	
				}

				&-num {

					&-1 {
						width: var(--width-folio-ref-picture);
						height: 390px;
					}

					&-2 {
						width: 260px;
						height: 270px;
					}

					&-3 {
						width: 260px;
						height: 360px;
					}

					&-4 {
						width: 400px;
						height: 600px;
					}

					&-1,
					&-2,
					&-3,
					&-4 {
						@media #{$mobile} {
							width: 100%;
						}
					}

				}

			}
			


			*[class^="wording"] {
				z-index: 20;
				position: absolute;
				width: 264px;

				color: var(--color-white);

				opacity: 0;
				transform: translateY(-10px);

				will-change: opacity, transform;
				transition: opacity .3s,
							transform .6s;

				@media #{$mobile} {
					position: relative;
					opacity: 1;
					transform: translateY(0);
					padding-top: 30px;
				}

				.title {
					text-transform: uppercase;
					font-family: "PresicavRg";
					font-size: 14px;
					font-weight: bold;
					line-height: 1.21;
					letter-spacing: 5.6px;
					opacity: .9;
				}

				.description {
					font-family: "AktivGrotesk";
					font-size: 12px;
					font-weight: 300;
					line-height: 15px;
					letter-spacing: 0.24px;
					opacity: .7;

					max-height: 90px;
					overflow: hidden;
				}

				&.wording-num {

					&-1 {
						left: -140px;
						top: 115px;
					}

					&-2 {
						left: -192px;
						top: 105px;
					}

					&-3 {
						top: -155px;
					}

					&-4 {
						top: 200px;
						right: -210px;
					}

					&-1,
					&-2,
					&-3,
					&-4 {

						@media #{$mobile} {
							display: block;
							width: calc(100% - ($mobileBorderSize * 2));
							margin: 0 auto;
							top: unset;
							left: unset;
							right: unset;
						}

					}

				}

			}

		}

		.particles-container {
			pointer-events: none;
			z-index: 10;
			position: absolute;
			width: 100%;
			height: 100%;
			// top: -30vh;

			opacity: 0;

			will-change: opacity, top;

			transition: 
				opacity .7s;

			*[class^="particle"] {
				display: block;
				position: absolute;
				width: 10px;
				height: 10px;

				// animation-iteration-count: infinite;


				transform-origin: center center;
				transform: rotate(45deg);

				background-color: var(--color-primary);

				&.particle-anim {

					// &-1{
					// 	animation-name: anim-particles-1;
					// }

					// &-2{
					// 	animation-name: anim-particles-2;
					// }

				}
			}

			.particle {

				&-1 {
					top: 13%;
					left: 89%;

					animation-duration: 25s;
				}

				&-2 {
					top: 27%;
					left: 75%;

					width: 15px;
					height: 15px;

					animation-duration: 20s;
				}

				&-3 {
					top: 26%;
					left: 12%;

					animation-duration: 45s;
				}

				&-4 {
					top: 47%;
					left: 62%;

					width: 7px;
					height: 7px;

					animation-duration: 15s;
				}

				&-5 {
					top: 68%;
					left: 90%;

					animation-duration: 20s;
				}

				&-6 {
					top: 82%;
					left: 40%;

					animation-duration: 18s;
				}

				&-6 {
					top: 84%;
					left: 18%;

					width: 7px;
					height: 7px;

					animation-duration: 24s;
				}

				&-7 {
					top: 83.5%;
					left: 24%;

					width: 10px;
					height: 10px;

					animation-duration: 32s;
				}

				&-2,
				&-7 {
					border: solid 2px var(--color-primary);
					background-color: transparent;
				}

			}

		}

	}

</style>
