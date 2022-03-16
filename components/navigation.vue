<template>
	<div class="navigation-main-wrapper">
	
		<nav-mobile v-if="$store.state.variables.isMobile" />

		<nav-desktop v-else :design="design"/>
		

	</div>
</template>

<script>

	import navMobile from "@/components/nav-mobile.vue";
	import navDesktop from "@/components/nav-desktop.vue";

	export default {
		
		components: {
			"nav-mobile": navMobile,
			"nav-desktop": navDesktop

		},

		props: {
			design: {
				type: String,
				required: true
			}

		},
	}
	
</script>

<style lang="scss" scoped>
	
	.navigation-main-wrapper {
		z-index: 500;

		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background-color: var(--color-bg);
	}

</style>
