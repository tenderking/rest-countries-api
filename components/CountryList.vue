<script lang="ts" setup>
import type { Country } from '~/types/Countries'

defineProps({
  countries: Array as PropType<Country[]>,
})
</script>

<template>
  <div v-for="country in countries" :key="country.fifa" class="card-container">
    <CountryCard :country />
  </div>
</template>

<style lang="sass">
.card-container
  display: flex
  flex-direction: column
  gap: 2rem
  align-items: center
  padding-block: 2rem
  &:focus
    border: 2px solid var(--color)
@media (min-width:650px)
  .card-container
    display: grid
    grid-template-columns: repeat(auto-fit,20rem)
    justify-content: center
    padding:2rem
</style>
