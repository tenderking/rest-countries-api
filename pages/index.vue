<template>
	<main>
		<header class="query-header">
			<input
				type="search"
				placeholder="search for a country"
				@keyup.enter="getCountry($event)"
				v-model.lazy="searchQuery"
			/>
			<select
				name="Filter By Region"
				id="filter-drop-down"
				v-model="regionSelected"
			>
				<option disabled selected hidden value="">Filter by region</option>
				<option v-for="region in Regions" :key="region">
					{{ region }}
				</option>
			</select>
		</header>
		<main class="main">
			<div class="card" v-for="country in allCountries">
				<NuxtLink :to="country.name.common">
					<img :src="country.flags.png" :alt="country.name.common" />
					<div class="card-text">
						<h2>
							{{ country.name.common }}
						</h2>
						<div>
							<span>
								<h3>Population:</h3>
								<p>
									{{ country.population }}
								</p>
							</span>
						</div>
						<div>
							<h3>Region:</h3>
							<p>
								{{ country.region }}
							</p>
						</div>
						<div>
							<h3>Capital:</h3>
							<p v-for="capital in country.capital" :key="capital">
								<span>
									{{ capital }}
								</span>
							</p>
						</div>
					</div>
				</NuxtLink>
			</div>
		</main>
	</main>
</template>
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

	const { data: countriesApi } = await useFetch(countriesUrl);
	const { data: regionApi } = await useFetch(regionUrl);
	const { data: countryApi } = await useFetch(countryUrl);

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
<style lang="sass" scoped>



	header
		display: flex
		flex-direction: column
		gap: 1rem

		select
			width: fit-content
			padding: 0.5rem 2rem
			border-radius: 10px
			border: 2px solid white

		input
			padding: 0.5rem 2rem
			border-radius: 10px

	.main
		display: flex
		flex-direction: column
		gap: 2rem
		align-items: center
		padding-block: 2rem
		a
			text-decoration: none
			color: inherit
			.card
				border-radius: 1rem
				box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
				overflow: hidden

				.card-text
					padding: 2rem

					h2
						padding-bottom: 2rem

					p, h3
						display: inline-block
						padding-bottom: 1rem
</style>
