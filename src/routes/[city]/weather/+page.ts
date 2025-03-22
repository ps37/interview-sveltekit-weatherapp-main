import type { PageLoad } from './$types';

function decodeCityNameFromRoute(city: string) {
	return city.replace(/-/g, ' ');
}

export const load: PageLoad = ({ fetch, params }) => {
	const city = decodeCityNameFromRoute(params.city);

	const weather = fetch(`/api/weather?city=${encodeURIComponent(city)}`).then((res) => {
		if (!res.ok) throw new Error('Failed to load weather data');
		return res.json();
	});

	return {
		weather
	};
};
