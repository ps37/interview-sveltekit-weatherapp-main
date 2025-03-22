<script lang="ts">
	export let weather: any;
</script>

<h2>{weather.name}</h2>
<span>Temperature: {weather.temp}°C</span>
<span>{weather.description}</span>
