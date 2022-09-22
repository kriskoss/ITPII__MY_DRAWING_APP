function Emitter(x_randm, y_randm, xSpeed, ySpeed, size, colour, lifetime, c, undoArray, undoData) {
    //Emitter propeties
    this.x_randm = x_randm;
    this.y_randm = y_randm;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.colour = colour;
    this.lifetime = lifetime
    this.num_of_partic = 5

    this.startParticles = 0;
    // this.lifetime = 20;

    //place to store particles
    this.particles = [];
    let deadParticles = 0


    ///UNDO/REDO functionality
    let pixelsReadyToStore = false;
    let sentData = false;
    let self = this;

    let mouseReleasedInPreviousFrame = false;
    let drawingInPreviousFrame = false;


    let finish = function (undoCount, msg) { //uC
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg) //uC
        return undoCount //uC
    }
    this.return_pixels = function () {
        return_pixels_function_Helper(sentData)
        console.log('retur pix somoke')
    }

    this.unselectTool = function () {
        loadPixels()
        select(".options").html("");

    }

    //Emitter METHODS
    this.addParticle = function () {
        let p = new Particle(

            random(-this.x_randm, this.x_randm),
            random(-this.y_randm, this.y_randm),
            random(this.xSpeed - 4, this.xSpeed + 4),
            (this.ySpeed + random(this.ySpeed * 0.5, this.ySpeed * 0.5)),
            random(this.size - 4, this.size + 4),
            this.colour,
            // this.lifetime = lifetime
            random(20, this.lifetime + 20)
        );

        return p;
    }

    this.updateParticles = function (undoCount) {
        // iterate through particles and draw to the screen

        if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame || deadParticles > 0) {

            //storing state of the canvas for UNDO functionality
            pixelsReadyToStore = true
            drawingInPreviousFrame = true;

            //DRAWING PARITICLES wich will remain on the canvas

            for (let i = this.particles.length - 1; i >= 0; i--) {
                if (i % 2 == 0) {
                    this.particles[i].drawDrawingParticle(this.particles[i].age);
                }
            }
            //storing canvas with smoke on it
            loadPixels()


            // let deadParticles = 0;
            //drawing paricles which do not stay at canvas and destroying OLD particles
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].drawPaticle(this.particles[i].age);
                this.particles[i].updatePaticle();

                // destroying particle if it reach its max age 
                if (this.particles[i].age > this.particles[i].lifetime) {
                    this.particles.splice(i, 1)
                    deadParticles++;
                }
            }
            drawParticleSpreadBox()


            for (let i = 0; i < this.num_of_partic; i++) {
                this.particles.push(this.addParticle());
            }
            if (mouseReleasedInPreviousFrame) {
                // part required to store the canvas image for UNDO/REDO function
                mouseReleasedInPreviousFrame = false;
                drawingInPreviousFrame = false;
                loadPixels()
                console.log('smoke finished 1')
                undoCount = finish(undoCount, 'Smoke Tool')
            }
            // if (deadParticles >= 0 && ((mousePressOnCanvas(c) && mouseIsPressed))) {     


        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            console.log('smoke finished 2')
            mouseReleasedInPreviousFrame = true;
        }


        return undoCount;

    }
    let drawParticleSpreadBox = function () {
        //draws horizontal and vertical spread of particles BOX
        push()
        noFill()
        stroke(24)
        strokeWeight(1)
        rect(mouseX - x_randm, mouseY - y_randm, x_randm * 2, y_randm * 2)
        pop()
    }
}