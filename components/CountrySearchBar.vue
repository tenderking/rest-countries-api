<script lang="ts" setup>
const searchQuery = defineModel('searchQuery', { type: String })
</script>

<template>
  <div class="search-input">
    <label for="search" class="sr-only">Search for countries</label>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
        fill="#B2B2B2" />
    </svg>
    <input id="search" v-model.lazy="searchQuery" type="search" placeholder="search for a country">
  </div>
</template>

<style lang="sass">
.search-input
  padding: 0.5rem 0.25rem 0.5rem 1rem
  border-radius: var(--radius)
  box-shadow: var(--shadow)
  display: flex
  gap: 1rem
  align-items: center
  background-color: var(--elements)
  input
    border: none
    background-color: var(--elements)
    color: var(--input)
  .sr-only
    clip: rect(0 0 0 0)
    clip-path: inset(50%)
    height: 1px
    overflow: hidden
    position: absolute
    white-space: nowrap
    width: 1px
</style>
