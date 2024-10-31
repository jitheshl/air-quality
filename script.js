document.getElementById('checkBtn').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const apiKey = 'd14b15d02446c45b642c97790f52562a'; 
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat={LAT}&lon={LON}&appid=${apiKey}`;

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                return fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            })
            .then(response => response.json())
            .then(data => {
                const aqi = data.list[0].main.aqi;
                let aqiText;

                switch (aqi) {
                    case 1: aqiText = 'Good'; break;
                    case 2: aqiText = 'Fair'; break;
                    case 3: aqiText = 'Moderate'; break;
                    case 4: aqiText = 'Poor'; break;
                    case 5: aqiText = 'Very Poor'; break;
                    default: aqiText = 'Unknown';
                }

                document.getElementById('result').innerText = `Air Quality Index: ${aqi} (${aqiText})`;
            })
            .catch(err => {
                document.getElementById('result').innerText = 'Error fetching data. Please try again.';
            });
    } else {
        document.getElementById('result').innerText = 'Please enter a city name.';
    }
});
