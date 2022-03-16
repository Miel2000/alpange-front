<template>

	<div class="case-viewer-wrapper">

		<div class="case-viewer-inner">

			<div class="case-viewer-cross" @click="handleCloseClick">

				<cross  />

			</div>

			<section class="head">

				<div class="infos">

					<h2 class="head-title">{{ item.attributes.name }}</h2>

				</div>

				<a v-if="item.attributes.ctaWording" class="head-cta" target="blank">

					{{ item.attributes.ctaWording }}

				</a>

			</section>

			<section class="cover-container">
				
				<media-handler
					v-if="item.attributes.cover.data && item.attributes.cover.data.attributes"
					class="cover-image"
					:content="item.attributes.cover.data.attributes.formats || {
							thumbnail: {
								url: item.attributes.cover.data.attributes.url,
								ext: item.attributes.cover.data.attributes.ext
							}
					}" 
				/>

			</section>

			<section class="content-container">

				<div class="description-container">

					<p class="description-container-catchline">{{ item.attributes.catchline }}</p>

					<p v-for="(sentence, index, id) in item.attributes.descriptionsParsed" :key="id"
						class="description-paragraph"
					>
						{{ sentence }}
					</p>

				</div>

				<div class="side-container">

					<div class="parallax-container">

						<!-- v-if="item.attributes.cover.data && item.attributes.cover.data.attributes" -->

						<media-handler  
							v-if="item.attributes.parallax.data && item.attributes.parallax.data.attributes"
							class="parallax-image" 
							:content="item.attributes.parallax.data.attributes.formats || {
									thumbnail: {
										url: item.attributes.parallax.data.attributes.url,
										ext: item.attributes.parallax.data.attributes.ext
									}
							}" 
						/>

					</div>

				<div class="credits-container">

						<div class="credits-container-extras">

							<div class="informations"
								 v-for="(extraInfo, index, id) in item.attributes.extraInfos" :key="id"
							>

								<p class="title">
									{{ extraInfo[0] }} :
								</p>

								<p class="info">
									<span class="slash">/</span>{{ extraInfo[1] }}
								</p>

							</div>

						</div>

					</div>

				</div>

			</section>
			

			<section 
				v-if="extraMediasParsed.length > 0"
				class="lines-container"
			>

				<div 
					v-for="(lineArr, index, id) in extraMediasParsed" :key="id"
					class="line"
				>

					<div 
						v-for="(media, index, id) in lineArr" :key="id" 
						class="line-media"
					>

						<media-handler
							v-if="media"
							:content="media.attributes.formats || {
									thumbnail: {
										url: media.attributes.url,
										ext: media.attributes.ext
									}
							}" 
						/>

					</div>

				</div>


			</section>

			<section class="bottom-container">
				
				<media-handler 
					class="bottom-media"
					v-if="item.attributes.footer.data"
					:content="item.attributes.footer.data.attributes.formats || {
							thumbnail: {
								url: item.attributes.footer.data.attributes.url,
								ext: item.attributes.footer.data.attributes.ext
							}
					}" 
				/>

			</section>

			<section class="next-project">
				<!-- button -->
				<div class="next-project-container"
					 @click="goToNextProject"
				>
					<div class="text">

						<p>Next Project </p>

					</div>

					<div class="svg">

						<arrow-next />

					</div>


				</div>

			</section>

		</div>

	</div>

</template>

<script>

	import MediaHandler from "@/components/micro/media-handler.vue";
	import Cross from "@/assets/svg/cross.svg";
	import arrowNext from "@/assets/svg/arrowNext.svg";


	export default {

		components: {
			"media-handler": MediaHandler,
			"cross": Cross,
			"arrow-next": arrowNext
		},

		props: {

			item: {
				type: Object,
				required: true
			}

		},

		data(){
			return {

				extraMediasParsed: this.item.attributes.extramedias.data
						.map((extraMedia, index) => {

							if( index % 2 === 0 ){
								return [
									extraMedia, 
									this.item.attributes.extramedias.data[index + 1] || null
								];
							}

						})
						.filter(oneArray => oneArray !== undefined),


			}

		},

		methods:{

			handleCloseClick() {
				
				$nuxt.$emit('close-viewer');

				window.scrollTo(0,0);

			},

			goToNextProject() {

				const idToTransmit = parseInt(this.item.attributes.order);

				$nuxt.$emit('go-next-project', { currentProjectOrder: idToTransmit });
				
			}

		}

	}

</script>

<style lang="scss" scoped>

	$marginBeewteenElements: 80px;

	.case-viewer {

		&-cross {
			z-index: 90;
			position: fixed;
			margin-top: 0 !important;
			right: 2.5%;
			width: 50px;
			height: 50px;

			color: var(--color-white);
			cursor: pointer;

			opacity: 1;

			transition: opacity 0.3s;

			-webkit-tap-highlight-color: transparent;
			outline: none;

			@media #{$mobile} {
				margin-top: unset !important;
				top: 90px;
				right: 2.5%;
				transform: translateY(0);
			}

			svg {
				width: 100%;
				height: 100%;
			}

		}

				

		&-wrapper {
			position: absolute;
			width: 100%;
			top: $headerHeightSecondary;
			left: 0;

			background-color: var(--color-bg);

			&.transition-case-viewer-enter-active,
			&.transition-case-viewer-enter-active-to,
			&.transition-case-viewer-leave-active,
			&.transition-case-viewer-leave-to {

				.case-viewer-cross {
					opacity: 0;
				}

			}
	
		}

		&-inner {
			position: relative;
			width: 95%;
			margin: 0 auto;
			color: var(--color-white);

			@media #{$mobile} {
				margin-top: unset;
			}

			& > * {
				margin-top: $marginBeewteenElements;
			}

			.head {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;

				margin-top: unset;
				padding-top: $marginBeewteenElements;

				@media #{$mobile} {
					padding: unset;
				}

				&-title {
					font-family: "PresicavRg";
					font-size: 70px;
					text-transform: uppercase;

					@media #{$mobile} {
						width: 100%;
						font-size: 44px;
						width: calc(100% - 2.5% - 50px);
						word-break: break-word;
					}

				}

				&-cta {
					font-family: "PresicavLt";
					font-size: 40px;
					text-transform: capitalize;
					padding: 25px 65px;

					color: var(--color-type-smooth);

					border: solid 1px var(--color-type-smooth);
					border-radius: 999px;

					@media #{$mobile} {
						display:none;
					}

				}
				
			}

			.cover {

				&-container {
					@include maxHeightViewport;
				}

				&-image {
					width: 100%;
				}
			}

			.content {

				&-container {
					display: flex;
					flex-flow: row nowrap;
					padding-bottom: $marginBeewteenElements;
					border-bottom: solid 1px var(--color-type-smooth-plus);
					// col en mobile
					@media #{$mobile} {
						flex-flow: column nowrap;
					}
				}

			}

			.description {

				&-container {
					width: 60%;
					display: flex;
					flex-flow: column nowrap;
					@media #{$mobile} {
						width: 100%;
					}
					// width 100%

					&-catchline {
						font-family: "AktivGrotesk";
						font-size: 16px;
						line-height: 1.3;
						font-weight: 300;
						word-break: break-word;
						font-style: italic;
						color: var(--color-white);
					}
				}

				

				&-paragraph {
					width: 80%;
					font-family: "AktivGrotesk";
					font-size: 67px;
					line-height: 1.3;
					font-weight: 300;
					color: var(--color-type-smooth);

					margin-top: $marginBeewteenElements;

					&:first-of-type {
						margin-top: 0;
					}

					@media #{$mobile} {
						width: 100%;
						font-size:100%;
						margin-top: 40px;
					}

				}

			}

			.side {

				&-container {
					width: 40%;
					display: flex;
					flex-flow: column nowrap;
					justify-content: space-between;

					@media #{$mobile} {
						width: 100%;
					}
					
				}

			}

			.parallax {

				// &-container {
				// 	//
				// }

				&-image {
					width: 100%;
					@media #{$mobile} {
					    margin: 10px 0;
					}
				}

			

			}

			.credits {

				&-container {

					$bigType: 20px;
					$smallType: 15px;

					* {
						text-transform: uppercase;
					}

					& > * {
						margin-top: 15px;
					}

					&-extras {

						.informations {

							.title {
								font-family: "AktivGrotesk";
								font-size: $smallType;
								font-weight: 100;
								margin-block: 15px;
								color: var(--color-type-smooth-max);
						

							}

							.info,
							.which-is {
								font-family: "AktivGrotesk";
								font-size: $bigType;
								font-weight: 100;
							}

							.info {

								color: var(--color-type-smooth-plus);
							}

						}
						
					}

					.slash {
						font-size: $bigType;
						margin-right: 10px;
						color: var(--color-type-smooth-max);
					}

				}

				&-entities {

					&-container {

						.entity {
							display: flex;
							flex-flow: row wrap;
							justify-content: flex-start;
							align-items: center;
							margin-top: 4px;

							&:first-of-type {
								margin-top: 0;
							}

							.which-is {
								font-size: 18px;
								margin-left: 4px;
								color: var(--color-type-smooth-max);
							}

						}

					}
				}

			}

			.lines {

				&-container {

					$lineCellSizeBig: 60%;

					$lineCellSizeSmal: 32%;

					.line {
						@include maxHeightViewport;
	
						margin-top: $marginBeewteenElements;
	
						display: flex;
						flex-flow: row nowrap;
						justify-content: space-between;
						align-items: flex-start;


						@media #{$mobile} {
							width: 100%;
							flex-flow: column nowrap;
							margin-top:0px;
					
						}

						&:first-of-type {
							margin: 0;
						}
	
						// impairs
						&:nth-of-type(odd) {
							// border: solid 5px orange;
	
							.line-media {

								::v-deep {
									// 
								}

								@media #{$mobile} {
									width: 100%;
								}

								&:first-of-type {
									@media #{$mobile} {
										width: 100%;
									}
									width: $lineCellSizeBig;
								}
	
								&:last-of-type {
									@media #{$mobile} {
										width: 100%;
									}
									width: $lineCellSizeSmal;
								}
	
							}
	
						}
	
						// pairs
						&:nth-of-type(even) {
							// border: solid 5px pink;
	
							.line-media {
								@media #{$mobile} {
									width: 100%;
								}

	
								&:first-of-type {
									width: $lineCellSizeSmal;
									@media #{$mobile} {
										width: 100%;
									}

								}
	
								&:last-of-type {
									width: $lineCellSizeBig;
									@media #{$mobile} {
										width: 100%;
									}
								}
								
							}
	
						}
	
					}

				}

			}

			.bottom {

				&-container {
					@include maxHeightViewport;

					@media #{$mobile} {
						margin-top: 20px;
					}

				}

				&-media {
					// border: solid 1px orange;
				}

			}

			.next-project {
				width: 100%;
				padding-bottom: $marginBeewteenElements * 2;
				display: flex;
   				justify-content: center;
				color:white;
			
			
				
				@media #{$mobile} {
					margin-top:0;
					padding-bottom: 50px;
					padding-top: 50px;
				}

				&-container {

					cursor:pointer;

					transition: all 0.85s;

					& * {
						pointer-events: none;
					}

					&:hover {

						.text {
							letter-spacing: 5px;
						}

						.svg {
							color: var(--color-primary);
						}

					}

					.text {
						font-family: 'AktivGrotesk';
						margin-bottom: 10px;
						letter-spacing: 1px;
						font-size: 7vw;
						font-weight: 100;
						text-transform: uppercase;

						transition: letter-spacing 1s;
					}
	
					.svg {

						
						width: 100%;
						text-align: center;
						display: flex;
						justify-content: center;
						color: var(--color-white);

						transition: color 0.3s;

						svg {
							width: 10vw;
							height: 10vw;
						}
					}
				}


			}

		}

	}

</style>
