//     ///IN USE!! - PRESETS for the smokeTool
let particlePresets = {

    spray: {
        emitter: {
            p_max_num: 1000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 30,
            drawEllipses: true,
            drawLines: false,
        },
        slidersInit: {
            emitter_width: 40,
            emitter_height: 40,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 0,
            xSpread: 0,
            ySpread: 0,
            p_size: 30,
            p_sizeVariability: 50,//[%]
            //
            p_lifetime: 10,
            p_lifetimeVariability: 0, //[%]
            p_per_frame: 1,
        },

        mapProfiles: {
            fSize: [0, 0],

            fRR: [1, 1],
            fGG: [1, 1],
            fBB: [1, 1],
            fAA: [1, 1],

            fXspeed: [1, 1],
            fYspeed: [1, 1],
            fGravity: [1, 1],

            fTrailSize: [1, 0],
            fTrailOpacity: [0, 0.1],
        }

    },
    paint: {
        emitter: {
            p_max_num: 1000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 40,
            drawEllipses: true,
            drawLines: false,
            spdXwalkPeriod: 30,
            spdYwalkPeriod: 20,
        },
        slidersInit: {
            emitter_width: 40,
            emitter_height: 40,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: -0.1,
            xSpread: 0,
            ySpread: 0.06,
            p_size: 10,
            p_sizeVariability: 150,//[%]
            //
            p_lifetime: 50,
            p_lifetimeVariability: 150, //[%]
            p_per_frame: 1,
        },
        envrioment: {

            gravity: 0.01
        },

        walkMaps: {
            spdX: [0.1, 0.1, 0.1],
            spdY: [0, 0.5],
        },
        mapProfiles: {
            fSize: [0, 0],

            fRR: [1, 1],
            fGG: [1, 1],
            fBB: [1, 1],
            fAA: [1, 1, 0.4, 0.8],

            fXspeed: [0.1, 0.1, 0.1, 0],
            fYspeed: [0.3, 0.2, 0.2, 0.1, 0.0],
            fGravity: [1, 0.5, 0],

            fTrailSize: [1, 1.3, 1.4, 0.5],
            fTrailOpacity: [1, 0.1],
        }

    },
    squares: {
        emitter: {
            p_max_num: 1000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 1,
            //constants
            drawEllipses: false,
            drawLines: true,
            p_windEffectMin: 0.1,
            p_windEffectMax: 1,
            windXperiod: 25,
            windYperiod: 40,
            spdXwalkPeriod: 14,
            spdYwalkPeriod: 10,
            gustsXRange: 0,
            gustsYRange: 0,
            RRperiod: 10,
            GGperiod: 17,
            BBperiod: 22,

        },
        slidersInit: {
            emitter_width: 30,
            emitter_height: 30,
            p_xSpeed: 1, // SPEED affects only initial speed of the particle
            p_ySpeed: 1,
            xSpread: 1,
            ySpread: 1,
            p_size: 2,
            p_sizeVariability: 150,//[%]
            p_lifetime: 20,
            p_lifetimeVariability: 150, //[%]
            p_per_frame: 2,


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
            fBB: [100, 200],
            fAA: [0, 0.3, 0.2, 0.1],

            fXspeed: [0, 2, 0, -2, 0, 2],
            fYspeed: [2, 0, -2, 0, 2, 0],
            fGravity: [1, 0, -1, 1],

            fTrailSize: [0, 1, 1, 0.5, 0.2],
            // fTrailOpacity: [0, 1, 0.7, 0.5, 0.2],

        },
        walkMaps: {
            spdX: [0.3, 0, 0.6, 0],
            spdY: [0, 0.6, 0],
            RRrange: [100, 80, 100],
            GGrange: [80, 103, 40],
            BBrange: [100, 100, 100],

        },

        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,
            fAA: false,
        }
    },
    particles: {
        emitter: {
            p_max_num: 1000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 30,
        },
        slidersInit: {
            emitter_width: 40,
            emitter_height: 40,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 0,
            xSpread: 3,
            ySpread: 3,
            p_size: 20,
            p_sizeVariability: 50,//[%]
            //
            p_lifetime: 40,
            p_lifetimeVariability: 50, //[%]
            p_per_frame: 1,
        },

        envrioment: {
            wind: {
                spd_x: 0,//WIND affects also the particles which exist already
                spd_y: 0,

            },
            gravity: 0
        },
        mapProfiles: {
            fSize: [1, 1.07, 1.2, 1.4, 1.7, 2.1, 2.6, 3.2, 3.9, 4.8],

            fRR: [1, 0.9, 0, 1, 0.8, 0.1],
            fGG: [1, 0, 0.4, 0.5, 0.0, 0.3],
            fBB: [1, 1, 1, 0.5, 0.8, 1],
            fAA: [0, 0.9, 0.8, 1, 0.94, 0.82, 0.63, 0.3, 0.1, 0, 0, 0],

            fXspeed: [1, 1.1, 0.7, 0.2, 0, -0.5, -1.2, -1.6],
            fYspeed: [1, 0.9, 0.6, 0.4, 0.2, 0.4],
            fGravity: [1, 0.9, 0.4, 0.2, 0.1, 0],

            fWalk: [0, 0.3, 0.9, 1.7],

            fTrailSize: [0, 0.8, 1, 1, 1.8, 1.6, 1.4, 1.2],
            fAA: [0, 0.9, 0.8, 1, 0.94, 0.82, 0.63, 0.3, 0.1, 0, 0, 0],
        },
        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,
        }
    },

    fire: {
        emitter: {
            p_max_num: 10000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 10,
            gustsXRange: 1,
            gustsYRange: 0.3,
        },

        slidersInit: {
            emitter_width: 4,
            emitter_height: 4,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 4,
            xSpread: 1,
            ySpread: 2,
            p_size: 3,
            p_sizeVariability: 50,//[%]

            p_lifetime: 7,
            p_lifetimeVariability: 80, //[%]
            p_per_frame: 100,
        },
        envrioment: {
            wind: {
                spd_x: 1,//WIND affects also the particles which exist already
                spd_y: 0.3,


            },
            gravity: 0

        },
        mapProfiles: {
            fSize: [1, 1.07, 1.2, 1.4, 1.7, 2.1, 2.6, 3.2, 3.9, 4.8],

            fRR: [1, 0.9, 0.6,],
            fGG: [0.55, 0],
            fBB: [0, 0, 1, 0.5, 0.3, 0],
            fAA: [0.6, 0.3, 0],

            fXspeed: [1, 1.1, 0.7, 0.2, 0, -0.5, -1.2, -1.6],
            fYspeed: [1, 1],
            fGravity: [1, 0.9, 0.4, 0.2, 0.1, 0],

            fTrailSize: [0, 0.8, 1, 1, 1.8, 1.6, 1.4, 1.2],


        },
        totalCtrl: {
            fBB: true,
            fRR: true,
            fGG: true,

        }
    },
    star: {
        emitter: {
            p_max_num: 100,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 5

        },

        slidersInit: {
            emitter_width: 0,
            emitter_height: 0,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 0,
            xSpread: 5,
            ySpread: 5,
            p_size: 10,
            p_sizeVariability: 50,//[%]

            p_lifetime: 20,
            p_lifetimeVariability: 50, //[%]
            p_per_frame: 100,
        },

        envrioment: {
            wind: {
                spd_x: 0,//WIND affects also the particles which exist already
                spd_y: 0,
            },
            gravity: 0
        },
        mapProfiles: {
            fSize: [0.1, 0.2, 0.9, 1, 0.8, 0.5, 0],

            fRR: [1, 1],
            fGG: [1, 1, 0],
            fBB: [1, 1, 0.5],
            fAA: [0, 0.7, 1, 0],

            fXspeed: [1, 1],
            fYspeed: [1, 1],
            fGravity: [1, 1],

            fTrailSize: [1, 1],

        },
        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,

        }
    },

    fireworks: {
        emitter: {
            p_max_num: 100,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 60,
            RRperiod: 8,
            GGperiod: 6,
            BBperiod: 12,

        },

        slidersInit: {
            emitter_width: 0,
            emitter_height: 0,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 3,
            xSpread: 3,
            ySpread: 3,
            p_size: 10,
            p_sizeVariability: 50,//[%]

            p_lifetime: 30,
            p_lifetimeVariability: 80, //[%]
            p_per_frame: 100,
        },

        envrioment: {
            wind: {
                spd_x: 0,//WIND affects also the particles which exist already
                spd_y: 0
            },
            gravity: 0.2
        },
        mapProfiles: {
            fSize: [0.0, 0.0, 0.1, 0.9, 1, 1.2, 1.5,],
            fTrailSize: [0.0, 0, 0, 0.9, 1, 1.28, 1.5,],
            fRR: [1, 0.6, 1, 0.5, 1],
            fGG: [1, 0, 1],
            fBB: [1, 1, 0.5],
            fAA: [0, 0.1, 1, 1, 0],

            fTrailOpacity: [0.1, 1, 1, 1],

            fXspeed: [2, 1, 1, 1, 1],
            fYspeed: [2, 1, 1, 0.9, 0.7],
            fGravity: [1, 1],



        },

        walkMaps: {
            spdX: [0, 0],
            spdY: [0, 0],
            RRrange: [100, 110, 0],
            GGrange: [100, 110, 0],
            BBrange: [200, 110, 0],

        },
        totalCtrl: {
            fBB: false,
            fRR: true,
            fGG: false,

        }
    },


    H_spray: {
        emitter: {
            p_max_num: 30000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 3
        },

        slidersInit: {
            emitter_width: 10,
            emitter_height: 10,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 0,
            xSpread: 4,
            ySpread: 0.2,
            p_size: 2,
            p_sizeVariability: 50,//[%]

            p_lifetime: 15,
            p_lifetimeVariability: 50, //[%]
            p_per_frame: 30,
        },

        envrioment: {
            wind: {
                spd_x: 0,//WIND affects also the particles which exist already
                spd_y: 0
            },
            gravity: 0.0
        },
        mapProfiles: {
            fSize: [1, 1, 1, 0.9, 0.7, 0.2],
            fTrailSize: [0, 0.2, 1, 0.9, 0.7, 0.2],
            fRR: [1, 2],
            fGG: [1, 2],
            fBB: [1, 1, 3],
            fAA: [0, 0.2, 0.3, 1, 0.5, 0],

            fXspeed: [1, 1],
            fYspeed: [1, 1],
            fGravity: [1, 1],
        },

        walkMaps: {
            spdX: [0, 0],
            spdY: [0, 0, 1],


        },

        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,

        }
    },

    smoke: {
        emitter: {
            p_max_num: 30000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 10,

            p_windEffectMin: 0.2,
            p_windEffectMax: 1.3,
            spdXwalkPeriod: 10,
            spdYwalkPeriod: 8,
            gustsXRange: 1,
            gustsYRange: 0.3,
            windXperiod: 40,
            windYperiod: 40,

        },

        slidersInit: {
            emitter_width: 10,
            emitter_height: 10,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 3,
            xSpread: 1,
            ySpread: 0.5,
            p_size: 10,
            p_sizeVariability: 50,//[%]

            p_lifetime: 30,
            p_lifetimeVariability: 50, //[%]
            p_per_frame: 10,
        },

        envrioment: {
            wind: {
                spd_x: 2,//WIND affects also the particles which exist already
                spd_y: 1,

            },
            gravity: 0.0
        },
        mapProfiles: {
            fSize: [0, 0],
            fTrailSize: [1, 1, 1, 0.9, 0.7, 0.2],
            fRR: [1, 1],
            fGG: [1, 1],
            fBB: [1, 1],
            fAA: [0, 0.2, 0.3, 0.6, 0.5, 0],

            fXspeed: [1, 0.6, 0.2, 0, -0.4, -0.6],
            fYspeed: [1, 1],
            fGravity: [1, 1],
        },
        walkMaps: {
            spdX: [0, 0, 1, 3],
            spdY: [0, 1, 2],

        },
        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,

        }
    },

    rays: {
        emitter: {
            p_max_num: 10000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 1

        },

        slidersInit: {
            emitter_width: 0,
            emitter_height: 0,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 0,
            xSpread: 5,
            ySpread: 5,
            p_size: 3,
            p_sizeVariability: 0,//[%]

            p_lifetime: 5,
            p_lifetimeVariability: 300, //[%]
            p_per_frame: 10,
        },

        envrioment: {
            wind: {
                spd_x: 0,//WIND affects also the particles which exist already
                spd_y: 0
            },
            gravity: 0
        },
        mapProfiles: {
            fSize: [0, 1, 1,],
            fTrailSize: [0, 1, 1,],
            fRR: [0, 1, 2],
            fGG: [1, 1, 0],
            fBB: [1, 3, 0.5],
            fAA: [0, 0.7, 1, 0],

            fXspeed: [1, 1],
            fYspeed: [1, 1],
            fGravity: [1, 1],



        },

        walkMaps: {
            spdX: [0, 0, 0, 1, 2, 5, 10],
            spdY: [0, 0, 0, 1, 2, 5, 10],
        },
        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,

        }
    },

    cracks: {
        emitter: {
            p_max_num: 200,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 1,
            spdXwalkPeriod: 1,
            spdYwalkPeriod: 1,
        },

        slidersInit: {
            emitter_width: 80,
            emitter_height: 80,
            p_xSpeed: 0, // SPEED affects only initial speed of the particle
            p_ySpeed: 0,
            xSpread: 3,
            ySpread: 3,
            p_size: 1,
            p_sizeVariability: 0,//[%]

            p_lifetime: 40,
            p_lifetimeVariability: 100, //[%]
            p_per_frame: 2,
        },

        envrioment: {
            wind: {
                spd_x: 0,//WIND affects also the particles which exist already
                spd_y: 0
            },
            gravity: 0.0
        },
        mapProfiles: {
            fSize: [0, 1, 1,],
            fTrailSize: [0, 1, 1,],
            fRR: [0, 1, 2],
            fGG: [1, 1, 100],
            fBB: [1, 3, 200],
            fAA: [0, 0.3, 0.5, 0.5, 0.2, 0.1],

            fXspeed: [1, 0.2, 1, 0.1, 1, 0.05, 0.2, 0.5, 1],
            fYspeed: [1, 0.2, 1, 0.1, 1, 0.05, 0.2, 0.5, 1],
            fGravity: [1, 1],

        },

        walkMaps: {
            spdX: [1, 1, 1, 3, 0.05, 0.05, 1, 0.1, 1],
            spdY: [1, 1, 1, 3, 0.05, 0.05, 1, 0.1, 1],
            RRrange: [0, 100],
            GGrange: [0, 80],
            BBrange: [0, 50],



        },
        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,

        }
    },


    circles: {
        emitter: {
            p_max_num: 1000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 1,
            //constants
            drawEllipses: false,
            drawLines: true,
            p_windEffectMin: 0.1,
            p_windEffectMax: 1,
            windXperiod: 25,
            windYperiod: 40,
            spdXwalkPeriod: 14,
            spdYwalkPeriod: 10,
            gustsXRange: 0,
            gustsYRange: 0,
            RRperiod: 10,
            GGperiod: 17,
            BBperiod: 22,

        },
        slidersInit: {
            emitter_width: 30,
            emitter_height: 30,
            p_xSpeed: 1, // SPEED affects only initial speed of the particle
            p_ySpeed: 1,
            xSpread: 0,
            ySpread: 0,
            p_size: 2,
            p_sizeVariability: 50,//[%]
            p_lifetime: 40,
            p_lifetimeVariability: 150, //[%]
            p_per_frame: 2,


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
            fBB: [100, 200],
            fAA: [0, 0.3, 0.2, 0.1],

            fXspeed: [0, 2, 0, -2, 0, 2],
            fYspeed: [2, 0, -2, 0, 2, 0],
            fGravity: [1, 0, -1, 1],

            fTrailSize: [0, 1, 1, 0.5, 0.2],
            // fTrailOpacity: [0, 1, 0.7, 0.5, 0.2],

        },
        walkMaps: {
            spdX: [0.3, 0, 0.6, 0],
            spdY: [0, 0.6, 0],
            RRrange: [100, 80, 100],
            GGrange: [80, 103, 40],
            BBrange: [100, 100, 100],

        },

        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,
            fAA: false,
        }
    },



    manySs: {
        emitter: {
            p_max_num: 1000,
            smokeTrailFactor: 1, // 1,2,3... Higher the number the leas smoke remains on the canvas
            trailOpacityFactor: 2,
            //constants
            drawEllipses: false,
            drawLines: true,
            p_windEffectMin: 0.1,
            p_windEffectMax: 1,
            windXperiod: 25,
            windYperiod: 40,
            spdXwalkPeriod: 14,
            spdYwalkPeriod: 10,
            gustsXRange: 0,
            gustsYRange: 0,
            RRperiod: 10,
            GGperiod: 17,
            BBperiod: 22,

        },
        slidersInit: {
            emitter_width: 30,
            emitter_height: 30,
            p_xSpeed: 1, // SPEED affects only initial speed of the particle
            p_ySpeed: 1,
            xSpread: 0.2,
            ySpread: 0.2,
            p_size: 2,
            p_sizeVariability: 50,//[%]
            p_lifetime: 30,
            p_lifetimeVariability: 50, //[%]
            p_per_frame: 5,


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
            fAA: [0, 1],

            fXspeed: [-0.5, 2, -2, 2, -2, 2],
            fYspeed: [2, 2, 2, 2, 1, 0],
            fGravity: [1, 0, -1, 1],

            fTrailSize: [0, 1, 1, 0.5, 0.2],
            fTrailOpacity: [0, 1, 1, 0.5, 0.2],

        },
        walkMaps: {
            spdX: [0.3, 0, 0.6, 0],
            spdY: [0, 0.6, 0],
            RRrange: [100, 80, 100],
            GGrange: [80, 103, 40],
            BBrange: [100, 100, 100],

        },

        totalCtrl: {
            fBB: false,
            fRR: false,
            fGG: false,
            fAA: false,
        }
    },


}
