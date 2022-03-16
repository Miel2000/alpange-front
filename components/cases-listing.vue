<template>
	<div class="project-listing-container">
		
		<div v-for="(oneCase, index, id) in this.cases.data" :key="id">

			<div :class="['project-container',{ 'active' : hoveredCase === oneCase.attributes.order}] ">

				<div class="project-id-container">

					<p>{{index + 1}}</p>

				</div>

				<div class="project-name-container">

					<p 
						@mouseenter="enterNameHandler" 
						@mouseleave="leaveNameHandler" 
						@click="clickHandler"
						:data-index-project="oneCase.attributes.order"
					>
						{{ oneCase.attributes.name }}
					</p>

				</div>

				<div class="project-medias-container">

					<div
						v-if="oneCase.attributes.thumbnails.data"
						class="project-media-wrapper" 
						v-for="(media, index, id) in oneCase.attributes.thumbnails.data" :key="id"
					>

						<media-handler 
							v-if="index < 3"
							class="project-media-content"
							:content="media.attributes.formats || {
								thumbnail: {
									url: media.attributes.url,
									ext: media.attributes.ext
								}
							}" 
						/>


					</div>

				</div>

			</div>


		</div>
		
	</div>
</template>

<script>


	import MediaHandler from "@/components/micro/media-handler";

	export default {

		layout: "mainLayout",

		components: {
			"media-handler": MediaHandler
		},


		data(){
			return {
				hoveredCase: ''
			}
		},

		props: {

			cases: {
				type: Object,
				required: true
			}

		},

		methods: {

			enterNameHandler(event) {

				this.hoveredCase =  parseInt(event.target.getAttribute('data-index-project'));

			},

			leaveNameHandler() {

				this.hoveredCase =  "";

			},

			clickHandler( event ) {

				
				const projectId = event.target.dataset.indexProject

				$nuxt.$emit('open-viewer', { projectId });

			}

		}

	}

</script>

<style lang="scss" scoped>

	.project-listing-container {
		width: 100%;
		height:100%;
		color: var(--color-white);
	}

	.project-container {
	
		color: var(--color-type-smooth-plus);
		transition: all 0.45s;
		height: 5.5vw;
		padding: 10px 20px;
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: baseline;
		
		@media #{$mobile}{

			&:after {
				content: "";
				background: linear-gradient(90deg,#ff000000 7%, #0f0f10 62%);
				position: absolute;
				top: 0;
				height: 100%;
				width: 20%;
				right: 0;
			}

		}

		&.active {
			background-color: rgba(255, 251, 251, 0.795);


			.project-media-wrapper {

				&:nth-of-type(2) {
					opacity:1;
				}
			
				&:nth-of-type(3) {
					opacity:1;
				}
			}
		}
	}

	.project-id-container,
	.project-year-container {
		font-family: "AktivGrotesk";
		font-weight: 300;
		display: flex;
		flex-direction: column;
		
		
		@media #{$mobile} {
			font-size: 4vw;
		}
	  
	}

	.project-id-container {
		// display: flex;
		// flex-direction: column;
		// justify-content: flex-end;
		// height: 100%;
		padding-right: 5px;
		// width: 1vw;

	}



	.project-name-container {
		font-family: "AktivGrotesk";
		text-transform: uppercase; 
		font-weight: 300;
		font-size: 6vw;
		margin-right: 15px;
		cursor: pointer;

		@media #{$mobile} {
			font-size: 5vw;
		}
	
		p {
			color: rgba(255, 255, 255, 0.74);

			white-space: nowrap;

		}
	}


	.project-medias-container {
		height: 85%;
		display: flex;
		align-items: center;
		align-self: self-end;

		@media #{$mobile} {
				display:none;
		}

		.project-media-wrapper {
			padding-right: 2%;
			height: 100%;        

			&:nth-of-type(2) {
				transition: all 0.75s;
				opacity:0
			}
		
			&:nth-of-type(3) {
				transition: all 0.45s;
				opacity:0
			}
		}
		
		.project-media-content {
			height: 100%;

			::v-deep .content-image {

				padding-right: 20px;

			}

		}


	}

</style>
