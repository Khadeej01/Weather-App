const key = 'ff9d21fa266991b3b46c0831476423e7';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';
const apiUrlDay = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&';

// The default city
const defaultCity = "Fes";

// Select search input and button by ID
const searchBox = document.querySelector("#searchInput");  
const searchBtn = document.getElementById("searchBtn");    
const wicon = document.querySelector("#w-icon"); 

// Get weather function
async function getWeather(query) {
    try {
        const response = await fetch(apiurl + query + `&appid=${key}`);
        const data = await response.json();

        // Check if the city exists
        if (data.cod === "404") {
            alert("City not found. Please enter a valid city name.");
            return; 
        }

        // Update the weather details
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
        alert("An error occurred while fetching the weather data. Please try again.");
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); 
    if (city) {
        getWeather(`q=${city}`); 
        getWeatherday(city); 
    } else {
        alert("Please enter a city name.");
    }
});


// Load weather for default city on page load
getWeather(`q=${defaultCity}`);

// Get weather for current location
function getWeatherForCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(`lat=${lat}&lon=${lon}`);
        }, error => {
            console.error("Error getting location:", error);
            getWeather(`q=${defaultCity}`);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        getWeather(`q=${defaultCity}`);
    }
}

// Load weather for current location on page load
getWeatherForCurrentLocation();

async function getWeatherday(city) {
    const response = await fetch(apiUrlDay + `q=${city}` + `&appid=${key}`);
    let data = await response.json();
    console.log(data);

    const days = [0, 8, 16, 24, 32]; // Indices for the next 5 days 

    days.forEach((dayIndex, i) => {
        document.getElementById(`jr${i + 1}`).innerHTML = new Date(data.list[dayIndex].dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        document.getElementById(`temperature${i + 1}`).innerHTML = data.list[dayIndex].main.temp + "°C";
        document.getElementById(`im${i + 1}`).src = `http://openweathermap.org/img/wn/${data.list[dayIndex].weather[0].icon}@2x.png`;
    });
}

// Call getWeatherday function when a city is searched
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        getWeather(`q=${city}`);
        getWeatherday(city); 
    } else {
        alert("Please enter a city name.");
    }
});

// Load weather for default city on page load
getWeather(`q=${defaultCity}`);
getWeatherday(defaultCity); 