async function fetchWeather() {
    const apiKey = "CWA-33702966-9558-41D4-BEF3-A140862FEDDD";
    const locationName = document.getElementById("city").value;
    const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}&locationName=${encodeURIComponent(locationName)}&elementName=&sort=time`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success !== "true") {
            throw new Error(`API Error: ${data.result.message}`);
        }
        displayWeather(data.records);
    } catch (error) {
        console.error("fetch 操作出現問題：", error);
    }
}

function displayWeather(records) {
    const location = records.location[0];
    if (!location || !location.weatherElement) {
        console.error("Invalid data format:", records);
        return;
    }
    const weatherElement = location.weatherElement;
  
    const wx = weatherElement.find(el => el.elementName === "Wx").time[0].parameter.parameterName;
    const minT = weatherElement.find(el => el.elementName === "MinT").time[0].parameter.parameterName;
    const maxT = weatherElement.find(el => el.elementName === "MaxT").time[0].parameter.parameterName;
    const pop = weatherElement.find(el => el.elementName === "PoP").time[0].parameter.parameterName;

    const cityName = document.getElementById("city-name");
    const weatherDescription = document.getElementById("weather-description");
    const highTemp = document.getElementById("high-temp");
    const lowTemp= document.getElementById("low-temp");
    const rainProbility= document.getElementById("rain-probability");

    cityName.innerText = location.locationName;
    weatherDescription.innerText = `天氣: ${wx}`;
    highTemp.innerText = `最高溫: ${maxT} °C`;
    lowTemp.innerText = `最低溫: ${minT} °C`;
    rainProbility.innerText = `降雨機率: ${pop} %`;
}

document.addEventListener('DOMContentLoaded', fetchWeather);
