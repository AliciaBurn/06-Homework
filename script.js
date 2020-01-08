$(document).ready(function () {
  var apiKey = "a3fcbb19c3da0b4a2f100792b8bc1161";
  var citySearched = [];



  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    var location = $("#city-search").val();
    currentCityConditions(location);

    getFiveDayForecast(location)
    .then(function(forecast) {
      appendFiveDayForecast(forecast);
  
  });

  function currentCityConditions(location) {

    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
      data: { units: "imperial" }
    }).then(function (response) {


      $(".city").html("<h2>" + response.name + " " + "(" + moment().format("L") + ")" + "</h2>");

      var iconImg = $("<img>");
      $(".icon").append(iconImg.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
      );

      $(".temp").text("Temp: " + response.main.temp + "F");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".wind-speed").text("Wind Speed: " + response.wind.speed + "mph");

      var lon = response.coord.lon;
      var lat = response.coord.lat;

      uvIndex(lat, lon);
    });
    function uvIndex(lat, lon) {
      var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        var uv = response.value;
        $(".uv-index").html("UV Index: " + '<span class="uv-index-number">' + uv + "</span>"
        );


        if (uv < 4) {
          $(".uv-index-number").css({
            "background-color": "lime",
            color: "white",
            padding: "3px"
          });
        } else if (uv >= 5 && uv <= 7) {
          $(".uv-index-number").css({
            "background-color": "yellow",
            color: "black",
            padding: "3px"
          });
        } else {
          $(".uv-index-number").css({
            "background-color": "red",
            color: "white",
            padding: "3px"
          });
        }
      });
    }
  }

  // five day
  function getFiveDayForecast(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&APPID=" +
      apiKey;
    return $.ajax({
      url: queryURL,
      method: "GET"
    });
  }
  // append ajax call 5 day
  function appendFiveDayForecast(forecast) {
      for (var i = 0; i < forecast.list.length; i += 8) {
        var date = forecast.list[i].dt_txt;
        var formatDate = moment(date).format("L");
        var temp = (forecast.list[i].main.temp_max - 273.15) * 1.8 + 32;
        var humidity = forecast.list[i].main.humidity;
        var icon = forecast.list[i].weather[0].icon;
        var fiveDayIconURL =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        var newCard = $(
          '<div class="card bg-light ml-0 mb-3 mr-3" style="min-width: 200px;">'
        ).html(
          '<div class="card-body">' +
            '<h5 class="card-title" id="date">' +
            formatDate +
            "</h5>" +
            '<img src="' +
            fiveDayIconURL +
            '"/>' +
            '<div class="card-text" id="temp-humidity">' +
            "Temperature: " +
            temp.toFixed(2) +
            "°F" +
            "<br>" +
            "Humidity: " +
            humidity +
            "%" +
            "</div>" +
            "</div>" +
            "</div>"
        );
        $("#5-day-forecast").append(newCard);
      }
  }
  function clear() {
    $(".icon-image").empty();
    $("#5-day-forecast").empty();
    $("#city-input").val("");
    $("#error-message").empty();
  }
})
});