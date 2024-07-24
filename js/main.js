let allDayes=[];
let homeWeather = document.getElementById('homeWeather');

function startApp(city="london") {
    getWeatherByLocation(city);
}
startApp();

async function getWeatherByLocation(city) {
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f1fcce3f952b4f46b05203923242207&q=${city}&days=3`);
    allDayes = await result.json();
    display();
}

function display() {
    let currentDate = new Date();
    let secDate = new Date(allDayes.forecast.forecastday[1].date);
    let thirdDate = new Date(allDayes.forecast.forecastday[2].date);
    let cartona=`
                        <div class="col-lg-4">
                        <div class="bottom-item">
                            <div class="item-header d-flex justify-content-between align-items-baseline p-1">
                                <h5>${currentDate.toLocaleDateString("en-US",{weekday:"long"})}</h5>
                                <div class="d-flex flex-wrap">
                                    <p>${currentDate.getDate()}</p>
                                    <p>${currentDate.toLocaleDateString("en-US",{month:"long"})}</p>
                                </div>
                            </div>
                            <div class="item-body">
                                <div class="p-4 pb-1">
                                    <h5>${allDayes.location.name}</h5>
                                    <p class="text-white my-size mb-0">${allDayes.current.temp_c}<sup>o</sup>C</p>
                                    <img src="https:${allDayes.current.condition.icon}" alt="">
                                    <p class="sec-main-color">${allDayes.current.condition.text}</p>
                                    <ul class="d-flex flex-wrap ps-0">
                                        <li class="pe-3">
                                            <img src="images/icon-umberella@2x.png" alt="">
                                            <span>${allDayes.current.humidity}%</span>
                                        </li>
                                        <li class="pe-3">
                                            <img src="images/icon-wind@2x.png" alt="">
                                            <span>${allDayes.current.wind_kph}km/h</span>
                                        </li>
                                        <li>
                                            <img src="images/icon-compass@2x.png" alt="">
                                            <span>${allDayes.current.wind_dir}</span>
                                        </li>
                                    </ul>    
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="col-lg-4">
                        <div class="bottom-item text-center">
                            <div class="p-1 mid-item-head">
                                <h5>${secDate.toLocaleDateString("en-US",{weekday:"long"})}</h5>
                            </div>
                            <div class="my-height third-main-color">
                                <div class="p-4">
                                    <img src="https:${allDayes.forecast.forecastday[1].day.condition.icon}" alt="" class="mb-3">
                                    <p class="text-white h2">${allDayes.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                                    <p>${allDayes.forecast.forecastday[1].day.mintemp_c}</p>
                                    <p class="sec-main-color">${allDayes.forecast.forecastday[1].day.condition.text}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="col-lg-4">
                        <div class="bottom-item text-center">
                            <div class="item-header p-1">
                                <h5>${thirdDate.toLocaleDateString("en-US",{weekday:"long"})}</h5>
                            </div>
                            <div class="item-body my-height">
                                <div class="p-4">
                                    <img src="https:${allDayes.forecast.forecastday[2].day.condition.icon}" alt="" class="mb-3">
                                    <p class="text-white h2">${allDayes.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                                    <p>${allDayes.forecast.forecastday[2].day.mintemp_c}</p>
                                    <p class="sec-main-color">${allDayes.forecast.forecastday[2].day.condition.text}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
`;
homeWeather.innerHTML = cartona;
}

async function search(e) {
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f1fcce3f952b4f46b05203923242207&q=${e}&days=3`);
    allDayes = await result.json();
    if (!allDayes.error) {
        display();
    }
}

// Step 1: Get user coordinates 
function getCoordintes() { 
	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		var coordinates = [lat, lng]; 
		// console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
		getCity(coordinates); 
		return; 
	} 

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error); 
} 
// Step 2: Get city name 
function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 

	// Paste your LocationIQ token below. 
	xhr.open('GET', " https://us1.locationiq.com/v1/reverse.php?key=pk.45521b53201c75c20b81f3db77310d66&lat=" + lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 

	function processRequest() { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			var response = JSON.parse(xhr.responseText); 
			var city = response.address.city; 
			// console.log(city); 
            getWeatherByLocation(city);
		} 
	} 
} 
getCoordintes(); 