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
				const {icon} = data.currently;
                
                partlycloudyday(icon);



            });

            
            var str = "partly-cloudy-day"; 
            
		});
    }
    function clearday(icon){
        var res;
        if(icon.match(/clear-day/gi)){
            res = 1;
        }
        if(res == 1){
            weather.style.display = 'block';
        }
    }
    function clearnight(icon){
        var res;
        if(icon.match(/clear-night/gi)){
            res = 1;
        }
        if(res == 1){
            weather.style.display = 'block';
        }
    }
    function partlycloudyday(icon){
        var res;
        if(icon.match(/partly-cloudy-day/gi)){
            res = 1;
        }
        if(res == 1){
            dressName1.textContent = "MITTENS";
            dressImg1.src ="photos/clothes/mitten.png";
            dressName2.textContent = "COAT";
            dressImg2.src ="photos/clothes/top.png";
            dressName3.textContent = "JEANS";
            dressImg3.src ="photos/clothes/bottom.png";
            dressName4.textContent = " BOOTS";
            dressImg4.src ="photos/clothes/boot.png";
        }
    }



});