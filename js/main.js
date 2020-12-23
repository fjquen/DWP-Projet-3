//Clé de la carte, il génere la carte
var map = L.map('mapid', {
    center: [48.7900, 2.4667],
    zoom: 13
})
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieW9sb3NtbyIsImEiOiJja2oxYnRzangzMGFzMnJuNG8zZmhwbnV1In0.2DBXVAOzYTmrRXvw-X-Uig', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'https://api.jcdecaux.com/vls/v1/stations?contract=creteil&apiKey=e1db7a9253ec6a063e6426952b1e1da38b07ff0f'


}).addTo(map);

//Slider
var mySlider = new Slider(document.querySelectorAll('.slides .slide'), document.getElementById('next'), document.getElementById('previous'), document.getElementById('pause'), true, 0);

//Canvas
var mySign = new Sign("#000", false, false, 1, $("#sign"), 'round');

//Carte
var myMap = new Map();

//Réservation
var myBooking = new Booking(document.getElementById("reserver"), document.getElementById("cancel"), document.querySelector(".result"), myMap);
