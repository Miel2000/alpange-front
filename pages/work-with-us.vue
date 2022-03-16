<template>
	<div class="work">

		<div v-if="workWithUsesParsed" class="work-wrapper">

			<div v-if="$store.state.variables.isMobile" class="work-wrapper-inner">


				<div v-for="(item, index, id) in workWithUsesParsed" :key="id"
					class="mobile-item"
				>

					<work-wrapper-mobile :infos-work="item.attributes" />

				</div>

			</div>

			<div v-else class="work-wrapper-inner only-desktop">

				<div class="work-description-wrapper">

					<span class="work-description-wrapper-border"></span>

					<div v-for="(item, index, id) in workWithUsesParsed" :key="id"
						class="work-description-container"
					>

						<div class="work-description-subtitle-container">

							<transition name="transition-description-y-up">

								<h4 v-if="currentKey === item.attributes.key" 
									class="work-description-subtitle-content font-description-subtitle"
								>
									{{ item.attributes.subtitle }}
								</h4>
								
							</transition>

						</div>

						<transition name="transition-description-y-down">

							<div v-if="currentKey === item.attributes.key"
								class="work-description-text font-description-text"
							>

								<!-- @TODO : Later -->
								<p v-for="sentence in item.attributes.description" :key="sentence.id">
									{{ sentence }}
								</p>

								<!-- <p>
									{{ item.attributes.description }}
								</p> -->

							</div>

						</transition>


					</div>

				</div>

				<div class="work-section-container">

					<ul class="work-section-list">

						<li v-for="(item, index, id) in workWithUsesParsed" :key="id"
							:class="[
								'work-section-item',
								{'item-active': currentKey === item.attributes.key}
							]"
							:data-key="item.attributes.key"
							@click.stop="sectionClickHandler"
						>

							<h3 class="section-title font-section-title">

								<span v-for="(word, index, id) in item.attributes.title.split(' ')" :key="id">
									{{ word }}
								</span>

							</h3>

						</li>

					</ul>

				</div> 

			</div>

		</div>

	</div>
</template>

<script>

	import wording from "@/assets/data/wording.js";
	
	import WorkWrapperMobile from "@/components/micro/work-wrapper-mobile.vue"

	import allWorkWithUsesQuery from "~/apollo/queries/workwithus/workwithuses"

	export default {

		layout: "mainLayout",

		components: {
			"work-wrapper-mobile": WorkWrapperMobile
		},

		data(){
			return {
				wording: wording.workWithUs,
				currentKey: wording.workWithUs[0].key,
				workwithuses: {}
			}
		},

		apollo: {

			workwithuses: {
				prefetch: true,
				query: allWorkWithUsesQuery
			}

		},

		computed: {

			workWithUsesParsed(){

				if( this.workwithuses.data ){

					return this.workwithuses.data.map(item => {

						if( !item.attributes.key ){

							item.attributes.key = item.attributes.title.split(" ")[0].toLowerCase();

						}

						if( typeof item.attributes.description === "string" ){

							item.attributes.description = item.attributes.description.split(new RegExp("\n"));

						}

						return item;

					});

				} else {

					return null;

				}

			}

		},

		methods: {

			sectionClickHandler( event ){

				this.currentKey = event.target.dataset.key;

			}

		}
		
	}

</script>

<style lang="scss" scoped>

	@include fontWorkWithUs;

	.mobile {

		&-item {

			padding-top: 5px;
			margin-bottom: 60px;
	
			> * {
				position: relative;
			}

			&::before {
				content: "";
				display: block;
				width: 20px;
				height: 20px;
				background-color: var(--color-primary);
				margin: 0 auto;
				margin-bottom: 30px;
				transform: rotate(45deg);
			}

		}
	}

	.work {

		$sideWidth: 42%;
		$animDuration: 0.4s;

		* {
			color: var(--color-white);
		}

		&-wrapper {
			
			margin-bottom: calc(100px);
			
			&-inner {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-content: flex-start;

				@media #{$mobile} {
					display: block;
				}

			}

		}

		&-description {

			&-wrapper {
				// border: solid 1px orange;
				position: relative;
				width: calc(100% - $sideWidth);
				color: var(--color-white);

				&-border {
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 135px;
					border-bottom: solid 1px rgba(255,255,255,0.4);
				}
			}
			
			&-container {
				// border: solid 5px rebeccapurple;
				position: relative;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;

			}

			&-subtitle {

				&-container {
					position: absolute;
					// max-width: 200px;
					padding-right: calc(100% - 200px);
					left: 0;
					top: 0;
	
					height: 135px;

				}

				&-content {

				}
			}

			&-text {
				position: absolute;
				top: 233px;
				max-width: 400px;
				left: calc(50% - 200px);

			}

		}

		&-section {
			
			&-container {
				// border: solid 1px red;
				width: $sideWidth;

			}

			&-list {
				list-style: none;
				display: flex;
				flex-flow: column nowrap;
			}

			&-item {
				cursor: pointer;
				position: relative;
				width: 100%;
				height: auto;

				opacity: .4;

				transition: opacity $animDuration;

				&::before {
					// little square
					content: "";
					position: absolute;
					display: block;
					top: calc(50% - 12.5px);
					right: 0;
					width: 25px;
					height: 25px;

					transform: rotate(45deg);

					border: solid 1px var(--color-white);
					background-color: transparent;

					transition: 
						border-color $animDuration, 
						background-color $animDuration;

				}

				&::after {
					// underline
					content: "";
					position: absolute;
					display: block;
					bottom: 0;
					width: 100%;
					max-width: 260px;
					height: 1px;
					background-color: var(--color-white);

					transition: background-color $animDuration;
				}

				&:first-of-type {
					> * {
						margin-top: 0;
					}
				}

				&:last-of-type {
					> * {
						margin-bottom: 0;
					}

					&::after {
						display: none;
					}
				}

				> * {
					pointer-events: none;

					transition: color calc($animDuration / 2);

					margin: 40px 0;
					// margin: 5vh 0;

				}

				&.item-active {
					opacity: 1;

					&::before {
						background-color: var(--color-primary);
						border-color: var(--color-primary);
					}

					// &::after {
					// 	background-color: var(--color-primary);
					// }

					> * {
						color: var(--color-primary);
					}

				}

				.section-title {

					span {
						display: block;
					}

				}

			}

		}

	}

	

</style>
