window.addEventListener('load', ()=>{
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	let temperatureDescription2 = document.querySelector('.temperature-description2');
	let temperatureDegree2 = document.querySelector('.temperature-degree2');
	let locationTimezone2 = document.querySelector('.location-timezone2');
	let temperatureSection2 = document.querySelector('.temperature2');
	const temperatureSpan2 = document.querySelector('.temperature2 span');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat= position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/bb6a00ed5b7005e1c10d05d9da831179/${lat},${long}`;
		
			fetch(api)
				.then(response => {
					return response.json();
			})
			.then (data => {
				console.log(data);
				const {temperature, summary, icon} = data.currently;
				
				//Set DOM Elements from the API
				temperatureDegree.textContent = Math.floor(temperature); 
				locationTimezone.textContent = data.timezone;
				temperatureDescription.textContent = summary+".";

				temperatureDegree2.textContent = Math.floor(temperature); 
				locationTimezone2.textContent = data.timezone;
				temperatureDescription2.textContent = summary+".";
				
				//Icon 
				setIcons(icon, document.querySelector('.icon'));

				
				
				let celsius=(temperature - 32)*(5/9);

				//Converting F to C
				temperatureSection.addEventListener('click', () =>{
					if(temperatureSpan.textContent === "°F"){
						temperatureSpan.textContent = "°C";
						temperatureDegree.textContent= Math.floor(celsius);
					}else{
						temperatureSpan.textContent = "°F";
						temperatureDegree.textContent = Math.floor(temperature);
					}
				})
				temperatureSection2.addEventListener('click', () =>{
					if(temperatureSpan2.textContent === "°F"){
						temperatureSpan2.textContent = "°C";
						temperatureDegree2.textContent= Math.floor(celsius);
					}else{
						temperatureSpan2.textContent = "°F";
						temperatureDegree2.textContent = Math.floor(temperature);
					}
				})
			});
		
		});
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon  = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
