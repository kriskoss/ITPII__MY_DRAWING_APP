//mirrorDrawTool.js
function mirrorDrawTool(c, undoArray, undoData) {
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.jpg";

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;

	//this changes in the p5.dom click handler. So storing it as
	//a variable self now means we can still access this in the handler
	// var self = this;

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	var previousMouseX = -1;
	var previousMouseY = -1;

	//mouse coordinates for the other side of the Line of symmetry.
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;

	///UNDO/REDO functionality
	let pixelsReadyToStore = false;
	let sentData = false;
	let self = this;

	let mouseReleasedInPreviousFrame = false;
	let drawingInPreviousFrame = false;


	let finish = function (undoCount, msg) {
		finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg)
		return undoCount;
	}
	this.return_pixels = function () {
		return_pixels_function_Helper(sentData)
	}

	this.unselectTool = function () {
		updatePixels()
		select(".options").html("");


	}

	this.draw = function (undoCount) {
		//display the last save state of pixels
		updatePixels();

		//do the drawing if the mouse is pressed
		if ((mousePressOnCanvas(c) && mouseIsPressed) || mouseReleasedInPreviousFrame) {
			pixelsReadyToStore = true
			drawingInPreviousFrame = true;
			//END - UNDO/REDO functionality	

			//if the previous values are -1 set them to the current mouse location
			//and mirrored positions
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
				previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
			}

			//if there are values in the previous locations
			//draw a line between them and the current positions
			else {
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;

				//these are for the mirrored drawing the other side of the
				//line of symmetry
				var oX = this.calculateOpposite(mouseX, "x");
				var oY = this.calculateOpposite(mouseY, "y");
				line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
				previousOppositeMouseX = oX;
				previousOppositeMouseY = oY;

				if (mouseReleasedInPreviousFrame) {
					// part required to store the canvas image for UNDO/REDO function
					mouseReleasedInPreviousFrame = false;
					drawingInPreviousFrame = false;
					undoCount = finish(undoCount, 'Mirror Line')
				}
			}
		}

		else if (drawingInPreviousFrame) {
			// giving one time access to the draw part to enabe the UNDO/REDO functionality                         
			drawingInPreviousFrame = false;
			mouseReleasedInPreviousFrame = true;
		}
		//if the mouse isn't pressed reset the previous values to -1
		else {
			previousMouseX = -1;
			previousMouseY = -1;

			previousOppositeMouseX = -1;
			previousOppositeMouseY = -1;
		}

		//after the drawing is done save the pixel state. We don't want the
		//line of symmetry to be part of our drawing

		loadPixels();

		push();
		strokeWeight(3);
		stroke("red");
		//draw the line of symmetry
		if (this.axis == "x") {
			line(width / 2, 0, width / 2, height);
		} else {
			line(0, height / 2, width, height / 2);
		}
		//return to the original stroke
		pop();
		return undoCount;
	};

	/*calculate an opposite coordinate the other side of the
	 *symmetry line.
	 *@param n number: location for either x or y coordinate
	 *@param a [x,y]: the axis of the coordinate (y or y)
	 *@return number: the opposite coordinate
	 */
	this.calculateOpposite = function (n, a) {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};


	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options


	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function () {
		select(".options").html(
			"<button id='directionButton'>Make Horizontal</button>");
		// 	//click handler
		select("#directionButton").mouseClicked(function () {
			var button = select("#" + this.elt.id);
			if (self.axis == "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			} else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
		});
	};
}