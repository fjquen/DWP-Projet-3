class Sign {
    constructor(color, painting, started, width_brush, canvas, line) {
        // Variables :
        this.color = color;
        this.painting = painting;
        this.started = started;
        this.width_brush = width_brush;
        this.canvas = canvas;
        this.cursorX, this.cursorY;
        this.context = this.canvas[0].getContext('2d');
        // Trait arrondi :
        this.context.lineJoin = line;
        this.context.lineCap = line;
        this.mousedown();
        this.mouseup();
        this.mousemove();
        this.moveEnd();
        this.resetCanvas();
        this.checkCanvas();
        this.mobileCanvas();
    }
    
    mousedown() {
        // Click souris enfoncé sur le canvas, je dessine :
        $(this.canvas).mousedown(function (e) {
            this.painting = true;

            // Coordonnées de la souris :
            this.cursorX = (e.pageX - this.offsetLeft);
            this.cursorY = (e.pageY - this.offsetTop);
        }.bind(this));

    }

    mouseup() {
        // Relachement du Click sur tout le document, j'arrête de dessiner :
        $(this.canvas).mouseup(function () {
            this.painting = false;
            this.started = false;
        }.bind(this));
    }

    mousemove() {
        var canvas_Context = this;

        // Mouvement de la souris sur le canvas :
        $(this.canvas).mousemove(function (e) {
            // ici this ne représente plus la même chose

            // Si je suis en train de dessiner (click souris enfoncé) :
            if (canvas_Context.painting) {
                // Set Coordonnées de la souris :
                canvas_Context.cursorX = (e.pageX - this.offsetLeft) - 1; // 10 = décalage du curseur
                canvas_Context.cursorY = (e.pageY - this.offsetTop) - 1;
                canvas_Context.drawLine();
            }
        });
    }
    
    // Fonction qui dessine une ligne :
    drawLine() {
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            this.context.beginPath();
            this.context.moveTo(this.cursorX, this.cursorY);
            this.started = true;
        }
        // Sinon je dessine
        else {
            this.context.lineTo(this.cursorX, this.cursorY);
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.width_brush;
            this.context.stroke();
        }

    }
    
    //Efface la signature en appuyant sur le bouton Effacer :
    resetCanvas() {
        $("#reset").click(function (e) {
            // Clear canvas :
            this.clear_canvas();
            document.getElementById("reserver").style.display = "none";

            e.preventDefault();

        }.bind(this));


    }

    // Clear du Canvas :
    clear_canvas() {
        this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
        this.cursorX = null;
        this.cursorY = null;
    }

    move(e, mobile, obj) {
        // Si je suis en train de dessiner (click souris enfoncé) :
        if (this.painting) {
            if (mobile) {
                // Event mobile :
                var ev = e.originalEvent;
                e.preventDefault();

                // Set Coordonnées du doigt :
                this.cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
                this.cursorY = (ev.pageY - obj.offsetTop);
                this.cursorX = (ev.targetTouches[0].pageX - obj.offsetLeft); // 10 = décalage du curseur
                this.cursorY = (ev.targetTouches[0].pageY - obj.offsetTop);
            } else {
                // Set Coordonnées de la souris :
                this.cursorX = (e.pageX - obj.offsetLeft); // 10 = décalage du curseur
                this.cursorY = (e.pageY - obj.offsetTop);
            }

            // Dessine une ligne :
            this.drawLine();
        }
    }
    
    // Fonction fin de mouvement :
    moveEnd() {

        this.painting = false;
        this.started = false;
    }
    
    //  Fonction début de mouvement :
    moveStart(e, mobile) {
        this.painting = true;

        // Coordonnées de la souris :
        if (mobile) {
            // Event mobile :
            var ev = e.originalEvent;
            e.preventDefault();

            // Set Coordonnées du doigt :
            this.cursorX = (ev.pageX - this.offsetLeft); // 10 = décalage du curseur
            this.cursorY = (ev.pageY - this.offsetTop);
        } else if (e) {
            // Set Coordonnées de la souris :
            this.cursorX = (e.pageX - this.offsetLeft);
            this.cursorY = (e.pageY - this.offsetTop);
        }
    }
    
    //  Fonction canvas pour écran tactile :
    mobileCanvas() {
        var canvas_Context = this;

        // Doigt enfoncé sur le canvas, je dessine :
        $("#sign").bind('touchstart', function (e) {
            canvas_Context.moveStart(e, true);
        });

        // Relachement du doigt sur tout le document, j'arrête de dessiner :
        $(canvas_Context).bind('touchend', function () {
            canvas_Context.moveEnd();
        });

        // Mouvement du doigt sur le canvas :
        $("#sign").bind('touchmove', function (e) {
            canvas_Context.move(e, true, this);
            if (canvas_Context.cursorX && canvas_Context.cursorY) {
                document.getElementById("reserver").style.display = "block";
            } else {
                document.getElementById("reserver").style.display = "none";
            }
        });
    }

    //Fonction qui vérifie si le canvas est signé :
    checkCanvas() {
        $("#sign").mousemove(function (e) {
            if (this.cursorX && this.cursorY) {
                document.getElementById("reserver").style.display = "block";
            } else {
                document.getElementById("reserver").style.display = "none";
            }

            e.preventDefault();

        }.bind(this));
    }

}