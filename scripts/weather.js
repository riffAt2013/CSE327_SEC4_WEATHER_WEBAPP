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
	let temperatureDegree2c = document.querySelector('.temperature-degree2c');
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
				
				locationTimezone.textContent = data.timezone;
				temperatureDescription.textContent = summary+".";

				temperatureDegree2.textContent = Math.floor(temperature); 
				locationTimezone2.textContent = data.timezone;
				
				//Icon 
				setIcons(icon, document.querySelector('.icon'));
				
				
				//Converting Time
				var date = new Date();
				var monthN = date.getMonth();
				var dayN = date.getDay();
				var dateM = date.getDate();
				var hour = date.getHours();
				var minutes = date.getMinutes();
				var year = date.getFullYear();
				var hours = formatAMPM(hour,minutes);
				var month = (getmonth(monthN));
				var day = (getday(dayN));
				document.getElementById("time").innerHTML= day+" "+hours;
				document.getElementById("time2").innerHTML= day+" "+month+" "+dateM+" "+hours+"<br>"+year;
				
				
				let celsius=(temperature - 32)*(5/9);
				temperatureDegree2c.textContent = Math.floor(celsius)
				temperatureDegree.textContent = Math.floor(celsius); 

				//Converting F to C
				temperatureSection.addEventListener('click', () =>{
					if(temperatureSpan.textContent === "°C"){
						temperatureSpan.textContent = "°F";
						temperatureDegree.textContent= Math.floor(temperature);
					}else{
						temperatureSpan.textContent = "°C";
						temperatureDegree.textContent = Math.floor(celsius);
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
	function getmonth(monthN){
		var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		return monthNames[monthN];
	}
	function getday(dayN){
		var daynames = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
		return daynames[dayN];
	}
	function formatAMPM(hours, minutes) {
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	  }
});
