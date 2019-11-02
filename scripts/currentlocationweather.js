window.addEventListener('load', ()=>{
	let long;
    let lat;
    
    let dressNameAccessories = document.querySelector(".b1");
    let dressImgAccessories = document.querySelector(".b1img");
    let dressNameTop = document.querySelector(".b2");
    let dressImgTop = document.querySelector(".b2img");
    let dressNameBottom = document.querySelector(".b3");
    let dressImgBottom = document.querySelector(".b3img");
    let dressNameFootwear = document.querySelector(".b4");
    let dressImgFootwear = document.querySelector(".b4img");
    let dressNameAccessories2 = document.querySelector(".b12");
    let dressNameTop2 = document.querySelector(".b22");
    let dressNameBottom2 = document.querySelector(".b32");
    let dressNameFootwear2 = document.querySelector(".b42");
    let dressDescriptionAccessories = document.querySelector(".description1");
    let dressDescriptionTop = document.querySelector(".description2");
    let dressDescriptionBottom = document.querySelector(".description3");
    let dressDescriptionFootwear = document.querySelector(".description4");


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



      var descriptions = [
        "Its a clear sunny day. Weare a nice sunglass to ease your eyes.",
        "Its not that hot. A full sleeve shirt will do the job.",
        "A cotton made trouser will make you feel comfortable through the day.",
        "Fashionable sneaker will make you comfortable also look good.",
        "Too hot! A t-shirt is a must.",
        "A pair of slipper will let your feet breathe.",
        "Lots of clouds in the sky. Could be a rain shower happening soon. Don't forget your umbrella. Also you can wear a rain coat instead.",
        "Its raining cats & dogs. A raincoat is a must.",
        "Temperature can drop. A button shirt will keep you warm.",
        "In this rainy day there is no alternate of a pair of boot."
      ];






    function WeatherSuggestions(temp,icon){
        if(icon.match(/clear-day/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){
                
            }
            if(temp > 15 && temp <= 20 ){
                
            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("SUNGLASS","SHIRT","TROUSER","SNEAKER");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("SUNGLASS","T-SHIRT","TROUSER","SNEAKER");
            }
            if(temp > 30){
                giveSuggestions("SUNGLASS","T-SHIRT","TROUSER","SLIPPER");
            }
        }
        if(icon.match(/clear-night/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("BLANK","SHIRT","TROUSER","SNEAKER");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("BLANK","T-SHIRT","TROUSER","SNEAKER");
            }
            if(temp > 30){
                giveSuggestions("BLANK","T-SHIRT","TROUSER","SLIPPER");
            }
        }
        if(icon.match(/rain/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("RAINCOAT","BUTTON SHIRT","JEANS","BOOT");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("RAINCOAT","T-SHIRT","TROUSER","BOOT");
            }
            if(temp > 30){
                giveSuggestions("RAINCOAT","T-SHIRT","TROUSER","BOOT");
            }
        }
        if(icon.match(/wind/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){

            }
            if(temp > 25 && temp <= 30 ){

            }
            if(temp > 30){

            }
        }
        if(icon.match(/fog/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){

            }
            if(temp > 25 && temp <= 30 ){

            }
            if(temp > 30){

            }
        }
        if(icon.match(/cloudy/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){
                giveSuggestions("UMBRELLA","SHIRT","TROUSER","SNEAKER");
            }
            if(temp > 25 && temp <= 30 ){
                giveSuggestions("UMBRELLA","T-SHIRT","TROUSER","SNEAKER");
            }
            if(temp > 30){
                giveSuggestions("UMBRELLA","T-SHIRT","TROUSER","SLIPPER");
            }
        }
        if(icon.match(/partly-cloudy-day/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){

            }
            if(temp > 25 && temp <= 30 ){

            }
            if(temp > 30){

            }
        }
        if(icon.match(/partly-cloudy-night/gi)){
            if(temp <= 10){

            }
            if(temp > 10 && temp <= 15 ){

            }
            if(temp > 15 && temp <= 20 ){

            }
            if(temp > 20 && temp <= 25 ){

            }
            if(temp > 25 && temp <= 30 ){

            }
            if(temp > 30){

            }
        }

    }

    function giveSuggestions(acc,top,bottom,foot){
            dressNameAccessories.textContent = acc;
            dressNameAccessories2.textContent = acc;
            dressImgAccessories.src ="photos/clothes/"+acc+".png";
            for(var i = 0 ;i<descriptions.length;i++){
                acc = acc.toLowerCase();                    
                if(descriptions[i].includes(acc)){
                    dressDescriptionAccessories.textContent = descriptions[i];
                }
            }
            dressNameTop.textContent = top;
            dressNameTop2.textContent = top;
            dressImgTop.src ="photos/clothes/"+top+".png";
            for(var i = 0 ;i<descriptions.length;i++){
                top = top.toLowerCase();                    
                if(descriptions[i].includes(top)){
                    dressDescriptionTop.textContent = descriptions[i];
                }
            }
            dressNameBottom.textContent = bottom;
            dressNameBottom2.textContent = bottom;
            dressImgBottom.src ="photos/clothes/"+bottom+".png";
            for(var i = 0 ;i<descriptions.length;i++){
                bottom = bottom.toLowerCase();                    
                if(descriptions[i].includes(bottom)){
                    dressDescriptionBottom.textContent = descriptions[i];
                }
            }
            dressNameFootwear.textContent = foot;
            dressNameFootwear2.textContent = foot;
            dressImgFootwear.src ="photos/clothes/"+foot+".png";
            for(var i = 0 ;i<descriptions.length;i++){
                foot = foot.toLowerCase();                    
                if(descriptions[i].includes(foot)){
                    dressDescriptionFootwear.textContent = descriptions[i];
                }
            }
        }
});
