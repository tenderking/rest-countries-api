<script lang="ts" setup>
import type { Country } from '~/types/Countries'

const props = defineProps<{
  url: string
}>()
const neighbourArr = reactive<string[]>([])
const nativeArr = reactive<Set<string>>(new Set())
const { pending, data: countryDetails, error } = await useFetch<Country[]>(props.url, {
  key: props.url,

})
const imgUrl = ref<string>('')

if (countryDetails.value) {
  imgUrl.value = await countryDetails.value[0].flags.svg.toString()
  await Object.values(countryDetails.value[0].name.nativeName).forEach(val => nativeArr.add(val.common))
  await countryDetails.value.forEach(async (country) => {
    if (!country.borders)
      return
    country.borders.forEach(async (border) => {
      const urlBorder = `https://restcountries.com/v3.1/alpha/${border}`

      const { data, error } = await useFetch<Country[]>(urlBorder, {
        key: urlBorder,
      })

      if (!error.value && data.value) {
        const result = data.value[0].name.common
        neighbourArr.push(result)
      }
    })
  })
}
</script>

<template>
  <section class="details-container">
    <div v-if="pending">
      loading
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <template v-else>
      <img :src="imgUrl" alt="flag">
      <div v-if="countryDetails" class="details_info">
        <h2>{{ countryDetails[0].name.common }}</h2>
        <div class="basic-details">
          <ul>
            <li>
              <b> Native name: </b>
              <span v-for="native in [...nativeArr]" :key="native"> {{ native }}, &nbsp; </span>
            </li>

            <li>
              <b> Population: </b>
              <span>{{ countryDetails[0].population.toLocaleString("en-US") }}</span>
            </li>

            <li>
              <b> Region: </b>
              {{ countryDetails[0].region }}
            </li>

            <li>
              <b> Sub Region: </b>
              {{ countryDetails[0].region }}
            </li>
            <li>
              <b> Capital: </b>
              <span v-for="lan in countryDetails[0].capital" :key="lan">{{ lan }}, &nbsp;</span>
            </li>
          </ul>

          <ul>
            <li>
              <b> Top level Domain:</b>
              {{ countryDetails[0].tld[0] }}
            </li>
            <li>
              <b> Currencies: </b>
              <span v-for="currency in countryDetails[0].currencies" :key="currency">{{ currency.name }}</span>
            </li>
            <li>
              <b> Langauges: </b>
              <span v-for="lan in countryDetails[0].languages" :key="lan">{{ lan }}, &nbsp;</span>
            </li>
          </ul>
        </div>
        <div class="neighbour">
          <h3>Border countries</h3>
          <NuxtLink v-for="neighbour in neighbourArr" :key="neighbour" class="neighbour__link" :to="neighbour"
            tabindex="0">
            <span class="neighbour__link-button">

              {{ neighbour || "No border found" }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </template>
  </section>
</template>

<style lang="sass">
.details-container
  .basic-details
    display: flex
    flex-direction: column
    gap: 2rem
    ul
      list-style: none
      padding: 0
      margin: 0
      li
        margin-bottom: 0.5rem
  .neighbour
    padding-block: 2rem
    h3
      margin-bottom: 1rem
    .neighbour__link
      display: inline-block
      padding:0.25rem 0.5rem
      box-shadow: var(--shadow)
      margin: 0.25rem
      border-radius: var(--radius)
      background-color: var(--elements)
      .neighbour__link-button
        padding: 0.5rem
        border-radius: var(--radius)
        margin: 1.5rem
      p
        display: inline-block
        margin-bottom: 1rem
        font-weight: normal
  img
    border-radius: var(--radius)
    margin-block: 2rem // Added space for h2
    width: 100%
  h2
    font-size: 2rem
    margin-block: 1rem 1rem

@media (min-width: 650px)
  .details-container
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-template-rows: repeat(4, 1fr)
    gap: 1rem
    img
      grid-column: 1/3
      grid-row: 1/4
      width: 100%
    .details_info
      grid-column: 3/5
      display: flex
      padding: 2rem
      justify-content: center
      flex-direction: column
      width: 100%
      .basic-details
        display: flex
        flex-direction: row
        gap: 2rem
    h2
      font-size: 2rem
      margin-block: 2rem 1rem
</style>
