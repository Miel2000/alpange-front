<template>

<div>
	<div class="work-description-subtitle-container">

		<transition name="transition-description-y-up">

			<h4 v-if="currentKey === item.key" 
				class="work-description-subtitle-content font-description-subtitle"
			>
				{{ item.subtitle }}
			</h4>
			
		</transition>

	</div>

	<transition name="transition-description-y-down">

		<div v-if="currentKey === item.key"
			class="work-description-text font-description-text"
		>

			<p v-for="sentence in item.description" :key="sentence.id">
				{{ sentence }}
			</p>

		</div>

	</transition>

</div>
  
</template>

<script>
export default {

		props: {
			infosWork: {
				type: Object,
				required: true
			}
	},


}
</script>

<style>

</style>