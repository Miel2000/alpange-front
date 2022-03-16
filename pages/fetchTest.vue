<template>
	<div>
		hey
	</div>
</template>

<script>
	export default {
		data(){
			return {
				products: [],
				articles: null
			}
		},
		watch: {

			articles( newVal ){

				console.log("watch articles : ", newVal);

			}

		},
		created(){

			this.goFetch();

		},
		methods: {

			async goFetch(){

				const res = await fetch('http://localhost:1337/homepage')

				this.articles = await res.json();		

			}
		}
	}
</script>
