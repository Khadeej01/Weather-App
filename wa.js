const key='ff9d21fa266991b3b46c0831476423e7';
const apiurl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const ville="agadir";

async function getWeather() {
    const response = await fetch(apiurl+ ville + `&appid=${key}`) ;
    let data = await response.json();
document.getElementById('degP').innerHTML=Math.round(data.main.temp) + '  °C';
    document.getElementById('ville').innerHTML=data.name;
    document.getElementById('Hum').innerHTML=data.main.humidity  + ' %';
    document.getElementById('wd').innerHTML=data.wind.speed  + ' km/h';
    console.log(data);
    
}

getWeather();

