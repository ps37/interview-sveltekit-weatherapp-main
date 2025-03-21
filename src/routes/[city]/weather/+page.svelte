<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let weather = data.weather;
</script>

{#if weather}
	<h2>{weather.name}</h2>
	<p>Temperature: {weather.temp}°C</p>
	<p>{weather.description}</p>
{/if}
