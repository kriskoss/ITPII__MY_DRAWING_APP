//editableLineTool.js
function EditableLineTool(c, undoArray, undoData) {

    this.c = c
    this.name = "Editable Line Tool"
    this.icon = 'assets/edittool.png';


    let currentShape = [];
    let editedVertexIndex
    let lastVertexEdited
    // let minVertexDistSliderValue;
    let editMode
    let curvedLineOn
    let lastLoop
    let addMissingEnds


    let ready_to_store_mouseShift
    let mouse_shift


    //settings
    let clickRange
    let c_tightness
    let pixelsReadyToStore = false;
    let sentData = false;
    let self = this;

    //FLAGS   
    let closedShape
    let createLvl1
    let createLvl2
    let createEditingCtrls
    let createDrawingCtrls
    let FirstToolState2Complete

    let toolState
    //0 - initial drawin(no edit button) Edit possible, 
    //1 - drawing , 
    //2 - editing
    // this.setup = function () {
    //     // loadPixels(); // storing initial state of the canvas
    // }
    this.setup = function () {
        closedShape = false;
        createLvl1 = true;
        createLvl2 = true;
        createEditingCtrls = true;
        createDrawingCtrls = true
        FirstToolState2Complete = false

        toolState = 0

        editedVertexIndex = -1
        lastVertexEdited = -1
        // let minVertexDistSliderValue;
        editMode = false;
        curvedLineOn = false
        lastLoop = false;
        addMissingEnds = false;


        ready_to_store_mouseShift = true;
        mouse_shift;


        //settings
        clickRange = 8
        c_tightness = 0
    }

    self = this
    this.draw = function (undoCount, selectedColourData, strokeW) {
        // Sets how many pixels from the vertex it is possible to select specific vertex
        clickRange = max([8, strokeW])

        updatePixels()

        ///IN DRAWING MODE
        if (toolState == 1) {
            //      create Min.Vertex Size slider
            if (createDrawingCtrls) {
                //drawing mode controls created when DRAWING MODE (1) detected
                createDrawingCtrls = false



                //### DRAWING LEVEL ###
                dstr = ''
                // dstr = 'DravingDiv'
                drawingDiv = createDiv(dstr).parent(lvl3Div)
                // drawingDiv.style("background-color: rgb(160, 147, 211);")

                //### CURVED LINES LEVEL ###


                minVertexDistLabel = createSpan("New vertices minimum separation:").parent(drawingDiv)
                minVertexDistSlider = createSlider(1, 100, 40, 1).parent(drawingDiv)
                minVertexDistSlider.id("minVertexDist")
                if (FirstToolState2Complete) {
                    editingDiv.remove()
                    deleteVertexButton.remove()
                }
            }

        }
        ///IN EDITING MODE
        else if (toolState == 2) {
            if (createEditingCtrls) {//drawing mode controls are removed when EDITING MODE (2 )detected

                createEditingCtrls = false;
                FirstToolState2Complete = true

                minVertexDistLabel.remove()
                minVertexDistSlider.remove()
                drawingDiv.remove()


                //### EDITING LEVEL ###
                dstr = ''
                // dstr = "EditingDiv:"
                editingDiv = createDiv(dstr).parent(lvl3Div)
                // editingDiv.style("background-color: rgb(160, 47, 011);")

                //      DELETE button
                deleteVertexButton = createButton("Delete Vertex").parent(editingDiv)
                deleteVertexButton.id("deleteVertex").class('EditableLineTool_buttons')
                deleteVertexButton.style("background-color: rgb(120, 50, 50);")


                ///CLICK HANDLERS
                select('#deleteVertex').mouseClicked(function () {
                    if (lastVertexEdited != -1 && editMode) {
                        delVertex()
                    }
                })
            }
        }
        if (curvedLineOn && toolState != 0) {
            if (document.querySelector("#curveTightness")) {
                c_tightness = select("#curveTightness").value() / 10
            }
        }

        if (mouseIsPressed && toolState == 1) {
            minVertexDistSliderValue = select('#minVertexDist').value()
        }

        if (mousePressOnCanvas(c) && mouseIsPressed) {
            //Holding mouse butten when over canvas
            pixelsReadyToStore = true  //AAA

            ///CREATE BASIC LINE CONTROLS
            //when mouse is clicked on the canvas then controls are created
            if (toolState == 0) {

                createLvl1 = false
                //      create FINISH BUTTON
                finishButton = createButton("#FINISH SHAPE#").parent(lvl1Div)
                finishButton.id("finishButton").class('EditableLineTool_buttons')
                // 
                //  create Edit Shape button BUTTON -
                editShapeButton = createButton("EDIT LINE").parent(lvl2Div)
                editShapeButton.id("editShapeButton").class('EditableLineTool_buttons')


                //      Create BUTTON - Curved Line 
                curvedVertexButton = createButton("Curved Lines").parent(lvl2Div)
                curvedVertexButton.id("curvedVertexButton").class('EditableLineTool_buttons')

                //      Create BUTTON - Close/Open
                closedLineButton = createButton("CLOSE SHAPE").parent(lvl2Div)
                closedLineButton.id("closedLineButton").class('EditableLineTool_buttons');




                ///CLICK HANDLERS
                if (document.querySelector('#editShapeButton')) {  //REFERENCE 1 -
                    //https://sebhastian.com/javascript-check-if-element-exists/
                    // https://sebhastian.com/javascript-check-if-element-exists/
                    select('#editShapeButton').mouseClicked(function () {

                        let editButton = select("#" + this.elt.id);

                        if (editMode) {
                            editMode = false;
                            editButton.html('EDIT LINE');
                            editButton.class('EditableLineTool_buttons')
                            toolState = 1
                            createEditingCtrls = true

                        }
                        else {
                            editMode = true;
                            editButton.html('EDIT LINE')
                            editButton.class('pressedButton')

                            toolState = 2
                            createDrawingCtrls = true;

                        }
                    })
                }
                if (document.querySelector('#finishButton')) {
                    select('#finishButton').mouseClicked(function () {
                        //when mousePressed on the finish button - anonymous function is being called
                        undoCount = finishExtended(undoCount, "Editable Line")

                        //RESTARTING OPTIONS CONTROLS
                        // toolState = 0

                        createLvl1 = true;
                        // lvl1Div.remove()
                        // lvl2Div.remove()
                        // lvl3Div.remove()
                        finishButton.remove();
                        editShapeButton.remove();
                        curvedVertexButton.remove();
                        closedLineButton.remove();
                        minVertexDistLabel.remove()
                        minVertexDistSlider.remove()
                        curvedLinesDiv.remove()


                        // createLvl2 = true;
                        // FirstToolState2Complete = false;
                        self.setup()
                    })
                }

                if (document.querySelector('#curvedVertexButton')) {
                    select('#curvedVertexButton').mouseClicked(function () {
                        let curvedLineButton = select("#" + this.elt.id);

                        if (curvedLineOn) {
                            curvedLineOn = false;
                            curvedLineButton.class('EditableLineTool_buttons')
                            curvedLinesDiv.remove()
                        }
                        else {
                            curvedLineOn = true;
                            curvedLineButton.class('pressedButton')

                            addCurvedLineCtrols()
                        }

                    });
                }
                if (document.querySelector('#closedLineButton')) {
                    select('#closedLineButton').mouseClicked(function () {

                        closedShape = !closedShape
                        if (!closedShape) {
                            closedLineButton.class('EditableLineTool_buttons')
                        }
                        else {
                            closedLineButton.class('pressedButton')

                        }
                    })
                }

            }


            if (!editMode && toolState != 0) {//DRAW MODE
                addCurrentShapeVerticesToArray(minVertexDistSliderValue)
            }
            else if (editMode) {
                editVertex()
            }
            if (toolState == 0) {
                toolState = 1
            }
        }

        //DRAWING LINE
        push()
        strokeWeight(strokeW)
        beginShape();
        noFill()
        for (let i = 0; i < currentShape.length; i++) {

            // DRAW: straight or curved line
            if (curvedLineOn) {// CURVED LINE MODE
                curveTightness(c_tightness)
                //[CORE ITEM] - drawing curve
                curveVertex(currentShape[i].x, currentShape[i].y);

                // adding missing lines at the ends when curved lines in use
                addMissingEndsOfCurvedLine(i)
            }
            else {
                //[CORE ITEM] - //STRAIGHT LINE MODE
                vertex(currentShape[i].x, currentShape[i].y);
            }
        }
        ///ending line shape - CLOSED or opened
        if (closedShape) {

            push()
            noStroke()

            sc = selectedColourData

            fill(sc[0], sc[1], sc[2], sc[3])
            endShape(CLOSE);
        }
        else {
            endShape();
        }

        //DRAWING ADDTITIONAL FEATURES: vertex markers and any otehr makrkers
        for (let i = 0; i < currentShape.length; i++) {

            if (!lastLoop && !editMode && toolState != 0) {//DRAW MODE
                //last loop - prevents items from remaining on the canvas when finish() called

                //add end of the line marker
                drawEndOfLineMarkerInDrawMode(i)

                // drawing minimum vertex distance circle at last vertex (green circle)                
                drawGreenCircle_minVertexDistance(i, minVertexDistSliderValue)

                // add curved line markers - at the beginning and at the end of the curved line
                drawCurvedLineMarkers(1)
                drawCurvedLineMarkers(currentShape.length - 2)

                // draw helper line within GREEN CIRCLE
                drawHelperLineInGrennCircle(i, minVertexDistSliderValue)

                if (closedShape) {
                    push()
                    ///creating assistive "CLOSE" line                     
                    strokeWeight(7)
                    stroke(255, 0, 0, 100)
                    if (currentShape.length > 2) {
                        line(currentShape[0].x,
                            currentShape[0].y,
                            currentShape[currentShape.length - 1].x,
                            currentShape[currentShape.length - 1].y)
                    }
                    //drawing assistive linex to the next vertex
                    if (mousePressOnCanvas(c)) {
                        strokeWeight(1)
                        stroke(150, 10)
                        line(currentShape[0].x,
                            currentShape[0].y,
                            mouseX,
                            mouseY)
                        line(mouseX,
                            mouseY,
                            currentShape[currentShape.length - 1].x,
                            currentShape[currentShape.length - 1].y)
                    }
                    pop()

                }
            }

            else if (editMode) {//EDIT MODE
                drawVertexMarkers(i, strokeW);

                // End of the line marker in EDIT MODE
                drawEndOfLineMarkerInEditMode(i)

                // marking with magenta ellipse - the last vertex used
                markLastEditedMarker(i)
            }
        }

        pop()


        return undoCount;
    }

    this.populateOptions = function () {
        //##CREATING BUTTONS AND OTHER CONTROLS
        addOptionControls()

        //###CLICK HANDLERS###
        // addClickHandlers()
    }

    this.doubleClick = function () {
        // function detecting double clikc - it is being called from sketch.js
        for (let i = 0; i < currentShape.length; i++) {
            if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < clickRange) {
                delVertex()
            }
        }
        console.log('double click detected')
    }



    let delVertex = function () {
        //delete selected vertex in edit mode
        console.log(lastVertexEdited, currentShape.length)
        currentShape.splice(lastVertexEdited, 1)
        lastVertexEdited = -1
        console.log(lastVertexEdited, currentShape.length)
    }

    let drawCurvedLineMarkers = function (i) {

        if (currentShape.length > 2 && i > 0 && i < currentShape.length - 1) {

            origin_1 = {
                x: currentShape[i].x,
                y: currentShape[i].y,
            }

            delta_0 = {
                x: currentShape[i - 1].x - currentShape[i].x,
                y: currentShape[i - 1].y - currentShape[i].y,
            }
            delta_2 = {
                x: currentShape[i + 1].x - currentShape[i].x,
                y: currentShape[i + 1].y - currentShape[i].y,
            }
            push()
            translate(origin_1.x, origin_1.y)
            v10 = createVector(delta_0.x, delta_0.y)
            v12 = createVector(delta_2.x, delta_2.y)


            // calculating angle between vectors going out of currentShape[i]
            // angle012 = v10.angleBetween(v12)
            let angle012 = v10.angleBetween(v12) * Math.sign(v10.cross(v12).z || 1);
            //REFERENCE 2 - https://github.com/processing/p5.js/issues/3973 - to resolve issue with absolute value of angleBetween() p5.js function 

            let halfAngleVector = (v10.copy()).rotate(angle012 / 2).normalize().mult(30)
            push()
            strokeWeight(1)
            stroke('red')
            line(-halfAngleVector.x, -halfAngleVector.y, halfAngleVector.x, halfAngleVector.y)
            // text(round(angle012), 5, 15)
            pop()
            pop()

        }

    }

    let addOptionControls = function () {
        optionsDiv = createDiv()
        optionsDiv.parent(select(".options"))
        optionsDiv.id("editOptionsDiv")


        //### LEVEL 1 ###
        lv1 = ""
        lv2 = ""
        lv3 = ""
        lv4 = ""


        // lv1 = "lvl1Div:"
        //         lv2 = "lvl2Div:"
        //         lv3 = "lvl3Div:"
        //         lv4 = "lvl4Div:"


        lvl1Div = createDiv(lv1).parent(optionsDiv)
        // lvl1Div.style("background-color: rgb(100, 17, 111);")


        //### LEVEL 2 ###
        lvl2Div = createDiv(lv2).parent(optionsDiv)
        // lvl2Div.style("background-color: rgb(200, 117, 111);")


        //### LEVEL 3 ###
        lvl3Div = createDiv(lv3).parent(optionsDiv)
        // lvl3Div.style("background-color: rgb(100, 250, 250);")

        //### LEVEL 4 ###
        lvl4Div = createDiv(lv4).parent(optionsDiv)
        // lvl4Div.style("background-color: rgb(180, 150, 250);")



    }

    let addCurrentShapeVerticesToArray = function (minVertexDistSliderValue) {
        if (currentShape.length == 0) { // recording loacation of first vertex of the line
            currentShape.push({
                x: mouseX,
                y: mouseY
            })

        }
        else {// recording location of next vertices only if minimal distance between last vertex and current mouse position has been reached
            let lastVertex = currentShape.slice(-1)[0]
            if (dist(lastVertex.x, lastVertex.y, mouseX, mouseY) > minVertexDistSliderValue)
                currentShape.push({
                    x: mouseX,
                    y: mouseY
                })
        }
    }
    let editVertex = function () {
        for (let i = 0; i < currentShape.length; i++) {
            // get the index number of vertex which was clicked within edit circle range
            if (dist(
                currentShape[i].x,
                currentShape[i].y,
                mouseX,
                mouseY) < clickRange && editedVertexIndex == -1) {

                if (editedVertexIndex == -1) {
                    editedVertexIndex = i
                    lastVertexEdited = i
                }

            }
            // edit position of selected vertex
            else if (editedVertexIndex == i) {
                // updating location of clicked index
                if (ready_to_store_mouseShift) {
                    mouse_shift = {
                        x: mouseX - currentShape[editedVertexIndex].x,
                        y: mouseY - currentShape[editedVertexIndex].y
                    }
                    ready_to_store_mouseShift = false;
                }

                // translate(currentShape[editedVertexIndex].x, currentShape[editedVertexIndex].y)  
                currentShape[editedVertexIndex].x = mouseX - mouse_shift.x
                currentShape[editedVertexIndex].y = mouseY - mouse_shift.y

            }

        }
    }

    let addMissingEndsOfCurvedLine = function (i) {
        // curveVertex requires 3 points to create a curve - curve between vertices 0 and 1 and last and penultimate cannot be created - instead two STRAIGHT LINES are added
        if (addMissingEnds) {

            if (currentShape.length > 1) {
                let l = currentShape.length;
                if (i == 1) {
                    line(currentShape[0].x, currentShape[0].y, currentShape[1].x, currentShape[1].y)
                }
                else if (i == currentShape.length - 1) {

                    line(currentShape[l - 2].x, currentShape[l - 2].y, currentShape[l - 1].x, currentShape[l - 1].y)
                }
            }
        }
    }

    let drawEndOfLineMarkerInDrawMode = function (i) {
        if (i == currentShape.length - 1) {
            push()
            fill(125, 125, 125, 125);
            noStroke()
            ellipse(currentShape[i].x, currentShape[i].y, 10, 10);
            pop()
        }
    }

    let drawGreenCircle_minVertexDistance = function (i, minVertexDistSliderValue) {
        // circle repesenting minimum distance between vertices        
        if (i == currentShape.length - 1) {
            push()
            noFill();
            stroke(40, 220, 50, 50)
            strokeWeight(minVertexDistSliderValue / 8)

            ellipse(
                currentShape[currentShape.length - 1].x,
                currentShape[currentShape.length - 1].y,
                minVertexDistSliderValue * 2,
                minVertexDistSliderValue * 2)

            pop()
            noFill()
        }
    }

    let drawHelperLineInGrennCircle = function (i, minVertexDistSliderValue) {
        // draw in EDIT MODE line within min. vertex distance circle (green circle)
        if (mouseIsPressed && i == (currentShape.length - 1)) {
            if (dist(
                currentShape[currentShape.length - 1].x,
                currentShape[currentShape.length - 1].y,
                mouseX,
                mouseY) < minVertexDistSliderValue) {

                push()
                strokeWeight(2)
                stroke(50, 40)
                line(
                    currentShape[currentShape.length - 1].x,
                    currentShape[currentShape.length - 1].y,
                    mouseX,
                    mouseY)
                pop()

            }
        }
    }

    let drawEndOfLineMarkerInEditMode = function (i) {
        // draw end of a line marker in edit mode
        if (i == currentShape.length - 1) {
            push()
            fill(22, 110, 199, 70);
            strokeWeight(2)
            stroke("orange")
            let eSize = clickRange * 2
            if (closedShape) {
                eSize = clickRange * 4
            }
            ellipse(
                currentShape[i].x,
                currentShape[i].y,
                eSize,
                eSize);
            pop();
        }
    }

    let drawVertexMarkers = function (i) {
        push();
        // vertex dot        
        fill('red');
        noStroke()
        let vertexSize = 6
        if (closedShape) {
            fill(255, 0, 125, 125);
            vertexSize = 15
        }
        ellipse(currentShape[i].x, currentShape[i].y, vertexSize, vertexSize);

        // CLICK RANGE CIRCLE
        noFill();
        strokeWeight(1)
        stroke("gray")
        let eSize = clickRange * 2
        ellipse(currentShape[i].x, currentShape[i].y, eSize);
        pop();
    }

    let markLastEditedMarker = function (i) {
        //Mark last edited vertex - MAGENTA DOT        
        if (lastVertexEdited == i) {
            push()
            fill(125, 0, 125, 60);
            noStroke();
            let ellipseSize = max([25, clickRange * 2]);
            if (closedShape) {
                ellipseSize = 35;
            }
            ellipse(
                currentShape[lastVertexEdited].x,
                currentShape[lastVertexEdited].y,
                ellipseSize,
                ellipseSize);
            pop();
        }
    }
    let addCurvedLineCtrols = function () {
        dstr = ''
        // dstr = "curvedLinesDiv: "
        curvedLinesDiv = createDiv(dstr).parent(lvl4Div)
        // curvedLinesDiv.style("background-color: rgb(20, 117, 211);")

        addMissingEndsButton = createButton("Missing Ends").parent(curvedLinesDiv)
        addMissingEndsButton.id("addMissingEndsButton").class('EditableLineTool_buttons')
        addMissingEndsButton.mouseClicked(function () {

            if (!addMissingEnds) {
                addMissingEnds = true;
                addMissingEndsButton.class('pressedButton')
            }
            else {
                addMissingEnds = false;
                addMissingEndsButton.class('EditableLineTool_buttons')
            }
        })

        curveTightnessLabel = createSpan('Roundness').parent(curvedLinesDiv)
        curveTightnessSlider = createSlider(-20, 20, 0, 1).parent(curvedLinesDiv)
        curveTightnessSlider.id("curveTightness").class('EditableLineTool_buttons')
    }

    let finishExtended = function (undoCount, msg) {
        // finish currentShape

        editMode = false; // to prevent edit circles from remaining on the canvas
        lastLoop = true;
        draw(); // redraws canvas without edit circles
        lastLoop = false

        addMissingEnds = false;
        curvedLineOn = false;
        currentShape = [];

        loadPixels()
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg)

        return undoCount;
    }
    this.unselectTool = function () {
        //what happens when Editabe Line Tool has been deselected

        select(".options").html("");
        undoCount = finishExtended(undoCount, "Editable Line(u)")
    };

    this.mouseReleased = function () {
        // function detecting single click - it is being called from sketch.js
        if (editMode) {
            editedVertexIndex = -1;
            ready_to_store_mouseShift = true;
        }
    }
    this.return_pixels = function () { ///BB
        return_pixels_function_Helper(sentData)

    }




}