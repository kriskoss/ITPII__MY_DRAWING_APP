function rectTool(c, undoArray, undoData) {
    //declare private varialbles
    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    this.name = "rectTool";

    this.icon = "assets/recta.jpg";

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
    this.populateOptions = function () {
        //##CREATING BUTTONS AND OTHER CONTROLS
        addOptionControls()

        //###CLICK HANDLERS###
        // addClickHandlers()
    }

    fillOn = false
    let addOptionControls = function () {
        optionsDiv = createDiv()
        optionsDiv.parent(select(".options"))
        fillNoFill = createButton('No Fill').parent(optionsDiv).class("depressedButton")
        fillNoFill.mouseClicked(function () {
            fillOn = !fillOn

        })
    }


    // draw line to the canvas when mousePressed
    this.draw = function (undoCount, selCol, sW) {

        if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame) {
            pixelsReadyToStore = true
            drawingInPreviousFrame = true;
            //END - UNDO/REDO functionality	

            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();

            }

            else {
                updatePixels();

                if (fillOn) {
                    noStroke()
                    fill(selCol[0], selCol[1], selCol[2], selCol[3])

                }
                else {
                    noFill()
                    strokeWeight(sW)
                    stroke(selCol[0], selCol[1], selCol[2], selCol[3])

                }
                rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                pop()

                if (mouseReleasedInPreviousFrame) {
                    // part required to store the canvas image for UNDO/REDO function
                    mouseReleasedInPreviousFrame = false;
                    drawingInPreviousFrame = false;
                    loadPixels()
                    undoCount = finish(undoCount, 'Rectangular')
                }
            }

        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;
        }
        else if (drawing) {
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }

        if (fillOn) {
            fillNoFill.class("depressedButton")
        }
        else {
            fillNoFill.class("pressedButton")
        }
        return undoCount;
    };


}

