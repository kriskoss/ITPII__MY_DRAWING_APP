function FreehandCurvedTool(c, undoArray, undoData) {
    //Initially draw line which connects vertexes created during drawing, and than convert is to curved line once mouse button released
    //set an icon and a name for the object
    this.icon = "assets/freehand3.png";
    this.name = "Freehand - Curved line";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

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
        console.log('pix return  free hand')
        return_pixels_function_Helper(sentData)

    }

    this.unselectTool = function () {
        loadPixels()
        select(".options").html("");

    }

    this.draw = function (undoCount, selectedColourData, strokeWidth_sliderValue) { //uC

        // console.log('undoCount', undoCount, self.name)
        //if the mouse is pressed
        push()
        noFill()
        strokeWeight(strokeWidth_sliderValue)
        stroke(selectedColourData)

        if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame) {
            pixelsReadyToStore = true //BBB /////##### UNDO REDO related#####
            drawingInPreviousFrame = true;

            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.

            if (previousMouseX == -1) {
                loadPixels()
                beginShape()
                curveVertex(mouseX, mouseY)

                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location

            else {
                // setting the minium distance between pixels to be drawn
                let current_prev_dist = dist(previousMouseX, previousMouseY, mouseX, mouseY)
                if (current_prev_dist > 5) {
                    // line(previousMouseX, previousMouseY, mouseX, mouseY);
                    curveVertex(previousMouseX, previousMouseY)
                    line(previousMouseX, previousMouseY, mouseX, mouseY);

                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }

            }
            if (mouseReleasedInPreviousFrame) {
                // part required to store the canvas image for UNDO/REDO function
                mouseReleasedInPreviousFrame = false;
                drawingInPreviousFrame = false;

                if (previousMouseX != -1) {
                    updatePixels() ///DD

                    curveVertex(previousMouseX, previousMouseY)
                    curveVertex(mouseX, mouseY)
                    endShape()
                }

                previousMouseX = -1;
                previousMouseY = -1;

                pop()
                loadPixels()
                undoCount = finish(undoCount, 'Freehand Line')//uC


            }
        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;
        }

        return undoCount //uC 
    };
}