<script setup>
const route = useRoute();


const url = ref(
	`https://restcountries.com/v3.1/name/${route.params.details}?fullText=true`
);


const {
	pending,
	data: countryDetails,
	error,
} = await useFetch(url, {
	key: url.value,
});


const neighbourArr = reactive([]);
let nativeArr = new Set()
countryDetails.value.forEach(async (country) => {
	// console.log('current country', country.cca2);
	// console.log('current country.borders', country.borders);
	country.borders.forEach(async (border) => {
		// console.log('current border:', border);
		const urlBorder = `https://restcountries.com/v3.1/alpha/${border}`;

		const { data, error } = await useFetch(urlBorder, {
			key: urlBorder,
		});

		if (!error.value) {
			console.log('got proxy', data.value);
			const result = data.value[0].name.common;
			neighbourArr.push(result);
		} else {
			// console.log('error');
		}
	});

	Object.values(country.name.nativeName).forEach(val => nativeArr.add(val.common))
});


// console.log(borderCountry.value)

onMounted(() => (document.documentElement.scrollTop = 0));
</script>
<template>
	<main class="details-page">
		<header>

			<NuxtLink to="/" class="link__back">

				<i><svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="arrow" xmlns="http://www.w3.org/2000/svg"
						stroke="var(--fill-color)" aria-hidden="true">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z"
							fill="var(--fill-color)" />
					</svg>
				</i>
				<p>back</p>

			</NuxtLink>

		</header>
		<div v-if="pending">Loading...</div>
		<div v-if="error">Something went wrong...</div>
		<section v-else class="details-container">

			<template v-for="country in countryDetails" :key="country.name.common">
				<img :src="country.flags.png" alt="flag" />

				<div class="basic-details">
					<h2>Details {{ country.name.common }}</h2>

					<h3>
						Native name:
						<p v-for="native in nativeArr">
							{{ native }}&nbsp;
						</p>
						<!-- <pre>{{nativeArr}}</pre> -->
					</h3>

					<h3>
						Population:
						<p>{{ country.population.toLocaleString("en-US") }}</p>
					</h3>

					<h3>
						Region:
						<p>{{ country.region }}</p>
					</h3>

					<h3>
						Sub Region:
						<p>{{ country.region }}</p>
					</h3>

					<h3>
						Capital:
						<p v-for="lan in country.capital">{{ lan }}, &nbsp;</p>
					</h3>
				</div>
			</template>

			<template v-for="item in countryDetails" :key="item.name.common">
				<div class="special-details">
					<h3>
						Top level Domain:
						<p>{{ item.tld[0] }}</p>
					</h3>

					<h3>
						Currencies:
						<p v-for="currency in item.currencies">{{ currency.name }}</p>
					</h3>

					<h3>
						Langauges:
						<p v-for="lan in item.languages">{{ lan }}, &nbsp;</p>
					</h3>
				</div>

				<div class="neighbour">
					<h3>Border countries</h3>
					<NuxtLink class="neighbour__link" v-for="neighbour in neighbourArr" :to="neighbour" tabindex="0">

						{{ neighbour }}

					</NuxtLink>

				</div>
			</template>

		</section>
	</main>
</template>

<style lang="sass" scoped>
	.details-page
		padding: 2rem
		height: 100%
		
		a.link__back
			padding: 0.5rem 1rem
			width: max-content
			display: flex
			box-shadow: var(--shadow)
			border: none
			background-color: var(--elements)
			justify-content: center
			gap: 0.75rem
			margin-bottom: 1rem
			p
				margin:0
		.details-container			
			.neighbour
				.neighbour__link
					padding-inline: 1rem
					box-shadow: var(--shadow)
					margin-inline: 0.25rem
					border-radius: var(--radius)
					background-color: var(--elements)
				


		img
			border-radius: var(--radius)
			margin-block: 2rem
		h2
			margin-bottom: 2rem
		p
				display: inline-block
				margin-bottom: 1rem
				font-weight: normal

	@media (min-width:650px)
		.details-page
			a.link__back
				box-shadow: none
			section
				height: 100%
				padding: 1em


				.details-container
					display: grid
					grid-template-columns: repeat(4,1fr)
					grid-template-rows: repeat(4,1fr)
					gap:1rem


					img
						grid-column:  1/3
						grid-row: 1/4
						width: 100%
					.basic-details
						grid-column:  3/4
						grid-template-columns: subgrid
						h2
							grid-row: 1/2
					.special-details
						padding-top:4rem
						grid-column: 4/5
						justify-self: center
						align-self: start
					.neighbour
						grid-column: 3/span2
</style>
