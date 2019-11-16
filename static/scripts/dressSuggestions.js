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


    var descriptionsMale = [
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
      
      var descriptionsFemale = [
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
                giveSuggestions("SUNGLASS","SHIRT","TROUSER","SNEAKER");
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
            dressImgAccessories.src ="static/photos/clothes/"+acc+".png";
            for(var i = 0 ;i<descriptionsMale.length;i++){
                acc = acc.toLowerCase();                    
                if(descriptionsMale[i].includes(acc)){
                    dressDescriptionAccessories.textContent = descriptionsMale[i];
                }
            }
            dressNameTop.textContent = top;
            dressNameTop2.textContent = top;
            dressImgTop.src ="static/photos/clothes/"+top+".png";
            for(var i = 0 ;i<descriptionsMale.length;i++){
                top = top.toLowerCase();                    
                if(descriptionsMale[i].includes(top)){
                    dressDescriptionTop.textContent = descriptionsMale[i];
                }
            }
            dressNameBottom.textContent = bottom;
            dressNameBottom2.textContent = bottom;
            dressImgBottom.src ="static/photos/clothes/"+bottom+".png";
            for(var i = 0 ;i<descriptionsMale.length;i++){
                bottom = bottom.toLowerCase();                    
                if(descriptionsMale[i].includes(bottom)){
                    dressDescriptionBottom.textContent = descriptionsMale[i];
                }
            }
            dressNameFootwear.textContent = foot;
            dressNameFootwear2.textContent = foot;
            dressImgFootwear.src ="static/photos/clothes/"+foot+".png";
            for(var i = 0 ;i<descriptionsMale.length;i++){
                foot = foot.toLowerCase();                    
                if(descriptionsMale[i].includes(foot)){
                    dressDescriptionFootwear.textContent = descriptionsMale[i];
                }
            }
        }
