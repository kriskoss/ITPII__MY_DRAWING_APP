function TwisterTool(c, undoArray, undoData) {
    this.name = "Twister"
    this.icon = 'assets/twister.jpg';


    let controlers, vectors, trace, mu = 1, multis, ro, initial_random_rot_and_mul, vec;

    ////UNDO REDO
    let pixelsReadyToStore = false;
    let mouseReleasedInPreviousFrame = false
    let drawingInPreviousFrame = false;
    let presets_Active;
    let preset_value = 'random'
    let self = this;
    let armCtls;
    let rot_step;
    let len_step;
    let preset_buttons;


    let firstArm = false; // sets if 1st arm of the mechanizm leaves trace
    let signsStyles = {
        legend: {
            font: 'font-family: "Lucida Console", "Courier New", monospace;',
            size: 'font-size: 18px'
        },
        buttons: {
            size: 'font-size: 23px',
            font: 'font-family: "Lucida Console", "Courier New", monospace;',
            redBG: ('background-color:' + color(10, 10, 30, 150)),
            greenBG: ('background-color:' + color(220, 250, 220, 150))
        }

    }

    let finish = function (undoCount, msg) { //uC
        undoCount = finishHelper(pixelsReadyToStore, self, undoData, undoArray, undoCount, msg) //uC
        return undoCount //uC
    }

    this.return_pixels = function () {
    }

    this.unselectTool = function () {
        updatePixels()
        pop()//P1-end
        select(".options").html("");

    }
    ////

    push() //P1-start

    this.setup = function () {

        //initializing arrays        
        multis = [];
        ro = [];
        controlers = []
        // creating containter for EDIT options

        //Draw TRACE at START
        trace = true

        //VECTORS PARAMETERS:
        vec = {
            num: floor(random(3, 6)),             //NUMBER OF VECTORS
            V1_rot_spd_min: -4,
            V1_rot_spd_max: 4,
            V1_rot_len_min: 10,
            V1_rot_len_max: 20,
            min_rot_spd: -2,  //VECTORS ROTATION SPEED
            max_rot_spd: 2,
            min_len: 20,        //VECTOR LENGTH
            max_len: 31,
            dotSize: 4,

            no_stroke: true,
            stroke_weight: 0,
            trace_transparency: 100,
            transparency_change: 30, ///experimental
            size_change: 0
        }
        // ROTATOION AND LENGTS STEPS
        rot_step = 2
        len_step = 5

        //ADDING FIRST VECTOR
        creatingVectors()


        addOptionControls()
        loadPixels() //L1 - storing pixels before anything drawn by TWISTER tool
    }

    this.draw = function (undoCount, selectedColourData) {
        //Extracting valuses of slider positions
        if (frameCount % 6 == 0) {
            ///updates the MECHANIZM button
            if (trace) {
                // mechanismButton.style(signsStyles.buttons.redBG)
                mechanismButton.class("depressedButton")
            }
            else {


                mechanismButton.class("pressedButton")
            }
            //UPDATES ARMS BUTTONS            
            for (let i = 0; i < vectors.length; i++) {

                let v = vectors[i]
                //Styling the fonts of the buttons
                armCtls.buttons[i].style(signsStyles.buttons.font);
                armCtls.buttons[i].style(signsStyles.buttons.size);

                //Buttons signs logic and background colour change logic
                if (v.switch == true) {
                    armCtls.buttons[i].html((i + 1).toString() + ') L:')
                    armCtls.buttons[i].style(signsStyles.buttons.greenBG)
                }
                else {
                    armCtls.buttons[i].html((i + 1).toString() + ') L:')
                    armCtls.buttons[i].style(signsStyles.buttons.redBG)
                }

                if (v.magn != undefined) {

                    armCtls.buttons[i].html((v.init_mul + v.m).toFixed(0) + ', R:', true)
                    armCtls.buttons[i].html((v.init_rot + v.r).toFixed(0), true)
                }
                else { armCtls.buttons[i].html(' ',) }
            }
            //UPDATING PRESETS BUTTONS
            for (let i = 0; i < preset_buttons.length; i++) {
                let preset_name = Object.keys(presets)[i]
                if (preset_name == preset_value) {
                    preset_buttons[i].style(signsStyles.buttons.greenBG)
                }

            }
            //UPDATING RANDOM BUTON
            if (preset_value == 'random (R)') {
                randomButton.style(signsStyles.buttons.greenBG)
            }


        }
        if ((mousePressOnCanvas(c) && mouseIsPressed || mouseReleasedInPreviousFrame)) {
            pixelsReadyToStore = true;
            drawingInPreviousFrame = true;
            if (trace == false) {
                updatePixels()
            }

            push()
            translate(mouseX, mouseY);

            for (let i = 0; i < vectors.length; i++) {
                let vData = vectors[i]

                //TRACE STORKE
                if (vec.no_stroke) {
                    noStroke()
                }
                //TRACE FILL COLOR            
                // fill(vData.colR, vData.colG, vData.colB, vec.trace_transparency + (i * vec.transparency_change))
                fill(selectedColourData[0], selectedColourData[1], selectedColourData[2], vec.trace_transparency + (i * vec.transparency_change))

                if (i > 0) {
                    let vminus = vectors[i - 1]
                    translate(vminus.mu_coord.x, vminus.mu_coord.y)
                }
                vData.draw()
            }
            pop();
            if (mouseReleasedInPreviousFrame) {
                mouseReleasedInPreviousFrame = false;
                drawingInPreviousFrame = false;
                if (trace == false) {
                    updatePixels()
                }
                loadPixels()

                undoCount = finish(undoCount, 'Twister Tool')//uC
                pixelsReadyToStore = false;

            }
        }
        else if (drawingInPreviousFrame) {
            // giving one time access to the draw part to enabe the UNDO/REDO functionality                         
            drawingInPreviousFrame = false;
            mouseReleasedInPreviousFrame = true;
        }

        //UNDO/REDO functionlaity
        return undoCount;


    }

    let newVector = function (init_array, i, trace_switch) {
        rot = init_array[0];
        mul = init_array[1];
        let v = createVector(1, 0);
        let prev = {
            x: [],
            y: []
        }

        controlers.push(false)
        multis.push(1);
        ro.push(1)
        let vData = {

            switch: trace_switch,  // vector visible or not imiediatel after initialization
            colR: random(50, 200),
            colG: random(60, 200),
            colB: random(70, 200),
            coord: p5.Vector.mult(v, mul),
            m: 0,
            r: 0,
            init_rot: rot,
            init_mul: mul,
            magn: undefined,
            draw: function () {
                this.coord.rotate(this.init_rot + this.r)
                strokeWeight(vec.stroke_weight);


                // if (i == 1) { console.log(v.x, v.y, prev.x, prev.y) }


                // if (prev.x.length > 30) {
                //     push()
                //     stroke('red')
                //     strokeWeight(1)
                //     line(prev.x[0], prev.y[0], prev.x[30], prev.y[30])
                //     pop()
                // }

                // if (prev.x.length > 30) {
                //     prev.x.splice(0, 1)
                //     prev.y.splice(0, 1)

                // }
                // prev.x.push(v.x)
                // prev.y.push(v.y)

                v = p5.Vector.mult(this.coord, 1 + this.m / this.coord.mag());



                this.magn = v.mag()

                if (trace == true) {
                    if (this.switch) {
                        ellipse(v.x, v.y, vec.dotSize + i * vec.size_change)

                    }
                }
                else {
                    strokeWeight(4)
                    stroke(this.colR, this.colG, this.colB)
                    line(0, 0, v.x, v.y)
                }
                this.mu_coord = v
            },
        }
        return vData

    }

    this.keyPressed = function () {


        for (let i = 0; i < vectors.length; i++) {
            if (key == (i + 1).toString()) {
                vectors[i].switch = !vectors[i].switch
            }
            // if (key == 'N') {
            //     vectors[i].coord.normalize()
            //     vectors[i].coord = p5.Vector.mult(vectors[i].coord, 15)
            // }

            if (key == 'R') {
                randomArms()
            }
        }

        // switching all switches to false
        if (key == 'O') {
            for (let i = 0; i < vectors.length; i++)
                vectors[i].switch = false
        }
        if (key == 'P') {
            for (let i = 0; i < vectors.length; i++)
                vectors[i].switch = true
        }

        // adding ekstra vector up to max number
        if (key == 'Q' && controlers.length < 9) {
            // vectors.push(newVector([20, 2], 2, false));

        }
        // pressing Enter clears trace
        if (key == '\r') {
            updatePixels()
        }
        // swithcng between trace view and vectors view
        if (key == 'T') {
            trace = !trace
        }

        // changing rate of rotation and vector length
        for (let i = 0; i < vectors.length; i++) {
            if (vectors[i].switch == true) {
                if (keyCode == 38) { //UP ARROW
                    vectors[i].m += len_step
                }
                if (keyCode == 40) { //DOWN ARROW
                    vectors[i].m += -len_step
                }
                if (keyCode == 37) {//LEFT ARROW
                    vectors[i].r += -rot_step
                }
                if (keyCode == 39) { //RIGHT ARROW
                    vectors[i].r += rot_step
                }
            }
        }
    }

    this.populateOptions = function () {
        //##CREATING BUTTONS AND OTHER CONTROLS
        // addOptionControls()

        //###CLICK HANDLERS###
        // addClickHandlers()
    }

    self = this;
    let addOptionControls = function () {
        // select(".box options").html('<div id="editOptionsDiv">Options</div>')// creating containter for EDIT options
        select(".options").html('Presets:')

        optionsDiv = select(".options");
        optionsDiv.style(signsStyles.legend.size)
        optionsDiv.style(signsStyles.legend.font)

        ///PRESETS CONTROLS
        mechanismButton = createButton()
        mechanismButton.parent(optionsDiv);
        mechanismButton.class("twisterButtons")
        mechanismButton.html('SHOW MECHANISM (T)')
        mechanismButton.mouseClicked(function () {
            trace = !trace
        })


        randomButton = createButton('RANDOM (R)')
        randomButton.parent(optionsDiv);
        randomButton.class("twisterButtons")
        randomButton.mouseClicked(function () {
            randomArms()
        })
        ///CREATEIN PRESSET BUTTONS        
        preset_buttons = []
        for (let i = 0; i < Object.keys(presets).length; i++) {
            let preset_name = Object.keys(presets)[i]
            preset_buttons.push(createButton(presets[preset_name].name))
            preset_buttons[i].parent(optionsDiv);
            preset_buttons[i].class("twisterButtons");
            preset_buttons[i].mouseClicked(function () {

                presets_Active = true;
                preset_value = preset_name
                console.log(preset_name, presets[preset_name].name, presets_Active)
                noButtons = true;
                creatingVectors()
                addOptionControls()
                skip_line = true


            })

        }

        buttonsDiv = createDiv('')
        buttonsDiv.parent(optionsDiv)
        let digitsString = ''
        for (let i = 0; i < vectors.length; i++) {
            digitsString += i + 1
            if (i < vec.num - 1) {
                digitsString += ', '
            }
            else if (i == vectors.length - 2) {
                digitsString += ' or '
            }
        }

        legendDiv = createDiv("press: ARROW UP/DOWN or LEFT/RIGHT to change arms length/rotation speed <br> press " + digitsString + " to stop drawing selected arms trace - this also deactivates modification of its length and rotation speed when arrows are used")
        legendDiv.style(signsStyles.legend.font)
        legendDiv.style(signsStyles.legend.size)
        legendDiv.parent(optionsDiv)

        armCtls = {

            buttons: []
        }

        //Creating control sliders
        for (let i = 0; i < vectors.length; i++) {
            armCtls.buttons.push(createButton(''))
            armCtls.buttons[i].parent(buttonsDiv)
            armCtls.buttons[i].html('')
            armCtls.buttons[i].style(signsStyles.buttons.redBG)
            armCtls.buttons[i].mouseClicked(function () {
                vectors[i].switch = !vectors[i].switch
            })
        }



    }
    let presets = {
        A: {
            name: 'triangle',
            armsNum: 4,
            lens: [20, 20, 20, 20],
            rots: [8, -4, -4, -4],
            switches: [false, true, true, true]
        },
        B: {
            name: 'saturn',
            armsNum: 7,
            lens: [16, 12, 10, 25, 15, 35, 7],
            rots: [4, 4, 4, -4, 4, -4, -4],
            switches: [true, true, true, false, false, true, true]
        },
        C: {
            name: 'flower',
            armsNum: 2,
            lens: [20, 20,],
            rots: [8, -2,],
            switches: [false, true]
        },
        D: {
            name: 'star',
            armsNum: 3,
            lens: [30, 30, 20],
            rots: [4, -6, 4,],
            switches: [false, false, true]
        },
        E: {
            name: 'spiral',
            armsNum: 6,
            lens: [8, 8, 8, 8, 8, 8],
            rots: [4, 5, 6, 7, 8, 9],
            switches: [true, true, true, true, true, true, true]
        },
        D: {
            name: '5-edges',
            armsNum: 7,
            lens: [8, 8, 8, 8, 8, 8, 8,],
            rots: [8, -2, -2, -2, -2, -2, -2,],
            switches: [false, false, true, true, true, true, true, true,]
        },
        E: {
            name: 'symbol 1',
            armsNum: 6,
            lens: [20, 20, 20, 20, 20, 20,],
            rots: [4, -2, -8, 0, 4, -2],
            switches: [false, false, false, true, true, true]
        },
        F: {
            name: 'symbol 2',
            armsNum: 4,
            lens: [20, 15, 20, 15],
            rots: [6, -2, -2, -2,],
            switches: [false, true, true, true]
        },
        G: {
            name: 'propeller',
            armsNum: 5,
            lens: [15, 20, 25, 25, 30],
            rots: [8, 0, 2, -4, 2,],
            switches: [false, true, false, true, true]
        },
    }
    let loadPresets = function (preset) {
        //Lads data from preset values
        for (let i = 0; i < presets[preset].armsNum; i++) {
            vectors.push(newVector([presets[preset].rots[i], presets[preset].lens[i]], i, presets[preset].switches[i]))
        }
    }
    let creatingVectors = function () {
        vectors = [];

        if (!presets_Active) {
            initV1 = {
                rot: (ceil(random(vec.V1_rot_len_min, vec.V1_rot_spd_max) / rot_step)) * rot_step, // 1st VECTOR ROTATION SPEEDL: 
                len: (ceil(random(vec.V1_rot_len_min, vec.V1_rot_len_max) / len_step)) * len_step // 1st VECTOR LENGTH
            }

            vectors.push(newVector([initV1.rot, initV1.len], 1, firstArm))

            //ADDING REMAINING VECTORS
            for (let i = 0; i < vec.num; i++) {
                //generating random rotation speed and vector length
                randVec = {
                    rot: (floor(random(vec.min_rot_spd, vec.max_rot_spd))) * rot_step, //VECTORs ROTATION SPEED
                    len: (floor(random(vec.min_len, vec.max_len) / len_step)) * len_step //VECTORs LENGTH
                }
                //pushing new vector to vectors array with generated rotation speed and length
                vectors.push(newVector([randVec.rot, randVec.len], i, true))
            }
        }
        else {
            loadPresets(preset_value)
        }
    }
    let randomArms = function () {
        presets_Active = false;
        preset_value = 'random'
        creatingVectors()
        addOptionControls()

    }
}
