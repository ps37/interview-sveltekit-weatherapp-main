import { getCoordinates, getWeather, getWeatherDescription } from '$lib/server/weatherUtils';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * Handles incoming GET requests to fetch weather information based on a city name.
 */
export const GET: RequestHandler = async ({ url }) => {
	const city = url.searchParams.get('city');
	if (!city) return new Response('City is required', { status: 400 });

	try {
		// you can ignore the helper functions in weatherUtils
		const { latitude, longitude, name } = await getCoordinates(city);
		const { temperature, weathercode } = await getWeather(latitude, longitude);
		const description = getWeatherDescription(weathercode);
        // simulate longer load times to make it easier to tell when response streaming is working
        await new Promise((resolve) => setTimeout(resolve, 2000));
		return new Response(
			JSON.stringify({
				name,
				temp: temperature,
				description
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return new Response((error as Error).message, { status: 500 });
	}
};
