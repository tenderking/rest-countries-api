<template>
  <div v-for="country in countries"  class="card-container">
    <CountryCard :country />
  </div>
</template>

<script lang="ts" setup>

defineProps({
  countries: Array
})

</script>

<style lang="sass">
			.card-container
				display: flex
				flex-direction: column
				gap: 2rem
				align-items: center
				padding-block: 2rem
				&:focus
					border: 2px solid var(--color)
	@media (min-width:650px)
		.card-container
			display: grid
			grid-template-columns: repeat(auto-fit,20rem)
			justify-content: center
			padding:2rem
</style>