window.addEventListener('load', ()=>{
	let long;
	let lat;
	let temperatureDescriptionHourly = document.querySelector('.temperature-hourly-description');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat= position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/bb6a00ed5b7005e1c10d05d9da831179/${lat},${long}?exclude=flags,alerts,daily,minutely`;
			

			fetch(api)
				.then(response => {
					return response.json();
			})
			.then (data => {
				console.log(data);
				const {summary, icon} = data.hourly;
				
				//Set DOM Elements from the API
				temperatureDescriptionHourly.textContent = summary;	
				//Icon 
				setIcon(icon, document.querySelector('.icon2'));

			});
		
		});
	}

	function setIcon(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon  = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
