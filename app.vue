<script setup>
useHead({
	link: [
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap",
			crossorigin: "",
		},
	],
	title: "Rest Countries API",
	htmlAttrs: {
		lang: "en"
	}
});

</script>
<template>
	<NavBar />
	<NuxtPage :page-key="$route.fullPath" />
</template>
<style>
* {
	border-block: box;
	margin: 0;
}

:root {
	--lm-bg: hsl(0, 0%, 98%);
	--lm-color: hsl(200, 15%, 8%);
	--dm-bg: hsl(207, 26%, 17%);
	--dm-color: hsl(0, 0%, 100%);
	--lm-elements: hsl(0, 0%, 100%);
	--dm-elements: hsl(209, 23%, 22%);
	--lm-input: hsl(0, 0%, 52%);
	--shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
		rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	--radius: 5px;
	--fill-color: hsl(200, 15%, 8%);
	--bg-color: var(--lm-bg);
	/* --color: var(--lm-color); */
	--elements: var(--lm-elements);
	--input: var(--lm-input);
}

.light {
	--bg-color: var(--lm-bg);
	--color: var(--lm-color);
	--elements: var(--lm-elements);
	--input: var(--lm-input);
	--fill-color: var(--lm-color);
	--input: var(--lm-input);
}

.dark {
	--bg-color: var(--dm-bg);
	--color: var(--dm-color);
	--elements: var(--dm-elements);
	--input: var(--dm-color);
	--fill-color: var(--dm-color);
}

html,
body {
	height: 100%;
}

#__nuxt {
	background-color: var(--bg-color);
	color: var(--color);

	font-family: "Nunito Sans", sans-serif;
	font-size: 14px;
	min-height: 100vh;
}
input,
button,
a {
	text-decoration: none;
	font: inherit;
	color: inherit
}
</style>
