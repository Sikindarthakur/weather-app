const apiKey = "dbbb9d9584a02a3a6f9bcf6dfd36f68e";
const city = document.querySelector("input");
const searchBtn = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    }
    else if (weatherMain === "Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if (weatherMain === "Rain") {
        weatherIcon.src = "images/rain.png";
    }
    else if (weatherMain === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    else {
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
}

function handleSearch(){
    const cityName = city.value.trim();

    if(cityName !== ""){
        getWeather(cityName);
        city.value = "";
        city.focus();
    }
}

searchBtn.addEventListener("click", handleSearch);

city.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        handleSearch();
    }
});

city.addEventListener("input", () => {
    document.querySelector(".error").style.display = "none";
});

window.addEventListener("load", ()=>{
    getWeather("Delhi");
});