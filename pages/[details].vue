<script setup>
const route = useRoute();

const url = ref(
	`https://restcountries.com/v3.1/name/${route.params.details}?fullText=true`
);
const urlBorder = ref(
	"https://restcountries.com/v2/alpha/" + route.params.details
);
const countryDetails = ref(null);
const { pending, data, error } = await useFetch(url, {
	initialCache: false,
}).catch(() => useFetch(urlBorder).catch(error => error));
countryDetails.value = await data.value;
onMounted(() => (document.documentElement.scrollTop = 0));

watch(
	() => route.params.details,
	() => {
		console.log("params Details changed");
	}
);
</script>
<template>
	<div class="details-page">
		<NuxtLink to="/">
			<button>
				<i><svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="arrow" xmlns="http://www.w3.org/2000/svg"
						stroke="var(--fill-color)">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z"
							fill="var(--fill-color)" />
					</svg>
				</i>
				<p>back</p>
			</button>
		</NuxtLink>
		<div v-if="pending">Loading...</div>
		<div v-if="error">Something went wrong...</div>
		<div v-else>
			<div v-show="countryDetails" class="details-container">
				<template v-for="country in countryDetails" :key="country.name.common">
					<img :src="country.flags.png" alt="flag" />

					<div class="basic-details">
						<h2>Details {{ country.name.common }}</h2>

						<h3>
							Native name:
							<p v-for="native in country.name.nativeName">
								{{ native.common }}, &nbsp;
							</p>
						</h3>

						<h3>
							Population:
							<p>{{ (country.population).toLocaleString('en-US') }}</p>
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
						<NuxtLink class="neighbour__link" v-for="neighbour in item.borders" :to="neighbour">{{ neighbour }}
						</NuxtLink>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.details-page
		padding: 2rem
		height: 100%
		.neighbour
			&__link
				box-shadow: var(--shadow)
				padding-inline: 1rem				
		a
			button
				padding: 0.5rem 1rem
				display: flex
				box-shadow: var(--shadow)
				border: none
				background-color: var(--elements)
				justify-content: center
				gap: 0.5rem
				margin-bottom: 1rem
				
				p
					margin:0


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
			a
				button
					box-shadow: none
			div
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
