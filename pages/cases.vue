<template>

	<div v-if="casesParsed" class="cases-wrapper">	

		<transition name="transition-case-viewer">

			<case-viewer v-if="viewerIsActive" :item="currentProjet"/>

		</transition>
		
		<transition name="transition-case-viewer">

			<case-listing v-if="!viewerIsActive" :cases="cases"/>

		</transition>
		
	</div>

</template>

<script>

	import CaseViewer from "@/components/case-viewer.vue"
	import CaseListing from "@/components/cases-listing.vue"

	import allCasesQuery from "~/apollo/queries/case/cases"

	export default {

		layout: "mainLayout",

		components: {
			"case-viewer": CaseViewer,
			"case-listing": CaseListing
		},

		data(){
			return {
				currentProjet: null,
				viewerIsActive: false,
				pageIsArrived: false,
				checkExtraInfo: false,
				cases: {}
				
			}
		},

		apollo: {

			cases: {
				prefetch: true,
				query: allCasesQuery
			}

		},

		computed: {

			casesParsed() {


				if( this.cases.data  ) {

					// Comme on ne maitrise pas si chaque case va avoir des extraInfos
					// on fait en sorte que tout ce qui est .length === 0 (string et array)
					// soit écrasé par un array vide
					// (si le field est laissé vide à la contribution, nous aurons ici une string de length === 0)
					this.cases.data.forEach(item => {

						// gérer le cas de la string vide :
						if( item.attributes.extraInfos.length === 0 ){

							item.attributes.extraInfos = [];

						}

					});


					// GO PARSER GO

					this.cases.data.forEach( item => {
						
						// 1 -- ExtraInfos parsing --
						// on check si on a bien une string à parser
						if( typeof item.attributes.extraInfos === "string" ){

							item.attributes.extraInfos = item.attributes.extraInfos
									// ["LABEL _ INFO"]
									.split(new RegExp("\n"))

									// ["LABEL ", " INFO"]
									.map( oneInfoLabelAndValue => oneInfoLabelAndValue.split(new RegExp("_")))
									
									// ["LABEL", "INFO"] 
									.map( element => element.map( elToTrim => elToTrim.trim() ));

						}


						// 2 -- Descriptions parsing --
						item.attributes.descriptionsParsed =  item.attributes.description.split(new RegExp("\n\n"));

					});

					// Order by .order
					return this.cases.data.sort((a, b) => {

						return a.attributes.order - b.attributes.order;

					});
	
				} else {
					
					return null;

				}
				
			}
		},

		created() {
		
			this.$nuxt.$on('open-viewer', this.openViewerHandler);
			
			this.$nuxt.$on('close-viewer', this.closeViewerHandler);

			this.$nuxt.$on('go-next-project', this.goNextProject);

		},

		beforeDestroy(){
			this.$nuxt.$off('open-viewer');
			this.$nuxt.$off('close-viewer');
			this.$nuxt.$off('go-next-project');
		},

		methods: {
			openViewerHandler( event ) {

				const receivedProjectOrder = parseInt(event.projectId);

				this.currentProjet = this.casesParsed.find( project => project.attributes.order === receivedProjectOrder);

				this.viewerIsActive = true;

			},

			closeViewerHandler() {

				this.currentProjet = null;

				this.viewerIsActive = false;
			},

			goNextProject( event ) {

				let receivedId = event.currentProjectOrder;

				// this.viewerIsActive = false;

				this.scrollToTop();

				receivedId++;

				if( receivedId >= this.casesParsed.length ) {

					this.currentProjet = this.casesParsed.find( project => project.attributes.order === 1);

				} else {

					this.currentProjet = this.casesParsed.find( project => project.attributes.order === receivedId);

				}

				// this.viewerIsActive = true;

			},

			scrollToTop() {

				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});

			}

		}
	
	}

</script>

<style lang="scss">

	.cases-wrapper {
		// 
	}

</style>