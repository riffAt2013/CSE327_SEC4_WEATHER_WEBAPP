// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const notificationReload = document.querySelector(".reload");
const notificationBG = document.querySelector(".noti");
const notificationWrap = document.querySelector(".overlaywrapper2");
// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationReload.style.display = "block";
    notificationBG.style.display = "block";
    notificationWrap.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
function reloadOn(){
    location.reload();
}



