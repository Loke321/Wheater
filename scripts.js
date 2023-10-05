document.getElementById("locationForm").addEventListener("submit", function(event) {
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
            console.log(result);
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
            console.log(result);
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}