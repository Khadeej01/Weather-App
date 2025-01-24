const key = 'ff9d21fa266991b3b46c0831476423e7';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// The default city
const defaultCity = "Fes";

// Select search input and button by ID
const searchBox = document.querySelector("#searchInput");  
const searchBtn = document.getElementById("searchBtn");    
const wicon = document.querySelector("#w-icon"); 


// Get weather function
async function getWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${key}`);
        const data = await response.json();
        document.getElementById('degP').innerHTML = Math.round(data.main.temp) + '°C';
        document.getElementById('ville').innerHTML = data.name;
        document.getElementById('Hum').innerHTML = data.main.humidity + ' %';
        document.getElementById('wd').innerHTML = data.wind.speed + ' km/h';
      

        // Determine which weather icon to show
        const weather = data.weather[0].main;
        if (weather === "Clouds") {
            wicon.src = "Pictures/amcharts_weather_icons_1.0.0/animated/cloudy-night-1.svg";
        } else if (weather === "Clear") {
            wicon.src = "Pictures/amcharts_weather_icons_1.0.0/animated/weather_sunset.svg";
        } else if (weather === "Rain") {
            wicon.src = "Pictures/amcharts_weather_icons_1.0.0/animated/rainy-4.svg";
        } else if (weather === "Drizzle") {
            wicon.src = "images/drizzle.png";
        } else if (weather === "Mist") {
            wicon.src = "images/mist.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); 
    if (city) {
        getWeather(city); 
    } else {
        alert("Please enter a city name.");
    }
});




// Load weather for default city on page load
getWeather(defaultCity);

