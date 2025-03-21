/**
 * Fetches coordinates (latitude and longitude) for a given city.
 * @param city - The name of the city to get coordinates for.
 * @returns A promise resolving to an object containing latitude, longitude, and name of the city.
 */
export function getCoordinates(city: string) {
	return fetch(
	  `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
	)
	  .then((res) => {
		if (!res.ok) throw new Error('Failed to fetch coordinates');
		return res.json();
	  })
	  .then((geoData) => {
		const result = geoData.results?.[0];
		if (!result) throw new Error('City not found');
  
		const { latitude, longitude, name } = result;
		return { latitude, longitude, name };
	  });
  }
  
  /**
   * Fetches the current weather data for a given set of coordinates.
   * @param latitude - The latitude of the location.
   * @param longitude - The longitude of the location.
   * @returns A promise resolving to an object containing the temperature and weather code.
   */
  export function getWeather(latitude: number, longitude: number) {
	return fetch(
	  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
	)
	  .then((res) => {
		if (!res.ok) throw new Error('Failed to fetch weather');
		return res.json();
	  })
	  .then((weatherData) => weatherData.current_weather);
  }
  
  /**
   * Maps the weather code from the API to a human-readable description.
   * @param weatherCode - The weather code from the API response.
   * @returns A string description of the weather.
   */
  export function getWeatherDescription(weatherCode: number): string {
	const descriptions: { [key: number]: string } = {
	  0: 'Clear sky',
	  1: 'Mainly clear',
	  2: 'Partly cloudy',
	  3: 'Overcast'
	};
  
	return descriptions[weatherCode] || 'Unknown weather';
  }