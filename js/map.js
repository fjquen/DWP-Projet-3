//Class Map met en place les marker générer par leaflet et l'API JCDecaux  et la class station
class Map {

    constructor() {
        //Valeurs de base pour que la class Booking puisse recevoir les données de la class Map/Station
        this.currentStation = null;
        document.getElementById("validform").style.display = "none";

        //Tableau vide où on chargera les stations
        this.tabStation = new Array();
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=creteil&apiKey=e1db7a9253ec6a063e6426952b1e1da38b07ff0f", function (geo) {
            this.data = JSON.parse(geo);

            //boucle pour initialiser chaque station
            for (var i = 0; i < this.data.length; i++) {
                var station = new Station(this.data[i]);
                this.addOneStation(station);
                this.addMarker(station);
            };
        }.bind(this))
    }

    //fonction qui ajoute une station dans la boucle for
    addOneStation(station) {
        this.tabStation[station.id] = station;
    }

    //infos à afficher sur le formulaire quand on clique sur un marker 
    dataStation(station) {
        this.currentStation = station;
        document.querySelector(".name").innerHTML = station.name;
        document.querySelector(".adresse").innerHTML = station.address;
        document.querySelector(".place").innerHTML = "Vélo disponible : " + station.available_bikes;
        document.querySelector(".dispo").innerHTML = "Emplacement relais : " + station.bike_stands;
    }

    //Méthode qui ajoute des marker fournit par le constructeur
    addMarker(station) {

        if (station.available_bikes >= 10) {
            var greenIcon = L.icon({
                iconUrl: 'image/green.png',
                iconSize: [45, 50], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [26.5, 100], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            this.marker = L.marker(station.myLatlng, {
                icon: greenIcon
            }).bindPopup(station.id + " " + station.address + " " + station.name).addTo(map);
            this.marker.on("click", function (e) {
                this.dataStation(station);

                if (this.currentStation != null) {
                    document.getElementById("validform").style.display = "block";
                }

            }.bind(this));

        } else if (station.available_bikes >= 5 || station.available_bikes >= 3 || station.available_bikes >= 2 || station.available_bikes >= 1) {
            var orangeIcon = L.icon({
                iconUrl: 'image/orange.png',
                iconSize: [35, 30], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            this.marker = L.marker(station.myLatlng, {
                icon: orangeIcon
            }).bindPopup(station.id + " " + station.address + " " + station.name).addTo(map);
            this.marker.on("click", function (e) {
                this.dataStation(station);

                if (this.currentStation != null) {
                    document.getElementById("validform").style.display = "block";

                }

            }.bind(this));

        } else if (station.available_bikes === 0) {
            var redIcon = L.icon({
                iconUrl: 'image/red.png',
                iconSize: [25, 30], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [16.5, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            this.marker = L.marker(station.myLatlng, {
                icon: redIcon
            }).bindPopup("il n'y a plus de vélo inutile de faire des réservations tant qu'un autre vélo n'est pas reposer à l'emplacement de cette réservation").addTo(map);
            this.marker.on("click", function (e) {
                this.dataStation(station);
                document.getElementById("validform").style.display = "none";

            }.bind(this));

        }

    }
}