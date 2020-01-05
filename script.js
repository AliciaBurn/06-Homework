$(document).ready(function () {
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

  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    var location = $("#city-search").val();

    localStorage.setItem("City", location);

    // localStorage.getItem("city") 
    //     location.append("recent-search" + city);


    $(this).prev().attr("placeholder") == "City"
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
      }).then(function(response) {
        var uv = response.value;
        $(".uv-index").html(
          "UV Index: " + '<span class="uv-index-number">' + uv + "</span>"
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
  });
});

