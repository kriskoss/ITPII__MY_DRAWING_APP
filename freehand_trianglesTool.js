function Freehand_trianglesTool(c, undoArray, undoData) {
    //set an icon and a name for the object
    this.icon = "assets/freehand2.jpg";
    this.name = "Freehand Triangles Tool";
    this.c = c;
    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

    let prev_Xs = []
    let prev_Ys = []

    let pixelsReadyToStore = false; ///BBB
    let sentData = false;       ///BBB
    let self = this;

    let mouseReleasedInPreviousFrame = false;
    let drawingInPreviousFrame = false;

    let finish = function (undoCount, msg) { ///BBB
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg)
        return undoCount //uC

    }
    this.return_pixels = function () { ///EXACT COPY FROM editable line tool //BBB
        return_pixels_function_Helper(sentData)
    }

    this.unselectTool = function () {///BBBB
        loadPixels()
        select(".options").html("");

    }

    this.draw = function (undoCount) {
        //if the mouse is pressed
        push()
        noFill()

        if ((mousePressOnCanvas(c) && mouseIsPressed) || (mouseReleasedInPreviousFrame)) {
            pixelsReadyToStore = true //BBB /////##### UNDO REDO related#####

            if (!mouseReleasedInPreviousFrame) {
                drawingInPreviousFrame = true; ///BBB /////##### UNDO REDO related#####
            }
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.

            if (previousMouseX == -1) {
                // loadPixels()
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                prev_Xs.push(mouseX)
                prev_Ys.push(mouseY)


            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else if (prev_Xs.length < 4) {
                beginShape()
                prev_Xs.push(mouseX)
                prev_Ys.push(mouseY)

                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            else {

                for (let i = 0; i < prev_Xs.length; i++) {
                    curveVertex(prev_Xs[i], prev_Ys[i]);
                }

                prev_Xs.push(mouseX)
                prev_Ys.push(mouseY)

                prev_Xs = prev_Xs.splice(1, 5)
                prev_Ys = prev_Ys.splice(1, 5)

                previousMouseX = mouseX;
                previousMouseY = mouseY;

                endShape()

                if (mouseReleasedInPreviousFrame) {
                    mouseReleasedInPreviousFrame = false;
                    loadPixels()
                    undoCount = finish(undoCount, 'Triangle Line')
                    console.log('          loadPixels()', self.name,)
                }
            }
        }


        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part when mouse is preesed to finish the line             
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;
        }

        else {
            //if the user has released the mouse we want to set the previousMouse values 
            //back to -1.
            previousMouseX = -1;
            previousMouseY = -1;
            prev_Xs = []
            prev_Ys = []

        }
        return undoCount //uC 
    };

}