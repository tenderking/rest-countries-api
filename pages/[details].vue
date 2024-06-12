<script setup>
// console.log(borderCountry.value)
const route = useRoute();
const url = ref(
	`https://restcountries.com/v3.1/name/${route.params.details}?fullText=true`
);
onMounted(() => (document.documentElement.scrollTop = 0));
</script>
<template>
	<main class="details-page">
		<header>
			<NuxtLink to="/" class="link__back">

				<i><svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="arrow"
						xmlns="http://www.w3.org/2000/svg" stroke="var(--fill-color)" aria-hidden="true">
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
		<CountryDetails v-else :url />
	</main>
		</template>

<style lang="sass" scoped>
	.details-page
		padding: 2rem
		height: 100%		
		a.link__back
			padding: 0.5rem 1rem
			border-radius: var(--radius)
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

	@media (min-width:650px)
		.details-page
			a.link__back
				box-shadow: none
			section
				height: 100%
				padding: 1em
</style>
