<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let city = $page.params.city;

	function formatCityNameForRoute(city: string) {
		return city.trim().toLowerCase().replace(/\s+/g, '-');
	}

	function fetchWeather() {
		if (!city) return;
		const formattedCity = formatCityNameForRoute(city);
		goto(`/${formattedCity}/weather`, { invalidateAll: true, replaceState: true });
	}
</script>

<section class="weather-app">
	<form class="weather-form" on:submit|preventDefault={fetchWeather}>
		<input
			class="form-control"
			id="city-input"
			type="text"
			bind:value={city}
			placeholder="Enter a city"
			required
		/>
		<button class="btn btn-primary" type="submit">Search</button>
	</form>

	<slot />
</section>

<style>
	:global(body) {
		background-color: aliceblue;
	}

	.weather-app {
		display: flex;
		height: 50vh;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
	}

	.weather-form {
		margin-top: 9rem;
		display: flex;
	}

	#city-input {
		margin-right: 15px;
	}
</style>