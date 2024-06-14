<script lang="ts" setup>
const isDark = useDark({
  selector: '#__nuxt',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <nav>
      <h1>Where in the world?</h1>
      <button @click.prevent="toggleDark()">
        <Icon v-if="isDark" name="ic:outline-nightlight" />
        <Icon v-else name="ic:sharp-nightlight" />
        <h2>Dark Mode</h2>
      </button>
    </nav>
  </header>
</template>

<style lang="sass">
nav
  display: flex
  justify-content: space-between
  padding: 1rem
  background: var(--elements)
  box-shadow: var(--shadow)
  h1
    font-size: 24px
    color: var(--color)
  button
    display: flex
    align-items: center
    background: 0
    border: none
    gap: 5px
    h2
      font-weight: 600
      font-size: 16px
      color: var(--color)

@media (min-width:650px)
  nav
    padding-inline: 2rem
</style>
