class Booking {
    constructor(save, clear, result, map) {
        this.save = save;
        this.clear = clear;
        this.result = result;
        this.map = map;
        this.videReservation = document.getElementById("vide_réservation");
        this.videInput = document.getElementById("videinput");
        this.boxBooking = document.querySelector(".boxbooking");
        this.videReservation.style.visibility = "hidden";
        this.boxBooking.style.visibility = "hidden";
        this.addAnnuleEvenement();
        this.stockSession();
        this.stockLocal();
        this.hideCanvas();
        this.showCanvas();
        this.timer = new Time(document.getElementById('timer'), this);
        if (window.sessionStorage["reservation"]) {
            this.videReservation.style.visibility = "visible";
            this.boxBooking.style.visibility = "visible";
            this.timer.start();
            document.querySelector(".result").innerHTML = window.sessionStorage["reservation"];
        }

    }
    // Gerer la partie sessionStorage 

    stockSession() {

        this.save.addEventListener("click", function (e) {
            this.result.innerHTML = document.getElementById("prenom").value + " " + document.getElementById("nom").value + " a réservé pour la station " + this.map.currentStation.name + " à cette adresse " + this.map.currentStation.address;;
            window.sessionStorage["prenom"] = document.getElementById("prenom").value;
            window.sessionStorage["nom"] = document.getElementById("nom").value;
            window.sessionStorage["idStation"] = this.map.currentStation.id;
            window.sessionStorage["reservation"] = document.getElementById("prenom").value + " " + document.getElementById("nom").value + " a réservé pour la station " + this.map.currentStation.name + " à cette adresse " + this.map.currentStation.address;
            this.videReservation.style.visibility = "visible";
            this.boxBooking.style.visibility = "visible";
            this.timer.annuler();
            this.timer.start();
            this.hideCanvas();

        }.bind(this), true);
        // Manage clear event
        this.videReservation.addEventListener("click", function (e) {
            this.annuleReservation();

        }.bind(this), true);

    }

    //Gerer la partie localStorage
    stockLocal() {
        document.getElementById("prenom").value = localStorage.getItem("prenom");
        document.getElementById("nom").value = localStorage.getItem("nom")
        this.save.addEventListener("click", function (e) {
            localStorage.setItem("prenom", document.getElementById("prenom").value)
            localStorage.setItem("nom", document.getElementById("nom").value)
        }.bind(this), false);



        // Attache une fonction à l'évènement "click" du bouton "Effacer" pour effacer le contenu, la sauvegarde et les inputs.
        this.videInput.addEventListener("click", function () {
            document.getElementById("nom").value = "";
            document.getElementById("prenom").value = "";
            localStorage.removeItem("prenom");
            localStorage.removeItem("nom");
        }.bind(this), false);
    }

    //Annule l'evenement du timer et la sessionstorage au click
    addAnnuleEvenement() {
        this.videReservation.addEventListener("click", function () {
            this.annuleReservation();
            this.timer.finish();
        }.bind(this), false);

    }

    //Efface la réservation
    annuleReservation() {
        window.sessionStorage["prenom"] = "";
        window.sessionStorage["nom"] = "";
        window.sessionStorage["idStation"] = "";
        window.sessionStorage["reservation"] = "";
        this.videReservation.style.visibility = "hidden";
        this.boxBooking.style.visibility = "hidden";
        document.querySelector(".result").innerHTML = "";
    }

    //Cache le canvas 
    hideCanvas() {
        document.getElementById("sign").style.display = 'none';
        document.getElementById("reserver").style.display = 'none';
        document.getElementById("reset").style.display = 'none';
    }

    //Montre le canvas au click
    showCanvas() {
        $("#validform").click(function (e) {
            document.getElementById("sign").style.display = 'block';
            document.getElementById("reserver").style.display = 'none';
            document.getElementById("reset").style.display = 'block';
            if ((document.getElementById("prenom").value === "") && (document.getElementById("nom").value === "")) {
                alert("Veuillez remplir le formulaire");
                this.hideCanvas();
            }


            e.preventDefault();

        }.bind(this))
    }
}