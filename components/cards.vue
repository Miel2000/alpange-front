<template>


	<div class="cards-container">

			<div  
				@click="clickOnArtist" 
				v-for="( artist, index, id ) in artists" 
				:data-name="artist.attributes.name" 
				:key="id" 
				class="card"
			>
			
				<img 
					v-if="artist.attributes.profilePic.data"
					class="card-image" 
					:src="`${$store.state.variables.STRAPI_BASE_URL}${artist.attributes.profilePic.data.attributes.url}`" 
					:alt="artist.attributes.name"
				>
				<!-- fallback -->
				<img v-else
					class="card-image" 
					:src="`${$store.state.variables.STRAPI_BASE_URL}/uploads/avatar_default_13d8a892e6.png`" 
					alt=""
				>

				<h1 class="card-prenom">{{artist.attributes.surname}}</h1>
		
			</div>

		</div>
		
</template>

<script>

	

	export default {
		layout:'mainLayout',

		mounted() {
			console.log('cards artist = ',this.artists)
		},

		props: {
			artists: Array,
			required: true
		},


	
		methods: {
			clickOnArtist(event) {
				
				const artistName = event.target.dataset.name

				$nuxt.$emit('click-on-artist', artistName)

				console.log('click on artist',artistName)

			}
		},

	
		
		
	}
</script>

<style  lang="scss" scoped>

	.cards-container {	
		display: flex;
		justify-content: center;
		flex-flow: row wrap;
		width: 100%;
	}


	.card {
		cursor: pointer;
		position: relative;
		width: 24%;
		overflow: hidden;
		height:300px;

		&::after {
			content:'';
			position:absolute;
			display:block;
			top:0;
			left:0;
			background: linear-gradient(45deg, #47494e -30%, rgba(255,255,255,0) 40%);
			width: 100%;
			height: 100%;
			opacity: 0;
		}
		
		&:hover {

			&::after {
				content:"";
				opacity: 0.8;
			}
		

			.card-prenom {
				opacity:1;
				bottom: 15px;
				left:15px;
			}

			.card-image {	
				filter: opacity(1) saturate(1);
			}
		}

		.card-image {
			object-fit:cover;
			object-position: center;
			width: 100%;
			height: 100%;
			filter: opacity(0.5) saturate(0);
			transition: all 0.45s;
		}

		.card-prenom {
			font-family: "PresicavRg";
			width: 100%;
			bottom: 5px;
			left:15px;
			position: absolute;
			opacity: 0;
			z-index: 5;
			color: white;

			transition: all 0.25s;
		}


	}
</style>