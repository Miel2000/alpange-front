<template>

	<div class="media-handler">

		<picture v-if="isImage"
			class="content-image"
		>

			<!-- high res -->
			<source 
				v-if="content.large"
				:media="$store.state.variables.mqDesktopLarge" 
				:srcset="`${$store.state.variables.STRAPI_BASE_URL}${content.large.url}`"
			>

			<!-- med res -->
			<source 
				v-if="content.medium"
				:media="$store.state.variables.mqDesktop" 
				:srcset="`${$store.state.variables.STRAPI_BASE_URL}${content.medium.url}`"
			>

			<!-- low res -->
			<source 
				v-if="content.small"
				:media="$store.state.variables.mqDesktop" 
				:srcset="`${$store.state.variables.STRAPI_BASE_URL}${content.small.url}`"
			>

			<!-- base -->
			<img
				v-if="content.thumbnail"
				:src="`${$store.state.variables.STRAPI_BASE_URL}${content.thumbnail.url}`"
				alt="illustration picture"
			>

		</picture>

		<div v-else-if="isVideo"
			class="content-video"
		>

			<video playsinline muted autoplay loop
				:src="`${$store.state.variables.STRAPI_BASE_URL}${content.thumbnail.url}`"
			></video>

		</div>


	</div>

</template>

<script>
	
	export default {
		
		props: {

			content: {
				type: Object,
				required: true
			},

			controls: {
				type: Boolean,
				required: false
			}

		},

		data(){

			return {
				extensionsList: {
					imagesExtensions: [".png", ".jpg"],
					videosExtensions: [".mp4"]
				}
			}

		},

		computed: {

			isImage(){

				return this.extensionsList.imagesExtensions.includes(this.content.thumbnail.ext);

			},

			isVideo(){

				return this.extensionsList.videosExtensions.includes(this.content.thumbnail.ext);

			} 

		}

	}

</script>

<style lang="scss" scoped>

	.media-handler {
		height: 100%;
		
		.content {

			&-image,
			&-video {
				height: 100%;

				img,
				video {

					object-fit: cover;
					display: block;
					height: 100%;
					width: 100%;

				}

			}

		}

	}

</style>
