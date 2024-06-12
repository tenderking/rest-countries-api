<template>
  <NuxtLink :to="country.name.common" :replace="true" class="card">
    <img :src="country.flags.svg" :alt="country.name.common" />
    <div class="card-text">
      <h2>
        {{ country.name.common }}
      </h2>
      <div>
        <span>
          <h3>Population:&nbsp;</h3>
          <p>
            {{ (country.population).toLocaleString('en-US') }}
          </p>
        </span>
      </div>
      <div>
        <h3>Region:&nbsp;</h3>
        <p>
          {{ country.region }}
        </p>
      </div>
      <div>
        <h3>Capital:&nbsp;</h3>
        <p v-for="capital in country.capital" :key="capital">
          <span>
            {{ capital }}
          </span>
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  country: Object
})

</script>

<style lang="sass">
.card
  border-radius: var(--radius)
  box-shadow: var(--shadow)
  overflow: hidden
  background: var(--elements)
  img
    width: 100%
    height: 12rem
    object-fit: cover
  .card-text
    padding: 2rem
    h2
      padding-bottom: 2rem
      max-width: 50ch
      font-size: 1.5rem

    p, h3
      display: inline-block
      padding-bottom: 1rem
</style>