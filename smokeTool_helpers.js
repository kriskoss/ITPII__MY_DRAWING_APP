this.interpolateRandom = function (randData, stepsNum, randRange) {
    //IN USE - particle.js	
    //Generates random numbers - however the swithch between numbers takes specific number of frames and valuses between two random numbers is being interpolated

    ///Sets the fitst array to contain only zeros         
    if (randData.firstFlag) {
        randData.rArray = []
        for (let i = 0; i < stepsNum; i++) {
            randData.rArray.push(0)
        }
        randData.firstFlag = false
    }

    ///once every specific number of frames - new array is being created by mapping values in between two random numbers
    if (frameCount % stepsNum == 0) {
        randData.rFrom = randData.rTo
        randData.rTo = (random(-randRange, randRange))

        randData.rArray = []
        for (let i = 0; i < stepsNum; i++) {
            randData.rArray.push((map(i, 0, stepsNum, randData.rFrom, randData.rTo)))
        }

        randData.output = randData.rArray[0]
        // console.log(randData.output)
    }
    else {
        randData.output = randData.rArray[frameCount % stepsNum]

    }
    // console.log(randData.output)
    return randData
}


this.mapFunction = function (yFactor, functData, progress) {
    //INPUT: progress - values along x-axis (0-100), 
    //INPUT: fData - array of values along y-axis at equal x intervals
    //OUTPUT: output - f(x) - mapped value of y depending on x
    let output
    let timePart = 1 / (functData.length - 1)

    for (let i = 0; i < functData.length - 1; i++) {
        if (progress >= timePart * i && progress < timePart * (i + 1)) {
            output = map(progress * 0.99, timePart * i, timePart * (i + 1), functData[i], functData[i + 1])
        }
    }
    return output * yFactor
}

this.drawFunction = function (textDescription, tXdisp, tYdisp, _factor, _fData, lineColor, x_range, y_factor, _progress) {
    //IN USE in particle.jez
    /// DRAWS FUNCTION GRAPH to visalise the change of particle parameters        

    push()
    //moves whole function diagram on the right side of the canvas        
    if (mouseX < x_range) {
        translate(width - x_range - 150, 0)
    }
    translate(0, -0.1 * height)
    //draws a function graph        
    push()
    stroke(lineColor)
    strokeWeight(3)
    noFill()
    beginShape()
    for (let x = 0; x < 100; x++) {
        let y = mapFunction(_factor, _fData, x / 100,)
        vertex(x / 100 * x_range, height - y * y_factor,)
    }
    endShape()

    //draws moving point along function graph reflecting the age of the sampleParticle
    push()
    stroke('red')
    ellipse(_progress * x_range, height - mapFunction(_factor, _fData, _progress) * y_factor, 5, 5)
    pop()



    //drawing function graph area border
    strokeWeight(1)
    rect(0, height - 1, x_range, - (max(_fData) * _factor * y_factor))
    //adding description of the functon graph
    textSize(18)
    noStroke()
    fill(lineColor)
    text(
        textDescription + "(" + str(min(_fData)) + "-" + str(max(_fData)) + ")",
        tXdisp + x_range / (_fData.length - 1) * round((_fData.length - 1) / 2),
        -tYdisp + 18 + height - _fData[round((_fData.length - 1) / 2)] * _factor * y_factor)
    pop()
    pop()
}
////- store the funct in the presets for teach color chanell (RGBA) and also other particle parameterrs
/// - set switch to show the funct lines for each parameter - also highlight a particle for which marker is moving ath the lines - marker can be vertical line}

this.addMissingDefaultPresetsInCurrentPreset = function (defaultPreset, currentPreset) {

    //IN USE in smoke_tool.js
    //compares defaultPresets with currentPreset -  if any key-value pair up to 2 levels is missing in the currentPreset then it is being added with default values.
    for (let keyNoL1 = 0; keyNoL1 < Object.keys(defaultPreset).length; keyNoL1++) {
        /// looping through 1st level
        let defaultKeyL1 = Object.keys(defaultPreset)[keyNoL1] //L1 - Level 1
        let addKey = true
        let currentKey = 'no key'
        for (let j = 0; j < Object.keys(currentPreset).length; j++) {
            currentKey = Object.keys(currentPreset)[j]
            if (currentKey == defaultKeyL1) {
                addKey = false;
            }
        }
        if (addKey) {
            // console.log('adding:' + defaultKeyL1)
            currentPreset[defaultKeyL1] = {}
        }
        //Checking default keys at level 2
        for (let keyNoL2 = 0; keyNoL2 < Object.keys(defaultPreset[defaultKeyL1]).length; keyNoL2++) {

            let defaultKey2 = Object.keys(defaultPreset[defaultKeyL1])[keyNoL2]
            let currentKey2 = 'no key2'
            let addKeyL2 = true;
            for (let crntKno_L2 = 0; crntKno_L2 < Object.keys(defaultPreset[defaultKeyL1]).length; crntKno_L2++) {
                currentKey2 = Object.keys(currentPreset[defaultKeyL1])[crntKno_L2]
                // console.log(defaultKeyL1, defaultKey2)
                if (defaultKey2 == currentKey2) {
                    addKeyL2 = false

                }
            }

            if (addKeyL2) {

                currentPreset[defaultKeyL1][defaultKey2] = defaultPreset[defaultKeyL1][defaultKey2]
                // console.log(" to >>" + defaultKeyL1 + '<< adding: ' + defaultKey2 + " = " + currentPreset[defaultKeyL1][defaultKey2])

            }
        }
    }
    return currentPreset
}

this.updatePresetButtons = function (particlePresets, initPresetName) {
    //highlight the button which preset is active    
    for (let i = 0; i < Object.keys(particlePresets).length; i++) {
        let preset_name = Object.keys(particlePresets)[i]

        if (preset_name == initPresetName) {
            presetsCtrls.buttons[i].style('background-color:' + color(90, 230, 90, 150))

        }
    }
}