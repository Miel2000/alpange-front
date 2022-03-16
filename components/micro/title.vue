<template>
	<div class="micro-title">

		<div class="main-container">

			<span class="main main-text-faded">{{ mainTitle }}</span>

			<h4 class="main main-text-consistent">{{  mainTitle }}</h4>

			<span class="main main-text-faded">{{ mainTitle }}</span>

		</div>

		<h5 v-if="subTitle" class="sub sub-text">{{  subTitle }}</h5>

	</div>
</template>

<script>

	export default {
		props: {

			mainTitle: {
				type: String,	
				required: true
			},

			subTitle: {
				type: String,
				default: ""
			}

		}

	}

</script>

<style lang="scss" scoped>

	.micro-title {
		position: relative;
		width: 100%;
		text-align: center;

		.faded {
			opacity: .3;
		}


		.main {

			font-family: "PresicavRg";
			font-size: 18px;
			display: inline-block;
			text-transform: uppercase;
			line-height: 22px;
			letter-spacing: 7.2px;

			@media #{$mobile} {
				font-size: 4.5vw;
			}

			&-container {
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;

				@media #{$mobile}{
					flex-direction: column;
				}
			}

			&-text {

				&-consistent {

					&::after {
						content: "";
						display: block;
						height: 1px;
						background-color: var(--color-white);
						width: 80%;
						margin: 0 auto;
						margin-top: 13px;

						@media #{$mobile} {
							display: none;
						}
					}

				}

				&-faded {
					opacity: 0.3;

					@media #{$mobile} {
						display: block;
						opacity: 0.15;
					}

				}

			}
		}

		.sub {
			margin-top: 12px;
			font-family: "AktivGrotesk";
			font-size: 16px;
			line-height: 21px;

			&-text {
				font-size: 16px;
				text-transform: uppercase;
				letter-spacing: normal;

				@media #{$mobile} {
					font-size: 13px;
					margin-top: 40px;
				}
			}

		}

		*[class*="text"] {
			color: var(--color-white);
		}


	}

</style>
