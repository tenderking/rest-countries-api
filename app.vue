<script lang="ts" setup>
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap',
      crossorigin: '',
    },
  ],
  title: 'Rest Countries API',
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
