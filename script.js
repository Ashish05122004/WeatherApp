let weather_city = document.querySelector(".weather_city");
let weather_date_time = document.querySelector(".weather_date_time");
let weather_forecast = document.querySelector(".weather_forecast");
let weather_icon = document.querySelector(".weather_icon");
let weather_temperature = document.querySelector(".weather_temperature");
let weather_min = document.querySelector(".weather_min");
let weather_max = document.querySelector(".weather_max");
let weather_feelsLike = document.querySelector(".weather_feelsLike");
let weather_humidity = document.querySelector(".weather_humidity");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure = document.querySelector(".weather_pressure");

let search_form = document.querySelector(".search");

let cityName = "mumbai";
search_form.addEventListener("submit", (event) => {
    event.preventDefault();

    let city_input = document.querySelector(".city_input");

    cityName = city_input.value;
    getWaetherData();
    cityName.value = "";
})


//countryName---->
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}
//getting date and time
getDateTime = (dt) => {
    currDate = new Date(dt * 1000);//it will convert seconds to miliseconds

    Option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    dateFormating = new Intl.DateTimeFormat('en-US', Option).format(currDate);
    return dateFormating;
}

const getWaetherData = async () => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a96f6b0f7b5221313babedda171fefa8`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        const { main, wind, sys, name, weather, dt } = data;
        weather_city.innerHTML = `${name}, ${getCountryName(sys.country)}`;

        weather_date_time.innerHTML = getDateTime(dt);

        weather_forecast.innerHTML = `${weather[0].main}`;
        weather_icon.innerHTML = `<img src = https://openweathermap.org/img/wn/${weather[0].icon}@2x.png>`;

        weather_temperature.innerHTML = `${main.temp.toFixed(2)}&deg`;
        weather_min.innerHTML = `min:${main.temp_min.toFixed(2)}&deg`;
        weather_max.innerHTML = `max:${main.temp_max.toFixed(2)}&deg`;

        weather_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&deg`;
        weather_humidity.innerHTML = `${main.humidity.toFixed()}%`;
        weather_wind.innerHTML = `${wind.speed.toFixed(1)} m/s`;
        weather_pressure.innerHTML = `${main.pressure.toFixed()} hPa`;


    } catch (error) {
        console.log(error);
    }
}
document.body.addEventListener("load", getWaetherData());
