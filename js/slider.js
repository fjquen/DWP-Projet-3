class Slider {
    //contructor qui construit les bases du slider 
    constructor(slides, next, previous, pause, playing, currentSlide) {
        this.slides = slides;
        this.slideInterval = setInterval(this.nextSlide.bind(this), 5000);
        this.next = next;
        this.previous = previous;
        this.pause = pause;
        this.iPause = document.querySelector('.fas fa-pause');
        this.playing = playing;
        this.currentSlide = currentSlide;
        this.addNextClick();
        this.subtractPreviousClick();
        this.stopClickSlide();
        this.pressButton();
    }

    //Avance la class slide vers la prochaine image  
    nextSlide() {
        this.goToSlide.bind(this)(this.currentSlide + 1);
    }
    
    //Recule la class slide vers la précedente image
    previousSlide() {
        this.goToSlide.bind(this)(this.currentSlide - 1);
    }
    
    //Organise l'ordre d'apparition des images
    goToSlide(n) {
        this.slides[this.currentSlide].className = 'slide';
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].className = 'slide showing';
    }
    
    //Définition des propriétés du bouton PAUSE
    pauseSlideshow() {
        this.pause.innerHTML = '<i class="fas fa-play"></i>';
        this.playing = false;
        clearInterval(this.slideInterval);
    }
    
    //Définition des propriétés du bouton PLAY
    playSlideshow() {
        this.pause.innerHTML = '<i class="fas fa-pause"></i>';
        this.playing = true;
        this.slideInterval = setInterval(this.nextSlide.bind(this), 5000);
    }
    
    //Propriété du click pour l'image suivante
    addNextClick() {
        $(this.next).click(function () {
            this.pauseSlideshow();
            this.nextSlide();
        }.bind(this));

        $(this.next).hover(function () {
            this.previous.style.color = "black";
            this.previous.style.backgroundColor = "#d9d9d9";
            this.next.style.backgroundColor = "#4CAF50";
            this.next.style.color = "white";

        }.bind(this), function () {
            this.next.style.color = "black";
            this.next.style.backgroundColor = "#d9d9d9";
        }.bind(this));
    }
    
    //Propriété du click pour l'image précedente
    subtractPreviousClick() {
        $(this.previous).click(function () {
            this.pauseSlideshow();
            this.previousSlide();

        }.bind(this));


        $(this.previous).hover(function () {
            this.next.style.color = "black";
            this.next.style.backgroundColor = "#d9d9d9";
            this.previous.style.backgroundColor = "#4CAF50";
            this.previous.style.color = "white";

        }.bind(this), function () {
            this.previous.style.color = "black";
            this.previous.style.backgroundColor = "#d9d9d9";
        }.bind(this));
    }
    
    //Propriété du click pour l'arret image 
    stopClickSlide() {
        $(this.pause).click(function () {
            if (this.playing) {

                this.pauseSlideshow();
            } else {

                this.playSlideshow();
                this.previous.style.color = "black";
                this.next.style.color = "black";
                this.previous.style.backgroundColor = "#d9d9d9";
                this.next.style.backgroundColor = "#d9d9d9";


            }
        }.bind(this));
    }
    
    //Propriété avant arrière des boutons claviers
    pressButton() {
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 37) {
                this.pauseSlideshow();
                this.previousSlide();
                this.previous.style.color = "white";
                this.previous.style.backgroundColor = "#4CAF50";
                this.next.style.background = "#d9d9d9";
                this.next.style.color = "black";
            } else if (e.keyCode === 39) {
                this.pauseSlideshow();
                this.nextSlide();
                this.previous.style.color = "black";
                this.next.style.backgroundColor = "#4CAF50";
                this.previous.style.background = "#d9d9d9";
                this.next.style.color = "white";
            }
        }.bind(this));
    }
}