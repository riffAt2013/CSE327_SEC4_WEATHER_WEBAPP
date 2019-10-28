window.addEventListener('load', ()=>{
	let long;
	let lat;
    let temperatureDescriptionHourly = document.querySelector('.temperature-hourly-description');
    // SELECT ELEMENTS
    const tempElement = document.querySelector(".temperature-value");
    const descElement = document.querySelector(".temperature-description");
    const locationElement = document.querySelector(".location");

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
                const { summary, icon} = data.hourly;
                const { temperature} = data.currently;
				
                //Set DOM Elements from the API
                locationElement.textContent = data.timezone;
                descElement.textContent = summary;	
                tempElement.textContent = temperature;
				//Icon 
				setIcon(icon, document.querySelector('.icon2'));

			});
		
		});
	}

	function setIcon(icon, iconID){
		const skycons = new skycons({color: "black"});
		const currentIcon  = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
