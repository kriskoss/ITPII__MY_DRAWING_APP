//Displays and handles the colour palette.
function ColourPalette() {
	//a list of web colour strings

	this.colours = [];
	let colours_exteded = [];
	let colorRGBA = 'c_string'

	let basicColours = [
		[0, 0, 0, 255],
		[66, 66, 66, 255], //dark gray
		[125, 125, 125, 255], //"gray",
		[255, 255, 255, 255], //"white",

		[255, 192, 203, 255], //"pink",		
		[128, 0, 128, 255], //"purple",	
		[128, 0, 0, 255], //"maroon",
		[255, 0, 0, 255], //"red", 

		[255, 165, 0, 255], //"orange",
		[255, 255, 0, 255], //"yellow",
		[0, 255, 0, 255], //"lime",		
		[0, 128, 0, 255], //"green",

		[0, 0, 255, 255], //"blue",
		[0, 128, 128, 255], //"teal",		
		[128, 128, 0, 255], //"olive",		
		[0, 255, 255, 255], //"aqua"		

	];
	///POPULATING this.colours array with additional shades 
	for (let i = 0; i < basicColours.length; i++) {
		this.colours.push(basicColours[i])
	}
	let shades = 4
	let cStep = round(250 / shades)
	for (let i = 0; i < shades; i++) {
		for (let j = 0; j < shades; j++) {
			for (let k = 0; k < shades; k++) {
				this.colours.push([
					round(cStep / 2) + i * cStep,
					round(cStep / 2) + j * cStep,
					round(cStep / 2) + k * cStep,
					255])
			}
		}
	}

	//make the start colour be black
	this.selectedColourID = "0-0-0-255-"; ///black
	this.selectedColourData = [0, 0, 0, 255] //(IN USE in sketch.js!!!!)// array of 4 values representing RGBA colours
	var self = this;
	let c;


	let colourSelectedBorder = "6px solid red"

	var colourClick = function () {
		//remove the old border
		var current = select("#" + self.selectedColourID + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element

		let c = this.id().split("Swatch")[0]; //removing "Swatch" from the selected colour ID
		console.log(this.id(), ' :this.id')
		//set the selected colour and fill and stroke
		self.selectedColourID = c;
		///extracting RGBa values of the selected colour and assaining it to fill and stroke to be used for some of the tools
		for (let i = 0; i < colours_exteded.length; i++) {
			if (colours_exteded[i][0] == this.id()) {
				arCol = colours_exteded[i][1]
				c = color(arCol[0], arCol[1], arCol[2], arCol[3],)
			}
		}
		/// fill and stroke for other tools
		fill(c);
		stroke(c);

		//add a new border to the selected colour
		this.style("border", colourSelectedBorder);

		//searching for a 4 values array (RGBA) based on selected colourID 
		for (let i = 0; i < colours_exteded.length; i++) {
			if (this.id() == colours_exteded[i][0]) {
				//when match between colourID clicked on the palette matches the one in the array, the RGBA array with 4 values is assigned to be used by toolbox tools
				self.selectedColourData = colours_exteded[i][1]

			}
		}
	}

	//load in the colours
	this.loadColours = function () {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {

			//getting colour ID 
			if (typeof this.colours[i] == "string") {
				var colourID = this.colours[i] + "Swatch";
				colorRGBA = this.colours[i];
			}
			else {
				//converting colour array into the string				
				colorRGBA = this.colours[i]
				let rgbAstring = ''
				for (let j = 0; j < this.colours[i].length; j++) {
					rgbAstring += colorRGBA[j] + "-"
				}
				var colourID = rgbAstring + "Swatch";

			}
			//using p5.dom add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			if (typeof this.colours[i] == "string") {
				select("#" + colourID).style("background-color", this.colours[i]);

			}
			else {
				select("#" + colourID).style("background-color", str(color(colorRGBA[0], colorRGBA[1], colorRGBA[2], colorRGBA[3])));
			}
			colours_exteded.push([colourID, colorRGBA])
			colourSwatch.mouseClicked(colourClick)
			select(".colourSwatches").style("border", colourSelectedBorder);
		}
	};
	//call the loadColours function now it is declared
	this.loadColours();


}