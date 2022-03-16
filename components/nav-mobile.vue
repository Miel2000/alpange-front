<template>

	<div class="nav-mobile-container">

		<!-- header -->
		<transition name="transition-logo-j">

			<!-- <div v-if="!displayMenuMobile" class="mobile-wrapper"> -->
	
			<div class="header-wrapper">			

				<div class="header-logo">

					<NuxtLink  v-on:click.native="closeHandler" to="/">
						<menu-logo-j class="mobile-logo" />
					</NuxtLink>

				</div>

				<div  @click="openHandler" class="header-toggle">

					<menu-lines  />

				</div>

			</div>

		</transition>


		<!-- panel -->
		<transition name="transition-nav-mobile">

			<div 
				v-touch:swipe="swipePanel" 
				v-if="computedIsMobileNavOpen"
				class="panel-wrapper"
			>

				<div 
					@click="closeHandler"
					class="panel-mask-bg">
				</div>

				<div v-on:click="closeHandler" class="header-cross">

					<header-cross />

				</div>

				<div class="panel-logo-container">
					<NuxtLink  v-on:click.native="closeHandler" to="/">
						<menu-logo-j class="mobile-logo" />
					</NuxtLink>


				</div>

				<div class="panel-nav-container" >

					<nav>

						<ul>

							<li v-for="link in  allLinks" :key="link.id">

								<NuxtLink  v-on:click.native="closeHandler" :to="link.to">

									{{ link.label }}

								</NuxtLink>

							</li>

						</ul>

					</nav>

				</div>

			</div>

		</transition>

		<transition name="transition-mobile-blur">
			<div 
			v-if="computedIsMobileNavOpen"
			@click="closeHandler"
			data-info="nav-blur"
			class="nav-blur"
			>

			</div>
		</transition >
	</div>
	
</template>

<script>

	import logoJ from "@/assets/svg/logoJ.svg";
	import Cross from "@/assets/svg/cross.svg";
	import menuLines from "@/assets/svg/menuLines.svg";
	
	import wording from "@/assets/data/wording"

export default {

	components: {
		"menu-lines": menuLines,
		"menu-logo-j": logoJ,
		"header-cross": Cross
	},

	data() {
		return {
			displayMenuMobile: true,
			allLinks: wording.links
		}
	},

	methods: {

		openHandler() {

			this.$store.commit('variables/setMobileNavOpen', true)

		},

		closeHandler() {

			this.$store.commit('variables/setMobileNavOpen', false)

		},
		swipePanel( direction ) {

			if( direction === "right" ) {

				this.$store.commit('variables/setMobileNavOpen', false)

			}

		}
	},


	computed: {

		computedIsMobileNavOpen() {
			
			return  this.$store.state.variables.isMobileNavOpen;

		}

	}

}

</script>

<style lang="scss" scoped>

	.nav-mobile-container {

		.header-wrapper {
			z-index:501;
			display:flex;
			flex-direction: row;
			height: 90px;
	
			.header-logo {
				
				display:flex;
				padding: 20px 0;
				margin: 0 auto;
			}
		
			.header-toggle {
				color: var(--color-primary);
				position: absolute;
				height: auto;
				height: 90px;
				right: 4px;
				top: -5px;
				display: flex;
				align-items: center;
			}
			
		}

		.panel-wrapper {

			z-index: 510;
			position: fixed;
			right:0;
			top:0;
			width: 100%;
			height: 100vh;

			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			.header-cross {
				color: var(--color-primary);
				z-index:615;
				position:absolute;
				top: 35px;
				right: 2.5%;
			}


			.panel-logo-container {
				z-index: 600;
				padding-top: 30px;
				position: absolute;
				height: 90px;
				width: 80%;

				svg {
					width: 40%;
					display: block;
					margin: 0 auto;
				}

			}

			.panel-mask-bg {
				left: 0;
				position: absolute;
				width: 20%;
				height: 100%;
				position: fixed;
			}

			.panel-nav-container {
				justify-content: space-around;
				flex-flow: column;
				display: flex;
				height: 100%;
				width: 80%;

				nav {
					border-left: solid 1px rgba(255,255,255, 0.4);
					display: flex;
					justify-content: center;
					flex-direction: column;
					width: 100%;
					height: 100%;
					background-color: #000;

					ul {
						margin-left: 40px;
						margin-left: 40px;
						height: 20%;
						display: flex;
						flex-flow: column nowrap;
						justify-content: space-between;

						li {
							padding-bottom: 5px;

							a {
								color:white;
								font-family: 'AktivGrotesk';
								text-decoration: none;
								text-transform: uppercase;
								letter-spacing: 1.8px;
							}

						}

					}

				
				}

			}

		}

		.nav-blur {
			z-index: 450;
			width: 100%;
			height: 100%;
			position: fixed;
			top:0;
			left:0;
			background-color:rgba(255,255,255, 0.4)
		}

	}

</style>
