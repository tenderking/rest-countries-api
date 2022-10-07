<script setup>
/* Variables  */

const regionSelected = ref("");
const regionUrl = ref("");
const isSearching = ref(false);
const searchQuery = ref("");
const countryUrl = ref("");
const countriesUrl = "https://restcountries.com/v3.1/all";
const Regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

/* APIs */

const { pending: pendingAll, data: countriesApi } = await useFetch(
	countriesUrl
);
const { pending: pendingRegion, data: regionApi } = await useFetch(regionUrl);
const { pending: pendingSearch, data: countryApi } = await useFetch(
	countryUrl
);

/** functions */
function getCountry(e) {
	isSearching.value = true;
}

/** Computed */

const allCountries = computed(() => {
	if (regionSelected.value.length) {
		console.log(regionUrl);
		console.log("selected: ", regionSelected.value);
		return regionApi.value;
	}
	if (isSearching.value) {
		return countryApi.value;
	}
	return countriesApi.value;
});

/* watcher */

watch(regionSelected, () => {
	regionUrl.value =
		"https://restcountries.com/v3.1/region/" + regionSelected.value;
});

watch(searchQuery, () => {
	countryUrl.value =
		"https://restcountries.com/v3.1/name/" + searchQuery.value;
});
</script>
<template>
	<div class="main">
		<header class="query-nav">
			<div class="search-input">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
						fill="#B2B2B2" />
				</svg>
				<input type="search" placeholder="search for a country" @keyup.enter="getCountry($event)"
					v-model.lazy="searchQuery" />
			</div>

			<select name="Filter By Region" id="filter-drop-down" v-model="regionSelected">
				<option disabled selected hidden value="">Filter by region</option>
				<option v-for="region in Regions" :key="region">
					{{ region }}
				</option>
			</select>
		</header>
		<main class="card-container">
			<div v-if="pendingAll">
				<h2>loading...</h2>
			</div>
			<div v-else-if="pendingSearch">
				<h2>loading...</h2>
			</div>
			<div v-else-if="pendingRegion">
				<h2>loading...</h2>
			</div>
			<template v-else>
				<div v-for="country in allCountries" class="card">
					<NuxtLink :to="country.name.common" :replace="true">
						<img :src="country.flags.png" :alt="country.name.common" />
						<div class="card-text">
							<h2>
								{{ country.name.common }}
							</h2>
							<div>
								<span>
									<h3>Population:&nbsp;</h3>
									<p>
										{{ (country.population).toLocaleString('en-US') }}
									</p>
								</span>
							</div>
							<div>
								<h3>Region:&nbsp;</h3>
								<p>
									{{ country.region }}
								</p>
							</div>
							<div>
								<h3>Capital:&nbsp;</h3>
								<p v-for="capital in country.capital" :key="capital">
									<span>
										{{ capital }}
									</span>
								</p>
							</div>
						</div>
					</NuxtLink>
				</div>
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
				select
					width: fit-content
					padding: 0.5rem 2rem
					border-radius: var(--radius)
					outline: none
					border:0
					box-shadow: var(--shadow)
					background-color: var(--elements)
					color: var(--color)
					option
						top:2rem

				.search-input
					padding: 0.5rem 0.25rem 0.5rem 1rem
					border-radius: var(--radius)
					box-shadow: var(--shadow)
					display: flex
					gap: 1rem
					align-items: center
					background-color: var(--elements)
					input
						border: none
						background-color: var(--elements)
						color: var(--input)



			.card-container
				display: flex
				flex-direction: column
				gap: 2rem
				align-items: center
				padding-block: 2rem


				.card
					border-radius: var(--radius)
					box-shadow: var(--shadow)
					overflow: hidden
					background: var(--elements)
					a
						text-decoration: none
						color: inherit
						img
							// width:23rem
							// height:15rem 
							

						.card-text
							padding: 2rem
							h2
								padding-bottom: 2rem
								max-width: 50ch
								font-size: 1.5rem

							p, h3
								display: inline-block
								padding-bottom: 1rem


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
