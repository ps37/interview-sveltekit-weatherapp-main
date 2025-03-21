<script lang="ts">
	import { goto } from '$app/navigation';

	let city = '';

	function formatCityNameForRoute(city: string) {
		return city.trim().toLowerCase().replace(/\s+/g, '-');
	}

	function fetchWeather() {
		if (!city) return;
		const formattedCity = formatCityNameForRoute(city);
		goto(`/${formattedCity}/weather`, { invalidateAll: true, replaceState: true });
	}
</script>

<form on:submit|preventDefault={fetchWeather}>
	<input type="text" bind:value={city} placeholder="Enter a city" required />
	<button type="submit">Search</button>
</form>

<slot />
