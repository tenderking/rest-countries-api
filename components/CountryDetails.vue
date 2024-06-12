<script lang="ts" setup>

const neighbourArr = reactive<string[]>([])
const nativeArr = reactive<Set<string>>(new Set())
const props = defineProps<{
  url: string
}>()

const { pending, data: countryDetails, error } = await useFetch(props.url, {
  key: props.url,
})

const imgUrl = await countryDetails.value[0].flags.svg.toString()
await Object.values(countryDetails.value[0].name.nativeName).forEach((val) => nativeArr.add(val.common))

await countryDetails.value.forEach(async (country) => {
  country.borders.forEach(async (border) => {
    const urlBorder = `https://restcountries.com/v3.1/alpha/${border}`

    const { data, error } = await useFetch(urlBorder, {
      key: urlBorder,
    })

    if (!error.value) {
      const result = data.value[0].name.common
      neighbourArr.push(result)
    }
  })


})

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
      <img :src="imgUrl" alt="flag" />
      <div class="details_info">

        <template v-for="country in countryDetails" :key="country.name.common">
          <ul class="basic-details">
            <h2>Details {{ country.name.common }}</h2>

            <li>
              <b> Native name: </b>
              <span v-for="native in [...nativeArr]"> {{ native }}, &nbsp; </span>
            </li>

            <li>
              <b> Population: </b>
              <span>{{ country.population.toLocaleString("en-US") }}</span>
            </li>

            <li>
              <b> Region: </b>
              {{ country.region }}
            </li>

            <li>
              <b> Sub Region: </b>
              {{ country.region }}
            </li>
            <li>
              <b> Capital: </b>
              <span v-for="lan in country.capital">{{ lan }}, &nbsp;</span>
            </li>
          </ul>
        </template>

        <template v-for="item in countryDetails" :key="item.name.common">
          <ul class="special-details">
            <h2>&nbsp;</h2>
            <li>
              <b> Top level Domain:</b>
              {{ item.tld[0] }}
            </li>
            <li>
              <b> Currencies: </b>
              <span v-for="currency in item.currencies">{{ currency.name }}</span>
            </li>
            <li>
              <b> Langauges: </b>
              <span v-for="lan in item.languages">{{ lan }}, &nbsp;</span>
            </li>
          </ul>

          <div class="neighbour">
            <h3>Border countries</h3>
            <NuxtLink class="neighbour__link" v-for="neighbour in neighbourArr" :to="neighbour" tabindex="0">
              <span class="neighbour__link-button">

                {{ neighbour }}
              </span>
            </NuxtLink>
          </div>
        </template>
      </div>
    </template>
  </section>


</template>


<style lang="sass">
.details-container
  .neighbour
    padding: 2rem
    .neighbour__link
      padding:0.25rem 0.5rem
      box-shadow: var(--shadow)
      margin: 0.5rem
      border-radius: var(--radius)
      background-color: var(--elements)
      .neighbour__link-button
        padding: 0.5rem
        border-radius: var(--radius)
        margin: 1.5rem
        h2
          margin-bottom: 2rem
      p
        display: inline-block
        margin-bottom: 1rem
        font-weight: normal

  img
    border-radius: var(--radius)
    margin-block: 2rem // Added space for h2


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
      display: grid
      padding: 2rem
      justify-content: center
      grid-column: 3 / span 2
      grid-row: 1/4
      grid-template-columns: subgrid
      .basic-details
        grid-column: 1/2
        
        h2
          grid-row: 1/2
      .special-details
        grid-column: 2/3
        align-self: start

      .neighbour
        grid-column: 1 / span 2 // Span two columns (3 and 4)
        justify-content: center
</style>
