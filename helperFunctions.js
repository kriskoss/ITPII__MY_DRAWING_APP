function HelperFunctions() {

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function () {
		background(255, 255, 255)

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});



	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function () {
		saveCanvas('myPicture', 'jpg')
	});


}

this.mousePressOnCanvas = function (canvas) {
	// helper function for editableLineTool.js
	onCanvasBorder = {
		l: canvas.elt.offsetLeft - 60,
		r: canvas.elt.offsetLeft + canvas.width - 80,
		t: canvas.elt.offsetTop - 30,
		b: canvas.elt.offsetTop + canvas.height - 60
	}
	if (mouseX > onCanvasBorder.l && mouseX < (onCanvasBorder.r) &&
		mouseY > onCanvasBorder.t && mouseY < (onCanvasBorder.b)) {
		return true;
	}
	push()
	strokeWeight(2)
	stroke(240)
	// line(onCanvasBorder.l, 100, onCanvasBorder.l, 500)
	// line(onCanvasBorder.r, 100, onCanvasBorder.r, 500)
	// line(100, onCanvasBorder.t, 500, onCanvasBorder.t)
	// line(100, onCanvasBorder.b, 500, onCanvasBorder.b)
	noFill()
	rect(
		onCanvasBorder.l,
		onCanvasBorder.t,
		onCanvasBorder.r - onCanvasBorder.l,
		onCanvasBorder.b - onCanvasBorder.t)
	pop()
	return false;
}



this.pushPixelsAndDataHelper = function (self, undoData, undoArray, undoCount, desctiption) {
	loadPixels()

	let uD_LastIndex = undoData.length - 1
	let currentIndex = uD_LastIndex - undoCount

	// undoArray.push(pixels)



	// console.log('file ' + 'undo' + str(undoData.length) + ' SAVED')

	if (undoCount > 0) {
		// If any part of a sketch finished - delete any canvas image stored beond the point at which current image is 
		console.table(undoData);
		undoData.splice(currentIndex + 1);
		undoArray.splice(currentIndex + 1);
		console.table(undoData);
		undoCount = 0;
	}
	// undoData.push(self.name + ": " + str(desctiption) + ' (' + str(undoData.length) + ')')
	undoData.push(str(desctiption) + ' (' + str(undoData.length) + ')')
	undoArray.push(get())
	/// logs the last operation and	
	// console.log(undoData[undoData.length - 1], undoArray.length, '(undo array lenght)')
	return undoCount
}

this.return_pixels_function_Helper = function (sentData) {
	console.log('aaaaaaaaaa')
	if (sentData) { ///AAA
		console.log('   ### DATA SENT to sketch.js###', self.name,)
		sentData = false; ///AAAAA
		return [undoArray, undoData]
	}
	else { return false }

}

this.finishHelper = function (pixelsReadyToStore, self, undoData, undoArray, undoCount, msg) {

	if (pixelsReadyToStore) { //AAA 2/3 WHENEVER pixels are READY TO STORE - this has to be called
		updatePixels() ///DDD
		undoCount = pushPixelsAndDataHelper(self, undoData, undoArray, undoCount, msg) //AAA
		sentData = true;
		pixelsReadyToStore = false
		console.table(undoData) //// KEEP THIS - use to dispaly performed action in the log AAAAA
	}

	return undoCount

}




