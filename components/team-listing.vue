<template>

	<div v-if="artists" class="listing-container">

		<div	
			v-for="artist in artists.data" 
			:key="artist.id" 
			class="artist-wrapper"
		>

			<artist-bandeau :infos-artist="artist.attributes" />

		</div>

	</div>

</template>

<script>

	import allArtistsQuery from "~/apollo/queries/artist/artists"

	import ArtistBandeau from "@/components/micro/artist-bandeau.vue"

export default {

	layout:'mainLayout',

	components: {
		"artist-bandeau": ArtistBandeau
	},

	data(){
		return {}
	},

	apollo: {

		artists: {
			prefetch: true,
			query: allArtistsQuery
		}

	}

}
</script>

<style lang="scss" scoped>

	.listing-container {
		display:flex;
		flex-direction: column;
		padding-bottom: 90px;
		@media #{$mobile} {
			margin-bottom: -100px;
		}

	}

	.artist-wrapper {
		margin-bottom: 90px;
	}


</style>
