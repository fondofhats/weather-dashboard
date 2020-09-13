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
            /* console.log(response); */
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

            /* Get UV Index from Weather API */
            var fullWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + 
            response.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=bb777764badc46ea953835d44e32dc53";
            return fetch(fullWeatherUrl)
                .then(function(fullResponse){
                    return fullResponse.json();
                })
                .then(function(fullResponse){
                    /* console.log(UvResponse); */
                    mainCard.append($("<p>").html("UV Index: <span>" + fullResponse.current.uvi + "</span>"));
                    /* Set UV Priority Warning */
                    if (fullResponse.current.uvi <= 2) {
                        $("span").attr("class", "btn btn-success");
                    } else if (fullResponse.current.uvi > 2 && fullResponse.current.uvi <= 5){
                        $("span").attr("class","btn btn-warning");
                    } else {
                        $("span").attr("class","btn btn-danger");
                    } 
                    
                    /* Get 5 Day Forecast From Weather API */
                    console.log(fullResponse.daily);
                    for(var i=1;i<6;i++) {
                        /* console.log(fivedayResponse.list[i]); */
                        var newCard = $("<div>").attr("class", "col fiveDay bg-primary text-white rounded-lg p-2");
                        $("#weeklyForecast").append(newCard);
                        /* console.log("UTC: " + moment.unix(fullResponse.daily[i].dt * 1000));
                        console.log("DATE: " + new Date(fullResponse.daily[i].dt * 1000)); */
                        var myDate = new Date(fullResponse.daily[i].dt * 1000).toLocaleDateString("en-US");
                        // displays date
                        newCard.append($("<h4>").html(myDate));
                        var iconCode = fullResponse.daily[i].weather[0].icon;
                        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        newCard.append($("<img>").attr("src", iconURL));
                        var temp = Math.ceil(fullResponse.daily[i].temp["day"]);
                        newCard.append($("<p>").html("Temp: " + temp + " &#8457"));
                        var humidity = fullResponse.daily[i].humidity;
                        newCard.append($("<p>").html("Humidity: " + humidity));                       
                    }
                });
            
        });
    
}

getData(city);