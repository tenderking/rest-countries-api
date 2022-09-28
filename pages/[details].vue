<template>
	<div class="details-page">
		<NuxtLink to="/">
			<button>
				<i
					><svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z"
							fill="white"
						/>
					</svg>
				</i>
				back
			</button>
		</NuxtLink>
		<div class="container">
			<div v-for="country in countryDetails" :key="country.name.common">
				<img :src="country.flags.png" alt="flag" />
				<h2>Details {{ route.params.details }}</h2>
				<h3>
					Native name:
					<p v-for="native in country.name.nativeName">
						{{ native.official }}, &nbsp;
					</p>
				</h3>

				<h3>
					Population:
					<p>{{ country.population }}</p>
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
			<div v-for="item in countryDetails" :key="item.name.common">
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

				<div>
					<h3>Border countries</h3>
					<span v-for="neighbour in item.borders">{{ neighbour }}, &nbsp;</span>
				</div>
			</div>
		</div>
		<!-- <pre> {{ countryDetails }}</pre> -->
	</div>
</template>
<script setup>
	const route = useRoute();
	const url = "https://restcountries.com/v3.1/name/" + route.params.details;
	const { data: countryDetails } = await useFetch(url);
</script>
<style scoped>
	.details-page {
		padding: 2rem;
	}
	button {
		padding: 0.5rem 1rem;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
	img {
		border-radius: 1rem;
		margin-block: 2rem;
	}
	.details-page h2 {
		margin-bottom: 2rem;
	}

	.details-page p {
		display: inline-block;
		margin-bottom: 1rem;
		font-weight: normal;
	}
</style>
