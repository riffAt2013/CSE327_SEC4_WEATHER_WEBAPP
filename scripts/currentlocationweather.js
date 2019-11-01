window.addEventListener('load', ()=>{
	let long;
    let lat;
    
    let dressName1 = document.querySelector(".b1");
    let dressImg1 = document.querySelector(".b1img");
    let dressName2 = document.querySelector(".b2");
    let dressImg2 = document.querySelector(".b2img");
    let dressName3 = document.querySelector(".b3");
    let dressImg3 = document.querySelector(".b3img");
    let dressName4 = document.querySelector(".b4");
    let dressImg4 = document.querySelector(".b4img");



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
			const api = `${proxy}https://api.darksky.net/forecast/bb6a00ed5b7005e1c10d05d9da831179/${lat},${long}?exclude=flags,alerts,daily,minutely`;
		
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
				var minutes = date.getMinutes();
				var year = date.getFullYear();
				var hours = formatAMPM(hour,minutes);
				var month = (getmonth(monthN));
				var day = (getday(dayN));
				document.getElementById("time").innerHTML= day+" "+month+" "+dateM+" "+hours;
				document.getElementById("time2").innerHTML= hours+"<br>"+day+"<br>"+month+" "+dateM+" "+year;
				

				let celsius=(temperature - 32)*(5/9);
				WeatherSuggestions(celsius,icon);				

				//Set DOM Elements from the API
				temperatureDegree.textContent = Math.floor(celsius); 
				locationTimezone.textContent = data.timezone;
				temperatureDescription.textContent = summary+".";

				temperatureDegree2.textContent = Math.floor(temperature); 
				temperatureDegree2c.textContent = Math.floor(celsius);
				locationTimezone2.textContent = data.timezone;
				
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
	function formatAMPM(hours, minutes) {
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
      }



    function WeatherSuggestions(temp,icon){
        if(icon.match(/clear-day/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/clear-night/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/rain/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/wind/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/fog/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/cloudy/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/partly-cloudy-day/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }
        if(icon.match(/partly-cloudy-night/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 15 && temp <= 20 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRTS","TROUSERS","SNEAKERS");
            }
        }

    }

    function giveSuggestions(acc,top,bottom,foot){
            dressName1.textContent = acc;
            dressImg1.src ="photos/clothes/"+acc+".png";
            dressName2.textContent = top;
            dressImg2.src ="photos/clothes/"+top+".png";
            dressName3.textContent = bottom;
            dressImg3.src ="photos/clothes/"+bottom+".png";
            dressName4.textContent = foot;
            dressImg4.src ="photos/clothes/"+foot+".png";
    }
});
