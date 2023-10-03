const apiKey = "37143ed999ec5025c1ad11ab27f2d24a";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".card__searchInput")
const searchBtn = document.querySelector(".card__searchButton")
const weathericon = document.querySelector(".card__weatherImg")


async function checkWeather(city) {
    // await "pauser" funktionen indtil dataene er fetchet. Vi fetcher fra URL'en sammensat af de to variabler.
    const response = await fetch(apiURL + city + `&appid=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".searchError").style.display = "block"
        document.querySelector(".card__weather").style.display = "none"
    } else {
        var data = await response.json();


        console.log(data)

        document.querySelector(".card__weatherCity").innerHTML = data.name;

        // Vælger class "card__weatherTemp" tilføjer ny værdi til det element(innerHTML), og bruger Math.round() til at afrunde værdien til nærmeste hele tal. I dette tilfælde temp fetchet fra vores API. 
        document.querySelector(".card__weatherTemp").innerHTML = Math.floor(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weathericon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "images/clear.png"
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "images/rain.png"
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "images/drizzle.png"
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "images/mist.png"
        } else if (data.weather[0].main == "Snow") {
            weathericon.src = "images/snow.png"
        }

        document.querySelector(".card__weather").style.display = "block"
        document.querySelector(".searchError").style.display = "none"
    }
}

// søge-knappen lytter efter "click", og ved click kør funktionen "checkWeather" ud fra værdien indtastet i søgefeltet.
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

checkWeather();
