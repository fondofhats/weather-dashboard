/* eslint-disable no-undef */
var city = "Orlando";
var mainCard = $(".card-body");

function getData(city) {
    /* var weatherQueryApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bb777764badc46ea953835d44e32dc53"; */
    var weatherQueryApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=bb777764badc46ea953835d44e32dc53";
    fetch(weatherQueryApiUrl)
        .then(function(response) {
            /* console.log(response.json()); */
            return response.json();
        })
        .then(function(response){
            console.log(response);
            var date = moment().format(" MM/DD/YYYY");
            var wIcon = response.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + wIcon + ".png";
            var cityName = $("<h3>").html(city + date);
            mainCard.prepend(cityName);
            mainCard.append($("<img>").attr("src", iconUrl));
            /* var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32); */
            var temp = Math.ceil(response.main.temp);
            /* console.log(Math.ceil(temp)); */
            mainCard.append($("<p>").html("Temperature: " + temp + " &#8457"));
            var feelsLikeTemp = Math.ceil(response.main.feels_like);
            mainCard.append($("<p>").html("Feels Like: " + feelsLikeTemp));
            var humidity = response.main.humidity + "&#37;";
            mainCard.append($("<p>").html("Humidity: " + humidity));
            var windSpeed = response.wind.speed;
            mainCard.append($("<p>").html("Wind Speed: " + windSpeed + " MPH"));

            var lat = response.coord.lat;
            var lon = response.coord.lon;


        });
    
}

getData(city);