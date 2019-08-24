class Time {
    constructor(time, booking) {
        this.time = time;
        this.booking = booking;
        this.counter = 1200 && window.sessionStorage["time"];
        this.subtractTime();
        this.finish();

    }

    //initialise le timer
    start() {
        this.intervalId = setInterval(this.subtractTime.bind(this), 1000);
    }

    //compte le temps jusqu'a 0
    subtractTime() {
        window.sessionStorage["time"] = this.counter--;
        if (this.counter == 0) {
            this.finish()
            document.getElementById("timer").innerHTML = "TERMINE!";
            this.booking.annuleReservation();
        } else {
            this.minutes = Math.floor(this.counter / 60);
            this.second = this.counter - this.minutes * 60;
            this.time.innerHTML = this.minutes + " minutes restantes " + this.second;
        }
    }
    
    //Une fois le compteur arrivé à 0
    finish() {
        clearInterval(this.intervalId);
        document.getElementById("timer").innerHTML = "";
    }
    
    //Maintient le counter à 20 min
    annuler() {
        clearInterval(this.intervalId);
        document.getElementById("timer").innerHTML = "";
        this.counter = 1200;
    }
}