function SmokeTool(c, undoArray, undoData) {
    this.icon = "assets/smokeIcon.png";
    this.name = "Smoke Tool";
    let emit;
    let currentPreset;

    let sliderValue = {}



    //Setting initial preset    

    let initPresetName = 'fire'
    currentPreset = particlePresets[initPresetName]


    let addPresetsButtons = function () {
        presetsCtrls = {
            div: createDiv(),
            label: createSpan('Presets:'),
            buttons: [],
            createButtons: function () {
                //creating containter containing all the particle preset buttons, which parent is options container
                this.label.parent(this.div)

                for (let i = 0; i < Object.keys(particlePresets).length; i++) {
                    let preset_name = Object.keys(particlePresets)[i]
                    this.buttons.push(createButton(preset_name))
                    this.buttons[i].parent(this.div);
                    this.buttons[i].class('SmokeTool_preset_buttons')

                    this.buttons[i].mouseClicked(function () {

                        currentPreset = particlePresets[preset_name]
                        initPresetName = preset_name

                        self.setup()
                    })
                }
                this.div.parent(optionsDiv)

            },

        };
        presetsCtrls.createButtons()
    }

    let addOptionControls = function () {
        select(".box options").html('<div id="editOptionsDiv"></div>')// creating containter for EDIT options

        optionsDiv = select(".box options");

        addPresetsButtons()

        gravityCtrls = {
            div: false,
            label: createSpan('Gravity:'),
            slider: createSlider(-1, 2, currentPreset.envrioment.gravity, 0.01),
            readout: createSpan(),

        }
        p_per_frameCtrls = {
            div: false,
            label: createSpan(' Part.per frame'),
            slider: createSlider(1, 100, currentPreset.slidersInit.p_per_frame, 1),
            readout: createSpan()
        }
        p_sizeCtrls = {
            div: createDiv('Particle:'),
            label: createSpan(' size'),
            sliderSize: createSlider(1, 100, currentPreset.slidersInit.p_size, 1),
            readoutSize: createSpan(''),
            label2: createSpan('Variability:'),
            sliderSizeVariablility: createSlider(0, 400, currentPreset.slidersInit.p_sizeVariability, 10),
            readoutSizeVariability: createSpan(),
        }

        windCtrls = {
            div: createDiv(),
            label: createSpan("Wind X-/Y-axis_____:"),
            sliderX: createSlider(-10, 10, currentPreset.envrioment.wind.spd_x, 0.2),
            readoutX: createSpan(),
            sliderY: createSlider(-10, 10, currentPreset.envrioment.wind.spd_y, 0.2),
            readoutY: createSpan(),
        }

        ///EMITTER sliders
        emitterCtrls = {
            div: createDiv(),
            label: createSpan("Emitter size:W/H___:"),
            sliderW: createSlider(0, 100, currentPreset.slidersInit.emitter_width, 5),
            readoutW: createSpan(),
            sliderH: createSlider(0, 100, currentPreset.slidersInit.emitter_height, 5),
            readoutH: createSpan()
        }


        ///P SPEED sliders
        p_speedCtrls = {
            div: createDiv(),
            label: createSpan("Particle Speed:X/Y_:"),
            sliderX: createSlider(-10, 10, currentPreset.slidersInit.p_xSpeed, 0.1),
            readoutX: createSpan(),
            sliderY: createSlider(-20, 20, currentPreset.slidersInit.p_ySpeed, 0.1),
            readoutY: createSpan(),
        }

        p_spdSpreadCtrls = {
            div: createDiv(),
            label: createSpan("Speed spread:X/Y___:"),
            sliderX: createSlider(0, 30, currentPreset.slidersInit.xSpread, 0.1),
            readoutX: createSpan(),
            sliderY: createSlider(0, 30, currentPreset.slidersInit.ySpread, 0.1),
            readoutY: createSpan(),
        }

        ///LIFETIME sliders
        p_lifetimeCtrls = {
            div: createDiv(),
            label1: createSpan("Particle lifetime__:"),
            sliderLifetime: createSlider(1, 100, currentPreset.slidersInit.p_lifetime, 1),
            readoutLifetime: createSpan(),
            label2: createSpan('Variability:'),
            sliderVariability: createSlider(0, 200, currentPreset.slidersInit.p_lifetimeVariability, 10),
            readoutVariablility: createSpan(),
        }

        //Assigning parrent to each element of the options container
        assignParent(gravityCtrls, optionsDiv);
        assignParent(p_per_frameCtrls, optionsDiv);
        assignParent(p_sizeCtrls, optionsDiv)
        assignParent(windCtrls, optionsDiv);
        assignParent(emitterCtrls, optionsDiv);
        assignParent(p_speedCtrls, optionsDiv);
        assignParent(p_spdSpreadCtrls, optionsDiv);
        assignParent(p_lifetimeCtrls, optionsDiv);


    }

    let assignParent = function (ctrlsObject, _parent) {
        /// assigns a paretnt to the DOM element
        let divNone = false;
        for (let i = 0; i < Object.keys(ctrlsObject).length; i++) {
            let item = Object.keys(ctrlsObject)[i]

            if (item == 'div') {
                if (ctrlsObject.div == false) {
                    //checks if controls containter does not need additional container and flags this if this is the case
                    divNone = true
                }
                else {
                    // if controls need additional container then it is being created within the controls object                    
                    ctrlsObject.div.parent(_parent)
                }
            }

            else {
                /// depends if additinal container was created or not it becomes partent for all other items or the optiions container becomes one
                if (divNone) {
                    ctrlsObject[item].parent(_parent)
                }
                else {
                    ctrlsObject[item].parent(ctrlsObject.div)
                }
            }
        }
    }
    this.populateOptions = function () {
        //##CREATING BUTTONS AND OTHER CONTROLS

        addOptionControls()
    }
    ///HERE CHANGE PARAMETERS OF THE SMOKE - SMOKE SETTINGS///


    this.setup = function () {

        currentPreset = addMissingDefaultPresetsInCurrentPreset(defaultPreset, currentPreset)

        // CREATING EMITTER
        emit = new Emitter(
            currentPreset,
            c,
            undoArray,
            undoData
        );

        //ADDING SMOKE_TOOL OPTIONS
        this.populateOptions()
    }

    this.setup()/// runs setup before controls are added


    this.draw = function (undoCount, selectedColourData) {

        // getting SLIDERS VALUES
        getSlidersValues();

        updatePixels()

        //UPDATING PARTICLES
        undoCount = emit.updateParticles(
            undoCount,
            sliderValue,
            selectedColourData,
        )

        updateSlidersReadout()

        //Highlight active preset button       
        updatePresetButtons(particlePresets, initPresetName)

        return undoCount

    }

    let self = this

    let getSlidersValues = function () {
        sliderValue["x_wind"] = windCtrls.sliderX.value();
        sliderValue["y_wind"] = windCtrls.sliderY.value();
        sliderValue["emitter_width"] = emitterCtrls.sliderW.value();
        sliderValue["emitter_height"] = emitterCtrls.sliderH.value();
        sliderValue["p_xSpdSpread"] = p_spdSpreadCtrls.sliderX.value();
        sliderValue["p_ySpdSpread"] = p_spdSpreadCtrls.sliderY.value();
        sliderValue["p_xSpeed"] = p_speedCtrls.sliderX.value();
        sliderValue["p_ySpeed"] = p_speedCtrls.sliderY.value();
        sliderValue["gravity"] = gravityCtrls.slider.value();
        sliderValue["p_per_frame"] = p_per_frameCtrls.slider.value();
        sliderValue["p_lifetime"] = p_lifetimeCtrls.sliderLifetime.value();
        sliderValue["p_lifetimeVariability"] = p_lifetimeCtrls.sliderVariability.value();
        sliderValue["p_size"] = p_sizeCtrls.sliderSize.value();
        sliderValue["p_sizeVariability"] = p_sizeCtrls.sliderSizeVariablility.value();
    }

    let updateSlidersReadout = function () {
        windCtrls.readoutX.html('(' + nfc(sliderValue.x_wind, 1) + ') ');
        windCtrls.readoutY.html('(' + nfc(sliderValue.y_wind, 1) + ') ');
        emitterCtrls.readoutW.html('(' + nfc(sliderValue.emitter_width, 0) + ') ');
        emitterCtrls.readoutH.html('(' + nfc(sliderValue.emitter_height, 0) + ') ');
        p_spdSpreadCtrls.readoutX.html('(' + nfc(sliderValue.p_xSpdSpread, 1) + ') ');
        p_spdSpreadCtrls.readoutY.html('(' + nfc(sliderValue.p_ySpdSpread, 1) + ') ');
        p_speedCtrls.readoutX.html('(' + nfc(sliderValue.p_xSpeed, 1) + ') ');
        p_speedCtrls.readoutY.html('(' + nfc(sliderValue.p_ySpeed, 1) + ') ');
        gravityCtrls.readout.html('(' + nfc(sliderValue.gravity, 1) + ') ');
        p_per_frameCtrls.readout.html('(' + nfc(sliderValue.p_per_frame, 0) + ') ');
        p_lifetimeCtrls.readoutLifetime.html('(' + nfc(sliderValue.p_lifetime, 0) + ') ');
        p_lifetimeCtrls.readoutVariablility.html('(' + nfc(sliderValue.p_lifetimeVariability, 0) + '%) ');
        p_sizeCtrls.readoutSize.html('(' + nfc(sliderValue.p_size, 0) + ') ');
        p_sizeCtrls.readoutSizeVariability.html('(' + nfc(sliderValue.p_sizeVariability, 0) + '%) ');
    }


    this.return_pixels = function () {
        emit.return_pixels()
    }

    this.unselectTool = function () {
        emit.unselectTool()
        select(".options").html("");
    }

}