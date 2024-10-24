/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 


document.getElementById('city').addEventListener('input', function () {
  var city = this.value;
  getWeather(city);
});

async function getWeather() {
  try {
      var city = document.getElementById('city').value;
      console.log('Şəhər adı:', city);

      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
              q: city,
              appid: '54a57bc234ad752a4f59e59cd372201d',
              units: 'metric'
          },
      });
      const currentTemperature = response.data.list[0].main.temp;

      document.querySelector('.weather-temp').textContent = Math.round(currentTemperature) + 'ºC';

      const forecastData = response.data.list;

      const dailyForecast = {};
      forecastData.forEach((data) => {
          const day = new Date(data.dt * 1000).toLocaleDateString('en-BD', { weekday: 'long' });
          if (!dailyForecast[day]) {
              dailyForecast[day] = {
                  minTemp: data.main.temp_min,
                  maxTemp: data.main.temp_max,
                  description: data.weather[0].description,
                  humidity: data.main.humidity,
                  windSpeed: data.wind.speed,
                  icon: data.weather[0].icon,


              };
          } else {
              dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, data.main.temp_min);
              dailyForecast[day].maxTemp = Math.max(dailyForecast[day].maxTemp, data.main.temp_max);
          }
      });

      document.querySelector('.date-dayname').textContent = new Date().toLocaleDateString('en-BD', { weekday: 'long' });

      const date = new Date().toUTCString();
      const extractedDateTime = date.slice(5, 16);
      document.querySelector('.date-day').textContent = extractedDateTime.toLocaleString('en-BD');

      const currentWeatherIconCode = dailyForecast[new Date().toLocaleDateString('en-BD', { weekday: 'long' })].icon;
      const weatherIconElement = document.querySelector('.weather-icon');
      weatherIconElement.innerHTML = getWeatherIcon(currentWeatherIconCode);

      document.querySelector('.location').textContent = response.data.city.name;
      document.querySelector('.weather-desc').textContent = dailyForecast[new Date().toLocaleDateString('en-BD', { weekday: 'long' })].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      document.querySelector('.humidity .value').textContent = dailyForecast[new Date().toLocaleDateString('en-BD', { weekday: 'long' })].humidity + ' %';
      document.querySelector('.wind .value').textContent = dailyForecast[new Date().toLocaleDateString('en-BD', { weekday: 'long' })].windSpeed + ' m/s';

  } catch (error) {
      console.error('Məlumat alınarkən səhv baş verdi:', error.message);
  }
}

function getWeatherIcon(iconCode) {
  const iconBaseUrl = 'https://openweathermap.org/img/wn/';
  const iconSize = '@2x.png';
  return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}

document.addEventListener("DOMContentLoaded", function () {
  getWeather();
  setInterval(getWeather, 900000);
});
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
