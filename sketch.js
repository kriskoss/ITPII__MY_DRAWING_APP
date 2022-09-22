//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
let smokeTool_presets = null;

//UNDO/REDO functionality variables
let undoCount = 0;
var undoData = [];
var undoArray = [] //maybe necessary to remove []

//double click variables
let clicked = false, doubleClickTimeout = 300;

//UNDO/REDO buttons label update variables
let uD_LastIndex
let currentIndex;
let nextUndo;
let nextRedo;
let undoActive = false;



function setup() {
	angleMode(DEGREES)

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new LineToTool(c, undoArray, undoData));
	toolbox.addTool(new rectTool(c, undoArray, undoData));
	toolbox.addTool(new ellipseTool(c, undoArray, undoData));
	toolbox.addTool(new FreehandCurvedTool(c, undoArray, undoData));
	toolbox.addTool(new Scissors(c, undoArray, undoData));
	toolbox.addTool(new StampTool(c, undoArray, undoData));
	toolbox.addTool(new EditableLineTool(c, undoArray, undoData));
	toolbox.addTool(new TwisterTool(c, undoArray, undoData));
	toolbox.addTool(new SmokeTool(c, undoArray, undoData));


	// toolbox.addTool(new Freehand_trianglesTool(c, undoArray, undoData));
	// toolbox.addTool(new SprayCan(c, undoArray, undoData));
	// toolbox.addTool(new mirrorDrawTool(c, undoArray, undoData));



	headerDiv = select(".header")
	strokeWidthLabel = createSpan('Stroke width: ').parent(headerDiv).class("header_labels")
	strokeWidthSlider = createSlider(0, 50, 3, 1).parent(headerDiv)
	background(255);

	//initiating UNDO/REDO functionality
	pushPixelsAndDataHelper(self, undoData, undoArray, undoCount, 'storing empty canvas')

	// UNDO and REDO click handlers
	undoRedoClickHandlers()

	//running setup function in each tool
	if (toolbox.selectedTool.hasOwnProperty("setup")) {
		toolbox.selectedTool.setup();
	}
}

function draw() {
	selectedColourData = colourP.selectedColourData

	strokeWidth_sliderValue = strokeWidthSlider.value()
	//call the draw function from the selected tool.
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		undoCount = toolbox.selectedTool.draw(undoCount, selectedColourData, strokeWidth_sliderValue);
		/// undoCount goes to the selected tool > draw() method > finish() method > finishHelper()>pushPixelsAndDataHelper() . There it is being reset to 0 if UNDO in use and new item is being finish on the canvas. From there it goes back in reverse to sketch.js where it is used in UNDO/REDO buttons update.

	} else {
		alert("it doesn't look like your tool has a draw method!");
	}

	//DISPLAY pixels	
	// runs return function ?? and updates the UNDO button
	if (toolbox.selectedTool.hasOwnProperty("return_pixels")) {

		uD_LastIndex = undoData.length - 1
		if (undoData.length > 1 && !undoActive) {
			select("#undoButton").html("UNDO::-" + str(undoData[uD_LastIndex]))
		}
	}
	// updating UNDO/REDO button labels
	if (frameCount / 30 == parseInt(frameCount / 30)) {// REFERENCE 4 - robot ITP week 7 lecture

		updateUndoRedoButtons();
	}
}


function undoRedoClickHandlers() {

	select("#undoButton").mouseClicked(function () {
		{/// UNDO BUTTON

			if (0 < uD_LastIndex - undoCount) { undoCount++ }
			updateUndoRedoButtons()
			// updateCanvas(currentIndex)


			//recovering canvas image from undoArray for #CORE ELEMENT of the UNDO function
			set(0, 0, undoArray[currentIndex])
			// console.log('undo image displayes', currentIndex)

			updatePixels()
		}
	})
	select("#redoButton").mouseClicked(function () {
		{//REDO BUTTON
			if (uD_LastIndex - undoCount < uD_LastIndex) { undoCount-- }
			updateUndoRedoButtons()
			// updateCanvas(currentIndex)

			set(0, 0, undoArray[currentIndex])

		}
	})

}

function updateUndoRedoButtons() {

	currentIndex = uD_LastIndex - undoCount
	nextUndo = currentIndex - 1
	nextRedo = currentIndex + 1

	// console.log(nextUndo, currentIndex, nextRedo)
	// console.table(undoData)

	if (undoCount >= 0) { undoActive = true; }
	//UPDATING UNDO button			
	if (nextUndo < 0) {
		select("#undoButton").html("UNDO:   ")
	}
	else { select("#undoButton").html("UNDO:" + undoData[currentIndex]) } //UNDO:



	//UPDATING REDO button
	if (nextRedo > uD_LastIndex) { select("#redoButton").html("REDO:   ") }
	else {
		select("#redoButton").html("REDO: " + undoData[nextRedo]) //REDO:
	}
}

function keyPressed() {

	if (toolbox.selectedTool.hasOwnProperty("keyPressed")) {
		toolbox.selectedTool.keyPressed();
	}
}

function mouseReleased() {

	if (toolbox.selectedTool.hasOwnProperty("mouseReleased")) {
		toolbox.selectedTool.mouseReleased();
	}
}
function mousePressed() {

	if (toolbox.selectedTool.hasOwnProperty("mousePressed")) {
		toolbox.selectedTool.mousePressed();
	}
}

function mouseDragged() {

	if (toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
		toolbox.selectedTool.mouseDragged();
	}
}

function mouseClicked() {
	if (!clicked) {
		clicked = true;
		setTimeout(function () {
			if (clicked) {
				// console.log("single click");
				clicked = false;
				//single Click code below if necessary

			}
		}, doubleClickTimeout);
	} else {
		clicked = false;

		// DOUBLE CLIKCK CODE below
		toolbox.tools.find(x => x.name === 'Editable Line Tool').doubleClick()
	}
	//REFERENCE 3-- https://stackoverflow.com/questions/51144762/p5-js-mousepressed-works-but-doublepressed-

}




