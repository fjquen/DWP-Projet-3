//Class Station qui contient les données dont a besoin pour remplir le tableau initialisé dans la class map par une boucle for
class Station {
    constructor(infostation) {
        this.id = infostation.number;
        this.name = infostation.name;
        this.status = infostation.status;
        this.available_bikes = infostation.available_bikes;
        this.bike_stands = infostation.bike_stands;
        this.address = infostation.address;
        this.myLatlng = new L.latLng(infostation.position.lat, infostation.position.lng);
        
    }

}