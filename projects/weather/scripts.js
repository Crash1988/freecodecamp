var temperature = 0;
var unit = 'F';  
$(document).ready(function() { 
  navigator.geolocation.getCurrentPosition(function(location) {
    
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.coords.latitude + '&lon=' + location.coords.longitude+ "&units=imperial"+ '&appid=75c4a67cd1a1c2e50fd2ce24d6fda5d5';   

 
    $.get(weatherApiUrl, function(weather) {
		console.log(weather);
	  var wea = weather['weather'][0]['main'];
	  switch (wea){
		  case 'Clouds':{
			  $("#weathericon").html("<div class=\"icon cloudy\"> <div class=\"cloud\"></div> <div class=\"cloud\"></div></div>");
			  break;
		  }
		  case 'Clear':{
			  $("#weathericon").html("<div class=\"icon sunny\"><div class=\"sun\"><div class=\"rays\"></div></div></div>");
			  break;
		  }
		  case 'Thunderstorm':{
			  $("#weathericon").html("<div class=\"icon thunder-storm\"><div class=\"cloud\"></div> <div class=\"lightning\"> <div class=\"bolt\"></div><div class=\"bolt\"></div></div></div>");
			  break;
		  }
		  case 'Rain':{
			  $("#weathericon").html("<div class=\"icon rainy\"> <div class=\"cloud\"></div> <div class=\"rain\"></div></div>");
			  break;
		  }
		  case 'Snow':{
			  $("#weathericon").html("<div class=\"icon flurries\"> <div class=\"cloud\"></div><div class=\"snow\"><div class=\"flake\"></div><div class=\"flake\"></div></div></div>");
			  break;
		  }
		  default:{
			  $("#weathericon").html("<div class=\"icon sunny\"><div class=\"sun\"><div class=\"rays\"></div></div></div>");
			  break;
		  }
		  
	  }
	  getLocation();

		var dircode = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
		var index = Math.floor(weather.wind.deg / 45);
		var windDir=dircode[index];
		var tempLabel = "<A HREF=\"javascript:anchor_test()\" id=\"tempId\">F</a>";
      temperature = weather.main.temp;
      temperature = parseFloat((temperature).toFixed(1));


      $('#weatherTemp').append(temperature + "&deg; "+tempLabel);
      $('#weatherWind').append("Wind: "+windDir + " " + weather.wind.speed + " knots");

    }, "jsonp");
  });
}); 

  var getLocation = function(){
		$.get("http://ipinfo.io", function(location) {
		  $('#Location').append(location.city + ", ").append(location.region);
		  var asd = location.loc.split(',');
		  console.log(asd[0]);
		}, "jsonp");
		

	  };
  
  var anchor_test = function(){
	  if(unit == 'F'){
		temperature = (temperature-32)*100/180;
		temperature = parseFloat((temperature).toFixed(1));
		$("#weatherTemp").html(temperature+ "&deg; "+"<A HREF=\"javascript:anchor_test()\" id=\"tempId\">C</a>");
		unit = 'C';
	  }
	   else{
		temperature = parseFloat((temperature*180/100) + 32);
		temperature = parseFloat((temperature).toFixed(1));
		$("#weatherTemp").html(temperature+ "&deg; "+"<A HREF=\"javascript:anchor_test()\" id=\"tempId\">F</a>");
		unit = 'F';
	  }
	}