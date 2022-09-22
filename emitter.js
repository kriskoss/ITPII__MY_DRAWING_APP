function Emitter(
    currentPreset,
    c,
    undoArray,
    undoData) {

    //Emitter propeties

    this.p_max_num = currentPreset.emitter.p_max_num



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


    let firstMarker = true

    //Emitter METHODS
    let p_remaining = this.p_max_num

    this.walks = {

        windX: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        windY: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },
    }

    let mousePos = {
        x: [],
        y: [],
    }
    this.updateParticles = function (
        undoCount,
        sliderValue,
        selectedColourData,) {
        // iterate through particles and draw to the screen
        if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame) {
            //STORING CURRENT AND PREVIOUS MOUSE POSITOIN            
            if (mousePos.x.length > 1) {
                mousePos.x.splice(0, 1)
                mousePos.y.splice(0, 1)
            }

            mousePos.x.push(mouseX)
            mousePos.y.push(mouseY)
            /////////

            //storing state of the canvas for UNDO functionality
            pixelsReadyToStore = true
            drawingInPreviousFrame = true;

            //DRAWING PARITICLES wich will remain on the canvas

            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].drawTrailParticle();
            }
            //storing canvas with smoke on it

            if (frameCount % currentPreset.emitter.smokeTrailFactor == 0) {
                loadPixels()
            }
            // let deadParticles = 0;

            ///generating random walk for wind change - it affects each particle in the same way
            let walkWindXrange = currentPreset.emitter.gustsXRange;
            let walkWindYrange = currentPreset.emitter.gustsYRange;
            let windXperiod = currentPreset.emitter.windXperiod;
            let windYperiod = currentPreset.emitter.windYperiod;
            this.walks.windX = interpolateRandom(this.walks.windX, windXperiod, walkWindXrange);
            this.walks.windY = interpolateRandom(this.walks.windY, windYperiod, walkWindYrange);



            //drawing paricles which do not stay at canvas and destroying OLD particles
            for (let i = this.particles.length - 1; i >= 0; i--) {

                this.particles[i].drawSmokeParticle();

                ///UPDATING INDIVIDUAL PARTIVLE
                this.particles[i].updateParticle(
                    sliderValue.x_wind,
                    sliderValue.y_wind,
                    sliderValue.gravity);

                // destroying particle if it reach its max age 
                if (this.particles[i].age > this.particles[i].lifetime) {
                    this.particles.splice(i, 1)
                    // deadParticles++;
                }
            }

            drawParticleSpreadBox(
                sliderValue.emitter_width,
                sliderValue.emitter_height)

            //ADDING PARTICLES

            for (let i = 0; i < sliderValue.p_per_frame; i++) {
                let p_initPos
                if (mousePos.x.length > 1) {
                    p_initPos = {
                        x: map(i, 0, sliderValue.p_per_frame, mousePos.x[0], mousePos.x[1]),
                        y: map(i, 0, sliderValue.p_per_frame, mousePos.y[0], mousePos.y[1]),
                    }
                }
                else {
                    p_initPos = {
                        x: mouseX,
                        y: mouseY
                    }
                }

                ///marks first particle or a particle which is being genereated at certain interval
                let sampleParticle = false
                if ((i == 0 && frameCount % (sliderValue.p_lifetime / 1) == 1) || firstMarker) {
                    sampleParticle = frameCount

                }

                firstMarker = false
                if (p_remaining > 0) {
                    p_remaining -= 1

                    this.particles.push(
                        this.addParticle(
                            currentPreset,
                            sliderValue,
                            p_initPos,
                            selectedColourData,
                            sampleParticle,
                            this.walks,

                        ));
                }

            }

            if (mouseReleasedInPreviousFrame) {
                //first particle is being used as a marker
                firstMarker = true
                // part required to store the canvas image for UNDO/REDO function
                p_remaining = this.p_max_num
                mouseReleasedInPreviousFrame = false;
                drawingInPreviousFrame = false;
                // loadPixels()

                undoCount = finish(undoCount, 'Smoke Tool')
                this.particles = []
                deadParticles = 0;
                //empties the mousePos arrays to be ready for next drawing                
                mousePos = {
                    x: [],
                    y: [],
                }
            }

        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;


        }

        return undoCount;

    }

    this.addParticle = function (
        currentPreset,
        sliderValue,
        p_initPos,
        selectedColourData,
        sampleParticle,
        transferWalks,
    ) {

        let p = new Particle(
            currentPreset,
            sliderValue,
            p_initPos,
            selectedColourData,
            sampleParticle,
            transferWalks,
        );

        return p;
    }


    let drawParticleSpreadBox = function (emitter_Width_SliderValue,
        emitter_Height_SliderValue) {
        //draws horizontal and vertical spread of particles BOX
        push()
        noFill()
        stroke(24)
        strokeWeight(1)
        rect(
            mouseX - emitter_Width_SliderValue,
            mouseY - emitter_Height_SliderValue,
            emitter_Width_SliderValue * 2,
            emitter_Height_SliderValue * 2
        )
        pop()

    }
    /////////
    let finish = function (undoCount, msg) { //uC
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg) //uC
        return undoCount //uC
    }
    // this.return_pixels = function () {
    //     return_pixels_function_Helper(sentData)
    //     console.log('retur pix somoke')
    // }

    this.unselectTool = function () {
        loadPixels()
        undoCount = finish(undoCount, 'Smoke Tool')
        select(".options").html("");

    }
}