import type { PageServerLoad } from './$types';

function decodeCityNameFromRoute(city: string) {
	return city.replace(/-/g, ' ');
}

export const load: PageServerLoad = async ({ fetch, params }) => {
	const city = decodeCityNameFromRoute(params.city);

	// console.log('city route load: ', city);

	const weather = await fetch(`/api/weather?city=${encodeURIComponent(city)}`).then((res) => {
		if (!res.ok) throw new Error('Failed to load weather data');
		return res.json();
	});

	return {
		weather
	};
};
