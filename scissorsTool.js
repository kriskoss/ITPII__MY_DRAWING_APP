function Scissors(c, undoArray, undoData) {
    //TO DO:
    // 1. UNDO / REDO do not work
    // 2. Remove first mode - start immediately with CUT / COPY selection
    this.icon = "assets/scissors.png";
    this.name = "Scissors";

    let selectButton;
    let selectedPixels;

    let selectMode;
    let selectedArea;

    let copyCutMode;

    let pixelsReadyToStore = false;
    let self = this;
    let mouseReleasedInPreviousFrame = false
    let drawingInPreviousFrame = false;
    let fillOn


    let finish = function (undoCount, msg) { //uC
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg) //uC
        return undoCount //uC
    }
    this.return_pixels = function () {
    }

    this.unselectTool = function () {
        updatePixels()
        select(".options").html("");

    }

    this.setup = function () {
        fillOn = false
        selectMode = 0; //inital DRAWING mode
        selectedArea = { x: 0, y: 0, w: 0, h: 0 }

        copyCutMode = 0; //inital CUT mode        

        // creating containter for EDIT options
        editOptionsDiv = createDiv().parent(select(".options"))
        editOptionsDiv.id("editOptionsDiv")

        //creating Select/Cut/End Paste/Select button
        creatingSelectButtonAndFunctionality()
    }

    this.draw = function (undoCount) {

        //you might recognise this code
        if (selectMode == 0) { ///DRAWING
            selectMode++;
            selectButton.html('CUT')

            //Adding COPY button and removing it when used
            createAndRemoveCopyButton()
            loadPixels(); // store current frame in the buffer
        }
        if (mousePressOnCanvas(c)) {
            if (mouseIsPressed || mouseReleasedInPreviousFrame) {
                drawingInPreviousFrame = true;
                //check if they previousX and Y are -1. set them to the current
                //mouse X and Y if they are.

                if (selectMode == 1) { ///CUTTING
                    drawSelectBox()
                }
                else if (selectMode == 2) { /// PASTING
                    if (mouseReleasedInPreviousFrame) {
                        mouseReleasedInPreviousFrame = false;
                        loadPixels()
                    }

                }

            }

            else {
                //if the user has released the mouse we want to set the previousMouse values 
                //back to -1.
                previousMouseX = -1;
                previousMouseY = -1;

                if (selectMode == 2 && mousePressOnCanvas(c)) {
                    //Drawig image of selected Area to enable PASTING
                    drawImageToBePasted()

                }
            }
        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;
        }
        //UNDO/REDO functionlaity
        undoCount = finish(undoCount, 'Scissors')//uC
        pixelsReadyToStore = false;

        //UNDO/REDO functionlaity
        return undoCount;
    }

    this.keyPressed = function () { }

    this.mousePressed = function () {

        if (selectMode == 1) {
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;
            selectedArea.h = 0;
            selectedArea.w = 0;
        }
        else if (selectMode == 2 && selectedArea.w != 0) {
            //PASTING the selectedArea

            updatePixels() // prevents auxiliary box from remainin on the screen when button pressed
            image(selectedPixels, mouseX - selectedArea.w / 2, mouseY - selectedArea.h / 2)
            loadPixels()

            //UNDO/REDO functionlaity
            pixelsReadyToStore = true;
        }
    }

    this.mouseDragged = function () {
        if (selectMode == 1) {
            let w = mouseX - selectedArea.x;
            let h = mouseY - selectedArea.y;

            selectedArea.w = w;
            selectedArea.h = h;

        }
    }

    let changeFromCutToPasting = function () {
        selectMode++;

        selectButton.html('end paste')
        copyCutButton.remove()

        updatePixels();


        selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h)

        // Creating WHITE BOX to imitate CUT functionaluty
        if (copyCutMode == 0) {
            push();
            fill(255);
            noStroke();
            rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
            loadPixels()

            pop();
        }
    }

    let creatingSelectButtonAndFunctionality = function (undoCount) {
        selectButton = createButton('Select area').class("scissorsButtons");
        selectButton.parent("editOptionsDiv")
        selectButton.class("scissorsButtons")

        selectButton.mousePressed(function () {//
            //event code will go here    
            if (selectMode == 1 && selectedArea.w != 0 && selectedArea.w != 0) {

                changeFromCutToPasting()

            }
            else if (selectMode == 2) { //PASTING IMAGE
                selectMode = 0;
                copyCutMode = 0; //back to CUT mode
                updatePixels()
                loadPixels();
                selectedArea = { x: 0, y: 0, w: 0, h: 0 }
                selectButton.html('Select area')
            }
        });
    }

    let createAndRemoveCopyButton = function () {
        copyCutButton = createButton('COPY').parent("editOptionsDiv").class("scissorsButtons");
        copyCutButton.mousePressed(function () {
            if (selectedArea.w > 0 && selectedArea.h > 0) {
                copyCutMode = 1;
                changeFromCutToPasting()
            }
        })
    }

    let drawSelectBox = function () {
        //draws Red-transparent box marking the area to be cut/copied       
        push()
        updatePixels();
        noStroke();
        fill(100, 30, 0, 30)
        if (selectedArea.w > 0 && selectedArea.h > 0) {
            rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h)
        }
        pop()
    }

    let drawImageToBePasted = function () {
        updatePixels()
        loadPixels()

        push();
        //Draw overlay image BORDER
        noFill();
        strokeWeight(2)
        stroke(140, 120)
        rect(mouseX - selectedArea.w / 2, mouseY - selectedArea.h / 2, selectedArea.w, selectedArea.h)

        //OVERLAY image transparency

        image(selectedPixels, mouseX - selectedArea.w / 2, mouseY - selectedArea.h / 2)

        pop()
    }
}