$(document).ready(function() {
    var apiKey = "a3fcbb19c3da0b4a2f100792b8bc1161";

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
                method: "GET"
              }).then(function(response) {
       
                $(".city").html("<h2>" + response.name + " " + "(" + moment().format("L") + ")" + "</h2>");
                $(".temp").text("Temp: " + response.main.temp + "F");
                $(".humidity").text("Humidity: " + response.main.humidity + "%");
                $(".wind-speed").text("Wind Speed: " + response.wind.speed + "mph");
            
              });
            });
        });
