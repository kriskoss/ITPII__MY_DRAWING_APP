function LineToTool(c, undoArray, undoData) {
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//declare private varialbles
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	///UNDO/REDO functionality
	let pixelsReadyToStore = false;
	let sentData = false;
	let self = this;

	let finish = function (undoCount, msg) {
		undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg)
		return undoCount //uC
	}
	this.return_pixels = function () {
		return_pixels_function_Helper(sentData)
	}

	this.unselectTool = function () {
		loadPixels()
		select(".options").html("");

	}
	this.setup = function () {
		this.unselectTool()
	}

	// draw line to the canvas when mousePressed
	this.draw = function (undoCount, selectedColourData, strokeWidth_sliderValue) {
		stroke(selectedColourData)
		strokeWeight(strokeWidth_sliderValue)
		if (mousePressOnCanvas(c) && mouseIsPressed) {
			pixelsReadyToStore = true
			//END - UNDO/REDO functionality	

			// if mouse button is pressed and this is first frame after button pressed - current image of canvas will be stored and mouse postion at the button pressed moment will be stored.
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();

			}

			else {
				// this line runs when mouse button is pressed and this is any other fram after the first frame 

				updatePixels();
				// image of the canvas at the moment when button was pressed is being restored to erase any line which was created in in previous frame

				line(startMouseX, startMouseY, mouseX, mouseY);
				// line is being drawn between the curent mouse ponter location and the location of pointer when the mouse button was pressed - if button is kept pressed - this line will be replaced by new one in next frame. If button is released, this line will remain on the canvas.
			}

		}

		else if (drawing) {
			// stores the canvas for use with other tools, and resets drawing and startMouse to default value to be ready for next line to be drawn.
			loadPixels();
			drawing = false;
			undoCount = finish(undoCount, 'Line')
			startMouseX = -1;
			startMouseY = -1;
		}
		return undoCount; //uC
	};


}
