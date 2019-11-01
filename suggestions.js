window.addEventListener('load', ()=>{
    let long;
    let lat;
    var icons;
    const weather = document.querySelector(".partly-cloudy-day");
    let dressName1 = document.querySelector(".b1");
    let dressImg1 = document.querySelector(".b1img");
    let dressName2 = document.querySelector(".b2");
    let dressImg2 = document.querySelector(".b2img");
    let dressName3 = document.querySelector(".b3");
    let dressImg3 = document.querySelector(".b3img");
    let dressName4 = document.querySelector(".b4");
    let dressImg4 = document.querySelector(".b4img");



    if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat= position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/bb6a00ed5b7005e1c10d05d9da831179/${lat},${long}?exclude=hourly,flags,alerts,daily,minutely`;
		
			fetch(api)
				.then(response => {
					return response.json();
			})
			.then (data => {
				console.log(data);
				const {temperature , icon} = data.currently;
                let celsius=(temperature - 32)*(5/9);
                WeatherSuggestions(celsius,icon);



            });

            
            var str = "partly-cloudy-day"; 
            
		});
    }
    function WeatherSuggestions(temp,icon){
        if(icon.match(/partly-cloudy-day/gi)){
            if(temp>26 && temp<30 ){
                giveSuggestions("BARE","T-SHIRTS","TROUSERS","SNEAKERS");
            }else{
                giveSuggestions("MITTENS","COATS","JEANS","BOOTS");
            }
        }
        if(icon.match(/partly-cloudy-night/gi)){
            if(temp>26 && temp<30 ){
                giveSuggestions("BARE","T-SHIRTS","TROUSERS","SNEAKERS");
            }else{
                giveSuggestions("MITTENS","COATS","JEANS","BOOTS");
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