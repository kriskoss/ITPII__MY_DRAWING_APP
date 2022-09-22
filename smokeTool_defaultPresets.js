///IN USE!! - DEFAULT PRESETS for the smokeTool
let defaultPreset = {
    emitter: {
        p_max_num: 10000,
        smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
        trailOpacityFactor: 50,
        //constants
        drawEllipses: false,
        drawLines: true,
        p_windEffectMin: 1,
        p_windEffectMax: 1,
        windXperiod: 100,
        windYperiod: 100,
        spdXwalkPeriod: 10,
        spdYwalkPeriod: 10,
        gustsXRange: 0,
        gustsYRange: 0,
        RRperiod: 60,
        GGperiod: 60,
        BBperiod: 60,

    },
    slidersInit: {
        emitter_width: 10,
        emitter_height: 10,
        p_xSpeed: 0, // SPEED affects only initial speed of the particle
        p_ySpeed: 0,
        xSpread: 3,
        ySpread: 3,
        p_size: 20,
        p_sizeVariability: 50,//[%]
        p_lifetime: 40,
        p_lifetimeVariability: 50, //[%]
        p_per_frame: 1,


    },
    envrioment: {
        wind: {
            spd_x: 0,//WIND affects also the particles which exist already
            spd_y: 0,
            ////CAUTION ! - DO NOT ADD ANYTHING MORE TO THE wind:!!
        },
        gravity: 0
    },
    mapProfiles: {
        fSize: [1, 1],

        fRR: [1, 1],
        fGG: [1, 1],
        fBB: [1, 1],
        fAA: [1, 1],

        fXspeed: [1, 1],
        fYspeed: [1, 1],
        fGravity: [1, 1],

        fTrailSize: [1, 1],
        fTrailOpacity: [1, 1],

    },
    walkMaps: {
        spdX: [0, 0],
        spdY: [0, 0],
        RRrange: [0, 0],
        GGrange: [0, 0],
        BBrange: [0, 0],

    },

    totalCtrl: {
        fBB: false,
        fRR: false,
        fGG: false,
        fAA: false,
    }

}