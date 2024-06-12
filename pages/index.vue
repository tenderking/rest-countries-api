<script setup lang="ts">

/* Reactive Variables */
const regionSelected = ref < string > ('')
const searchQuery = ref < string > ('')
const BASE_URL = 'https://restcountries.com/v3.1';


const url = computed(() => {
	if (regionSelected.value) {
		return `${BASE_URL}/region/${regionSelected.value}`;
	} else if (searchQuery.value) {
		return `${BASE_URL}/name/${searchQuery.value}`;
	} else {
		return `${BASE_URL}/all`;
	}
});

/* Fetch Data */
const { pending, data } = await useFetch(url, {
	key: url.value
})

/* Watchers */
watch(regionSelected, () => searchQuery.value = '');
watch(searchQuery, () => regionSelected.value = '');


</script>
<template>
	<div class="main">
		<header class="query-nav">
			<CountrySearchBar v-model:search-query="searchQuery"  />
			<RegionSelectButton  v-model="regionSelected" />
		</header>
		<main class="card-container">
			<div v-if="pending">
				<h2>loading...</h2>
			</div>		
			<template v-else>
				<CountryList :countries="data" />
			</template>
		</main>
	</div>
</template>

<style lang="sass" scoped>
			.query-nav
				display: flex
				flex-direction: column
				gap: 2rem
				margin-top:2rem
				padding-inline: 1rem

			.card-container
				display: flex
				flex-direction: column
				gap: 2rem
				align-items: center
				padding-block: 2rem
				&:focus
					border: 2px solid var(--color)
	@media (min-width:650px)
		.query-nav
				flex-direction: row
				justify-content: space-between
				padding: 2rem
		.card-container
			display: grid
			grid-template-columns: repeat(auto-fit,20rem)
			justify-content: center
			padding:2rem
</style>
