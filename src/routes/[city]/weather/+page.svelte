<script lang="ts">
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// react to changes in page props from page load
	$: ({ weather } = data);
</script>

<section class="weather-info">
	{#await weather}
		<p>Loading weather...</p>
	{:then weather}
		<h2>{weather.name}</h2>
		<span>Temperature: {weather.temp}°C</span>
		<span>{weather.description}</span>
	{:catch error}
		<ErrorComponent error={error}></ErrorComponent>
	{/await}
</section>

<style>
	.weather-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
