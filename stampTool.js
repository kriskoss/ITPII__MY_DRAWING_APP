function StampTool(c, undoArray, undoData) {
    this.name = 'Stamp Tool';
    this.icon = 'assets/snowflake.png';

    this.loaded = false;

    this.preload = function () { // REFERNECE 4 based on Data Visualisation template 
        let self = this
        snowflake = loadImage(
            "assets/snowflake.png",
            function () {
                // console.log('snowflake data loaded')
                self.loaded = true
            },
            function () { 'failed to load' })
    }


    let snowflake
    let snowflakeSize;
    let snowflakeSizeSlider;
    let nSnowflakeSLider;
    let alphaSlider;

    this.populateOptions = function () {
        select(".options").html(

            '<div>\
            <input type="range" id="nSnowflakeControl"  min="1" max="20" value="2">\
            <label for="nSnowflakeControl"">Number of snowflakes</label>\
            </div>\
            \
            <div>\
            <input type="range" id="sizeOfSnowflakeControl" min="5" max="150" value="50">\
            <label for="sizeOfSnowflakeControl">Size of snowflake</label>\
            </div>\
            \
            <div>\
                <input type="range" id="snowflakeAlphaControl" min="1" max="255" value="80">\
                <label for="sizeOfSnowflakeControl">Snowflake transparency</label>\
            </div>'
        );//REFERENCE 5 based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range 

    }

    ///UNDO/REDO functionality
    let pixelsReadyToStore = false;
    let sentData = false;
    let self = this;

    let mouseReleasedInPreviousFrame = false;
    let drawingInPreviousFrame = false;


    let finish = function (undoCount, msg) {
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg)
        return undoCount;
    }
    // this.return_pixels = function () {
    //     return_pixels_function_Helper(sentData)
    // }

    this.return_pixels = function () {
        return_pixels_function_Helper(sentData)
        console.log('retur pix somoke')
    }

    this.unselectTool = function () {
        loadPixels()
        select(".options").html("");

    }

    this.draw = function (undoCount, sC) { //uC
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame) {
            pixelsReadyToStore = true
            drawingInPreviousFrame = true;

            let num_of_flakes = select('#nSnowflakeControl').value()
            let flake_alpha = select("#snowflakeAlphaControl").value()
            let snowflakeSize = select('#sizeOfSnowflakeControl').value();
            for (let i = 0; i < num_of_flakes; i++) {
                let rS = num_of_flakes * 7  // randomness Size
                let snowflakeX = mouseX - (rS + snowflakeSize * 3) / 2 + random(-rS, rS + snowflakeSize * 3)
                let snowflakeY = mouseY - (rS + snowflakeSize * 3) / 2 + random(-rS, rS + snowflakeSize * 3)
                tint(sC[0], sC[1], sC[2], flake_alpha)
                if (frameCount % 2 == 0) {
                    image(snowflake, snowflakeX, snowflakeY, snowflakeSize, snowflakeSize)
                }
            }
            if (mouseReleasedInPreviousFrame) {
                // part required to store the canvas image for UNDO/REDO function
                mouseReleasedInPreviousFrame = false;
                drawingInPreviousFrame = false;
                loadPixels()
                undoCount = finish(undoCount, 'Stamp Spray')
            }

        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;
        }
        return undoCount;
    }
}

