<script setup lang="ts">
import type { Country } from '~/types/Countries'
/* Reactive Variables */
const regionSelected = ref<string>('')
const searchQuery = ref<string>('')
const BASE_URL = 'https://restcountries.com/v3.1'
const nuxtApp = useNuxtApp()

const url = computed(() => {
  if (regionSelected.value) {
    return `${BASE_URL}/region/${regionSelected.value}`
  }
  else if (searchQuery.value) {
    return `${BASE_URL}/name/${searchQuery.value}`
  }
  else {
    return `${BASE_URL}/all`
  }
})

/* Fetch Data */
const { pending, data } = await useFetch<Country[]>(url, {
  headers: {
    Accept: 'application/json',
  },
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

/* Watchers */
watch(regionSelected, () => searchQuery.value = '')
watch(searchQuery, () => regionSelected.value = '')
onMounted(() => {
  document.documentElement.scrollTop = 0
})
</script>

<template>
  <div class="main">
    <header class="query-nav">
      <CountrySearchBar v-model:search-query="searchQuery" />
      <RegionSelectButton v-model="regionSelected" />
    </header>
    <main class="card-container">
      <div v-if="pending">
        Loading...
      </div>
      <template v-else-if="data">
        <CountryList :countries="data" />
      </template>
      <div v-else>
        No data found
      </div>
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
