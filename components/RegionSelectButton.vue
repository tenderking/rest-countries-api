<script lang="ts" setup>
const Regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const regionSelected = defineModel()
</script>

<template>
  <select id="select-region" v-model="regionSelected" name="Filter By Region">
    <option selected value="">
      Filter by region
    </option>
    <option v-for="region in Regions" :key="region" tabindex="0">
      {{ region }}
    </option>
  </select>
</template>

<style lang="sass">
select
  width: fit-content
  padding: 0.5rem 2rem
  border-radius: var(--radius)
  outline: none
  border:0
  box-shadow: var(--shadow)
  background-color: var(--elements)
  color: var(--color)
  &:focus
    outline: solid
    outline-color: var(--color)
    border: 2px solid var(--color)
  option
    top:2rem
</style>
