<template>
	<div :class="[
			'nav-wrapper'
		]">
		

		<nav class="destkop-menu-wrapper">

				<p class="logo-desktop">LogoDesktop</p>

				<ul class="links-container">
					
					<li v-for="link in  allLinks" :key="link.id"  class="link-wrapper active">

						<NuxtLink  :to="link.to">

							{{link.label}}

						</NuxtLink>

					</li>


				</ul>

		</nav>
		
	</div>
</template>

<script>

	import wording from "@/assets/data/wording"
	
	export default {

		data() {
				return {
					allLinks: wording.links
				}
		},


	}

</script>

<style lang="scss" scoped>

	.nav-wrapper {

	}

</style>
