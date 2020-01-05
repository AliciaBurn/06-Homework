$(document).ready(function() {
    var apiKey = "a3fcbb19c3da0b4a2f100792b8bc1161";
     // Variable array that will store searched cities
    var citySearched = [];

    // init();
    // // Function that will get any saved cities from local storage
    // function init() {
    // // Parsing the JSON string to an object
    // var storedCities = JSON.parse(localStorage.getItem("cities"));
    // // If cities were retrieved from localStorage, update the searchedCity array to it
    // if (storedCities !== null) {
    //     citySearched = storedCities;
    // }
    // // Call the renderCities function
    // renderCities();
    // }
  
    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        var location = $("#city-search").val();

        localStorage.setItem("City" ,location);

        // localStorage.getItem("city") 
        //     location.append("recent-search" + city);


        $(this).prev().attr("placeholder") == "City" 
            var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + apiKey;

            $.ajax({
                url: queryURL,
                method: "GET",
                data: {units: "imperial"}
              }).then(function(response) {
            
       
                $(".city").html("<h2>" + response.name + " " + "(" + moment().format("L") + ")" + "</h2>");

                var iconImg = $("<img>");
                $(".icon").append(iconImg.attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
                );
                
                $(".temp").text("Temp: " + response.main.temp + "F");
                $(".humidity").text("Humidity: " + response.main.humidity + "%");
                $(".wind-speed").text("Wind Speed: " + response.wind.speed + "mph");
                // $(".uv-index").text("UV Index: " + response.) 
            
              });
            });
          });

        function fiveDay(city) {
          var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid="+ API_KEY;
  
          $.ajax ({
              url: queryURL,
              method: "GET",
          }).then(function(response){
             console.log(response);
             $("#future-forcast").empty();
             var counter = 1;
 
             for(var i = 3; i < response.list.length; i+=8) {
                  
                 var card = $("<div>");
                 card.addClass("forecastCard");
 
                 var date = $("<p>");
                 date.text(moment(moment(response.list[i].dt_txt).add(counter, 'days')).format('L'));
                 date.appendTo(card);
 
                 var symbol = $("<img>");
                 symbol.addClass("forecastIcons");
                 symbol.attr("src", "http://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png");
                 symbol.appendTo(card);
 
                 var kelvin = response.list[i].main.temp_max;
                 var fahrenheit = (kelvin - 273.15) * (9/5) + 32;
                 var temperature = $("<p>");
                 temperature.text("Temperature: " + fahrenheit.toFixed(1) + "°F");
                 temperature.appendTo(card);
 
                 var humidity = $("<p>");
                 humidity.text("Humidity: " + response.list[i].main.humidity);
                 humidity.appendTo(card);
 
 
                 $("#fiveDayBox").append(card);
             }