<script lang="ts">
	import ErrorComponent from '$lib/components/ErrorComponent.svelte';
	import WeatherInfoComponent from '$lib/components/WeatherInfoComponent.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// react to changes in page props from page load
	$: ({ weather } = data);
</script>

<section class="weather-info">
	{#await weather}
		<p>Loading weather...</p>
	{:then weather}
		<WeatherInfoComponent weather={weather}></WeatherInfoComponent>
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
