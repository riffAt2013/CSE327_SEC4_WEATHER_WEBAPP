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
				
				
				//Converting Time
				var date = new Date();
				var monthN = date.getMonth();
				var dayN = date.getDay();
				var dateM = date.getDate();
				var hour = date.getHours();
				var minit = date.getMinutes();
				var year = date.getFullYear();
				var hours = twelvehrconvert(hour,minit);
				var month = (getmonth(monthN));
				var day = (getday(dayN));
				document.getElementById("time").innerHTML= day+" "+month+" "+dateM+" "+hours;
				document.getElementById("time2").innerHTML= hours+"<br>"+day+"<br>"+month+" "+dateM+"<br>"+year;
				

				let celsius=(temperature - 32)*(5/9);
								

				//Set DOM Elements from the API
				temperatureDegree.textContent = Math.floor(celsius); 
				locationTimezone.textContent = data.timezone;
				temperatureDescription.textContent = summary+".";

				temperatureDegree2.textContent = Math.floor(temperature); 
				temperatureDegree2c.textContent = Math.floor(celsius);
				locationTimezone2.textContent = data.timezone;
				temperatureDescription2.textContent = summary+".";
				
				//Icon 
				setIcons(icon, document.querySelector('.icon'));

				

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
	function twelvehrconvert(hour, minit){
		if(hour>12){
			hour = hour - 12;
			return hour+":"+minit+" am";
		}
		else{
			return hour+":"+minit+" pm";;
		}
	}
});
