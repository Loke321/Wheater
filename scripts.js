    document.getElementById("locationForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from actually submitting
    const city = document.getElementById("stad").value;
    const country = document.getElementById("land").value;
    const apiKey = "Ukh9o+8Cegkz/RZ4jFB+0A==gMt36iBZZcaT5jLA";
    const apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;
    fetch(apiUrl,{
        method: 'GET',
        headers:{
            'X-Api-Key':apiKey,
            'Content-Type': 'application/json'
        }
    })
        .then(repsone => {
            if(!repsone.ok){
                throw new Error("Network response didnt work");
            }
            return repsone.json();
        })
        .then(result => {
            var latitude = result[0].latitude;
            var longitude = result[0].longitude;
            getWeather(latitude, longitude);
        })
        .catch(error => {
            console.log("Error: ", error);
        });
});


function getWeather(latitude, longitude){
    const wheaterApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
    fetch(wheaterApiUrl,{
        method: 'GET',
    })
        .then(repsone => {
            if(!repsone.ok){
                throw new Error("Network response didnt work");
            }
            return repsone.json();
        })
        .then(result => {
            localStorage.setItem('weatherData', JSON.stringify(result));
            window.location.replace("daily.html");
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const weatherData = JSON.parse(localStorage.getItem('weatherData'));
    console.log(weatherData);

    const time = document.getElementById('time');
    time.textContent = weatherData.current_weather.time;

    const temp = document.getElementById('temperature');
    temp.textContent = weatherData.current_weather.temperature;

    const winddir = document.getElementById('winddir');
    winddir.textContent = weatherData.current_weather.winddirection;

    const windspd = document.getElementById('windspd');
    windspd.textContent = weatherData.current_weather.windspeed;
})


const myIcon = document.getElementById("myIcon");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");


myIcon.addEventListener("click", function() {

  if(searchBox.style.display == "none")
  {
    searchBox.style.display = "block";
    return;
  }
  if(searchBox.style.display == "block")
  {
    searchBox.style.display = "none";
    return;
  }
});




/*
document.addEventListener("click", function(event) {
    if (event.target !== myIcon && event.target !== searchInput) {
      searchBox.style.display = "none";
    }
  });
  
  
  searchBox.addEventListener("click", function(event) {
    event.stopPropagation();
  });
 */

