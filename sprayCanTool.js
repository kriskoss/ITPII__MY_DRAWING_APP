function SprayCan(c, undoArray, undoData) {

    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;


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
    this.return_pixels = function () {
        return_pixels_function_Helper(sentData)
    }

    this.unselectTool = function () {
        loadPixels()
        select(".options").html("");

    }

    // draw line to the canvas when mousePressed
    this.draw = function (undoCount) {

        if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame) {
            pixelsReadyToStore = true
            drawingInPreviousFrame = true;
            //END - UNDO/REDO functionality	

            //if the mouse is pressed paint on the canvas
            //spread describes how far to spread the paint from the mouse pointer
            //points holds how many pixels of paint for each mouse press.

            for (var i = 0; i < this.points; i++) {
                point(random(mouseX - this.spread, mouseX + this.spread),
                    random(mouseY - this.spread, mouseY + this.spread));
            }
            if (mouseReleasedInPreviousFrame) {
                // part required to store the canvas image for UNDO/REDO function
                mouseReleasedInPreviousFrame = false;
                drawingInPreviousFrame = false;
                loadPixels()
                undoCount = finish(undoCount, 'Spray')
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