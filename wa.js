const key = 'ff9d21fa266991b3b46c0831476423e7';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiUrlDay = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';

// The default city
const defaultCity = "Fes";

// Select search input and button by ID
const searchBox = document.querySelector("#searchInput");  
const searchBtn = document.getElementById("searchBtn");    
const wicon = document.querySelector("#w-icon"); 


// Get weather function
async function getWeather(city) {
    try {
        const response = await fetch(apiurl + "fes" + `&appid=${key}`);
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


async function getWeatherday(city) {
    const response = await fetch(apiUrlDay + city + `&appid=${apiKey}` );
    let data=await response.json();
    console.log(data);
    document.getElementById("jr1").innerHTML=new Date(data.list[0].dt_txt).toLocaleDateString("en-US",{weekday: "long"});
    document.getElementById("temperature1").innerHTML=data.list[0].main.temp  + "°C";
    document.getElementById("im1").src= `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

    document.getElementById("jr2").innerHTML=new Date(data.list[8].dt_txt).toLocaleDateString("en-US",{weekday: "long"});    
    document.getElementById("temperature2").innerHTML=data.list[8].main.temp  + "°C";
    
    document.getElementById("im2").src= `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;

    document.getElementById("jr3").innerHTML=new Date(data.list[16].dt_txt).toLocaleDateString("en-US",{weekday: "long"});    
    document.getElementById("temperature3").innerHTML=data.list[16].main.temp  + "°C";
   
    document.getElementById("im3").src= `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;

    document.getElementById("jr4").innerHTML=new Date(data.list[24].dt_txt).toLocaleDateString("en-US",{weekday: "long"});    
    document.getElementById("temperature4").innerHTML=data.list[24].main.temp  + "°C";
    
    document.getElementById("im4").src= `http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`;

    document.getElementById("jr5").innerHTML=new Date(data.list[32].dt_txt).toLocaleDateString("en-US",{weekday: "long"});    
    document.getElementById("temperature5").innerHTML=data.list[32].main.temp  + "°C";

    document.getElementById("im5").src= `http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`;

    console.log(data);
}