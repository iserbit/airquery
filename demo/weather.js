const page = () => {
  const body = $$('body');

  const pageContainer = body.find('div.page-container');
  const weatherContainer = pageContainer.find('div.weather-container');

  const title = pageContainer.find('h1');
  const city = pageContainer.find('h2');

  const weather = weatherContainer.find('h4.weather');
  const currentTemperature = weatherContainer.find('h4.current-temperature');
  const maxTemperature = weatherContainer.find('h4.max-temperature');
  const minTemperature = weatherContainer.find('h4.min-temperature');
  const humidity = weatherContainer.find('h4.humidity');

  const currentCity = 'New York City';

  pageContainer.addClass('center');
ss DOMNodes {
  title.html('Weather AJAX - AirQuery Demo')
       .addClass('heading');

  city.html(currentCity)
      .addClass('city-heading');

  const lat = 40.745141;
  const lon = -73.994065;
  const apiKey = 'f816d7f39052e3a98b21952097a43076';
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=imperial`;

  $$.ajax({
    method: 'get',
    url
  }).then((data) => {
    weather.html(`<b>Current Weather</b><br>${data.weather[0].main}`);
    currentTemperature.html(`<b>Current Temperature</b><br>${data.main.temp}<br>`);
    maxTemperature.html(`<b>Max Temperature</b><br>${data.main.temp_max}<br>`);
    minTemperature.html(`<b>Min Temperature</b><br>${data.main.temp_min}<br>`);
    humidity.html(`<b>Humidity</b><br>${data.main.humidity}%`);
  });
}

$$(page);
