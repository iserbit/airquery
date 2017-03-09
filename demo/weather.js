const page = () => {
  const body = $$('body');

  const pageContainer = body.find('div.page-container');
  const weatherContainer = pageContainer.find('div.weather-container');

  const title = pageContainer.find('h1');
  const nyc = pageContainer.find('h2.nyc-btn');
  const sf = pageContainer.find('h2.sf-btn');

  const weather = weatherContainer.find('h4.weather');
  const currentTemperature = weatherContainer.find('h4.current-temperature');
  const maxTemperature = weatherContainer.find('h4.max-temperature');
  const minTemperature = weatherContainer.find('h4.min-temperature');
  const humidity = weatherContainer.find('h4.humidity');

  const currentCity = 'nyc';

  pageContainer.addClass('center');

  title.html('Weather AJAX - AirQuery Demo')
       .addClass('heading');

  nyc.html('New York City')
     .addClass('city-heading')
     .on('click', () => fetchData('nyc'));

  sf.html('San Francisco')
    .addClass('city-heading')
    .on('click', () => fetchData('sf'));

  const fetchData = (city) => {
    const apiKey = 'f816d7f39052e3a98b21952097a43076';
    let lat = 40.745141;
    let lon = -73.994065;

    if (city === 'sf') {
      lat = 10.745141;
      lon = -13.994065;
    }

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

      if (city === 'nyc' ) {
        nyc.addClass('selected');
        sf.removeClass('selected');
      } else {
        nyc.removeClass('selected');
        sf.addClass('selected');
      }
    });
  }

  fetchData(currentCity);
}

$$(page);
