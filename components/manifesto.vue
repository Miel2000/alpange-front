<template>
	<div class="manifesto">

		<micro-title class="manifesto-title" mainTitle="manifesto"/>

		<div class="wording-container">

			<div class="punchline-container">

				<p class="punchline-1">{{ content.attributes.punchLineOne }}</p>

				<span class="punchline-square"></span>

				<p class="punchline-2">{{ content.attributes.punchLineTwo }}</p>

			</div>

			<div class="concrete-container">

				<div class="concrete-first">

					<p class="concrete-cell" v-for=" (currentLine, index, id) in content.attributes.textFirst" :key="id">
						{{ currentLine }}
					</p>
					
				</div>

				<div class="concrete-second">

					<p class="concrete-cell" v-for=" (currentLine, index, id) in content.attributes.textSecond" :key="id">
						{{ currentLine }}
					</p>

					<div class="concrete-signature">

						<p>{{ content.attributes.signature }}</p>

						<p class="concrete-signature-name">Judith</p>

					</div>

				</div>


			</div>

		</div>

	</div>
</template>

<script>

	import wording from "@/assets/data/wording.js";

	import MicroTitle from "@/components/micro/title.vue";




	export default {

		components: {
			"micro-title": MicroTitle
		},

		props: {
			content: {
				type: Object,
				required: true,
			}
		},

		data(){
			return {
				wording: wording.manifesto
			};
		}

	}

</script>

<style lang="scss" scoped>

	.manifesto {

		$squareSize: 300px;
		$squareSizeMobile: 200px;


		background-color: var(--color-primary);
		color: var(--color-white);

		&-title {
			display: block;
			padding-top: 22px;
		}

		.wording {

			&-container {
				display: block;
				width: 90%;
				max-width: 835px;
				margin: 0 auto;
				margin-top: 114px;
				padding-bottom: 176px;

				.punchline {

					&-container {
						position: relative;

						> * {
							text-align: center;
							font-family: "PresicavRg";
							font-size: 42px;
							line-height: 50px;
							margin-bottom: 80px;

							@media #{$mobile} {
								font-size: 32px;
								line-height: 40px;
							}
						}

					}

					&-1 {
						font-weight: bold;
					}
					
					&-2 {
						font-family: "PresicavXl";
						width: 80%;
						margin: 0 auto;
					}

					&-square {
						position: absolute;
						width: $squareSize;
						height: $squareSize;
						border: solid 1px var(--color-white);
						transform: rotate(45deg);
						top: calc(50% - ($squareSize / 2));
						left: calc(50% - ($squareSize / 2));

						@media #{$mobile} {
							width: $squareSizeMobile;
							height: $squareSizeMobile;
							top: calc(50% - ($squareSizeMobile / 2));
							left: calc(50% - ($squareSizeMobile / 2));
						}

					}

				}

				.concrete {

					&-container {
						display: flex;
						flex-flow: row nowrap;
						align-items: flex-start;
						margin-top: 176px;
						justify-content: space-between;

						@media #{$mobile} {
							flex-flow: column nowrap;
						}
					}

					&-first,
					&-second {
						width: calc(50% - 8px);

						@media #{$mobile} {
							width: 100%;
						}
					}
					&-second p:last-of-type {
						font-weight: bold;
					}

					&-cell {
						margin-top: 40px;

						&:first-of-type {
							margin-top: 0;
						}

					}

					&-signature {
						display: block;
						margin-top: 25px;
						padding-top: 15px;
						border-top: solid 1px var(--color-white);

						&-name {
							text-align: right;
						}

					}

					// font
					&-cell,
					&-signature {
						font-family: "AktivGrotesk";
						font-size: 24px;
						line-height: 31px;
						letter-spacing: 0.24px;
						font-weight: 300;
					}

				}

			}

		}

	}

</style>
