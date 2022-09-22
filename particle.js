function Particle(
    currentPreset,
    sliderValue,
    p_initPos,
    selectedColourData,
    sampleParticle,
    transferWalks,
) {

    // Particle function properties
    let mp = currentPreset.mapProfiles;
    let walkMaps = currentPreset.walkMaps;

    let gravity_effect = 0 //simulation of gravity
    let rand_p_InitX = random(-sliderValue.emitter_width, sliderValue.emitter_width)
    let rand_p_InitY = random(-sliderValue.emitter_height, sliderValue.emitter_height)

    this.x = p_initPos.x + rand_p_InitX
    this.y = p_initPos.y + rand_p_InitY


    this.xSpeed = sliderValue.p_xSpeed + random(-sliderValue.p_xSpdSpread, sliderValue.p_xSpdSpread);
    this.ySpeed = sliderValue.p_ySpeed + random(-sliderValue.p_ySpdSpread, sliderValue.p_ySpdSpread);
    this.size = random(
        sliderValue.p_size,
        sliderValue.p_size * (1 + sliderValue.p_sizeVariability / 100));


    this.age = 0;
    this.lifetime = random(
        sliderValue.p_lifetime,
        sliderValue.p_lifetime + sliderValue.p_lifetime * (sliderValue.p_lifetimeVariability / 100)
    )

    this.x_wind = sliderValue.x_wind_
    this.y_wind = sliderValue.y_wind_


    ///
    let initRR = selectedColourData[0]
    let initGG = selectedColourData[1]
    let initBB = selectedColourData[2]
    let initAA = selectedColourData[3]

    if (currentPreset.totalCtrl.fRR) { initRR = 255 }
    if (currentPreset.totalCtrl.fGG) { initGG = 255 }
    if (currentPreset.totalCtrl.fBB) { initBB = 255 }
    if (currentPreset.totalCtrl.fAA) { initAA = 255 }


    this.sampleParticle = sampleParticle
    this.trailOpacityFactor = currentPreset.emitter.trailOpacityFactor

    ////DATA REQUIRED FOR interpolateRandom function to work
    this.walks = {
        spdX: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        spdY: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        windX: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        windY: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        RR: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        GG: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },

        BB: {
            rArray: [],
            output: 0,
            firstFlag: true,
            rFrom: 0,
            rTo: 0,
        },


    }
    let p_weight = random(currentPreset.emitter.p_windEffectMin, currentPreset.emitter.p_windEffectMax)
    let prevX = [];
    let prevY = [];
    this.updateParticle = function (sliderValue_xWind, sliderValue_yWind, sliderValue_gravity) {

        //adding gravity
        gravity_effect += sliderValue_gravity

        //updating x-position of each particle
        let mapped_xSpeed = this.xSpeed * mapFunction(1, mp.fXspeed, this.progress)
        let mapped_ySpeed = -this.ySpeed * mapFunction(1, mp.fYspeed, this.progress)
        let mapped_gravity = gravity_effect * mapFunction(1, mp.fGravity, this.progress)


        // Outputs interpolateRandom function data - important!
        let mapped_walkSpdXrange = mapFunction(1, walkMaps.spdX, this.progress)
        let mapped_walkSpdYrange = mapFunction(1, walkMaps.spdY, this.progress)
        let mapped_walkRRange = mapFunction(1, walkMaps.RRrange, this.progress)
        let mapped_walkGGange = mapFunction(1, walkMaps.GGrange, this.progress)
        let mapped_walkBBange = mapFunction(1, walkMaps.BBrange, this.progress)

        //UPDATING random walks data (IMPORTANT!)        
        this.walks.spdX = interpolateRandom(this.walks.spdX, currentPreset.emitter.spdXwalkPeriod, mapped_walkSpdXrange)
        this.walks.spdY = interpolateRandom(this.walks.spdY, currentPreset.emitter.spdYwalkPeriod, mapped_walkSpdYrange)
        this.walks.RR = interpolateRandom(this.walks.RR, currentPreset.emitter.RRperiod, mapped_walkRRange)
        this.walks.GG = interpolateRandom(this.walks.GG, currentPreset.emitter.GGperiod, mapped_walkGGange)
        this.walks.BB = interpolateRandom(this.walks.BB, currentPreset.emitter.BBperiod, mapped_walkBBange)






        //UPDAITNG particle x-position and y-position

        this.x += mapped_xSpeed + this.walks.spdX.output + sliderValue_xWind * transferWalks.windX.output * p_weight

        this.y += mapped_ySpeed - this.walks.spdX.output + sliderValue_yWind * transferWalks.windY.output * p_weight + mapped_gravity

        // console.table(this.y, prevY)
        //UPDATING particle age
        this.age++;
        if (prevX.length > 1) { prevX.splice(0, 1) }
        if (prevY.length > 1) { prevY.splice(0, 1) }
        prevX.push(this.x)
        prevY.push(this.y)
    }


    //Particle function METHODS
    this.drawSmokeParticle = function () {

        this.progress = (this.age / this.lifetime)  //%                   
        //DRAWING PARTICLE (SMOKE)

        let mapped_RR = initRR * mapFunction(1, mp.fRR, this.progress) + this.walks.RR.output
        let mapped_GG = initGG * mapFunction(1, mp.fGG, this.progress) + this.walks.GG.output
        let mapped_BB = initBB * mapFunction(1, mp.fBB, this.progress) + this.walks.BB.output
        let mapped_AA = initAA * mapFunction(1, mp.fAA, this.progress)

        let mapped_pSize = sliderValue.p_size * mapFunction(1, mp.fSize, this.progress,)
        push()
        noStroke()

        //Setting PARTICLE COLOUR
        fill(
            mapped_RR,
            mapped_GG,
            mapped_BB,
            mapped_AA)


        //DRAWING MARKIN SMAPLE PARTICLE
        if (this.sampleParticle != false) {
            stroke('red')
            strokeWeight(4)
        }
        //DRAWING PARTICLES
        if (currentPreset.emitter.drawEllipses) {
            ellipse(this.x, this.y, mapped_pSize);
        }
        if (currentPreset.emitter.drawLines) {
            push()
            stroke(
                mapped_RR,
                mapped_GG,
                mapped_BB,
                mapped_AA)
            strokeWeight(mapped_pSize)
            if (prevX.length > 1) {
                line(prevX[0], prevY[0], prevX[1], prevY[1])

            }
            pop()
        }
        pop()


        if (this.sampleParticle != false) {
            // draw mapFunction
            // drawFunction("p_size", 50, 0, 10, mp.fSize, 'gray', 300, max(10, max(mp.fSize)), this.progress)
            // drawFunction('red', 50, -15, 100, mp.fRR, 'red', 300, 4, this.progress)
            // drawFunction('green', -50, 0, 100, mp.fGG, 'green', 300, 4, this.progress)
            // drawFunction('blue', -50, -15, 100, mp.fBB, 'blue', 300, 4, this.progress)
            // drawFunction('opacity', 1, mp.fAA, 'blue', 300, 100, this.progress)
            // drawFunction('X-spd', -150, -30, 100, mp.fXspeed, 'magenta', 300, 1, this.progress)
            // drawFunction('Y-spd', -150, -15, 100, mp.fYspeed, 'cyan', 300, 1, this.progress)
            // drawFunction('gravity', -50, -30, 100, mp.fGravity, 'orange', 300, 1, this.progress)
        }
    }

    this.drawTrailParticle = function () {
        this.progress = (this.age / this.lifetime)  //%            

        let mapped_trailRR = initRR * mapFunction(1, mp.fRR, this.progress) + this.walks.RR.output
        let mapped_trailGG = initGG * mapFunction(1, mp.fGG, this.progress) + this.walks.GG.output
        let mapped_trailBB = initBB * mapFunction(1, mp.fBB, this.progress) + this.walks.BB.output
        let mapped_trailAA = initAA * mapFunction(1, mp.fAA, this.progress)

        let mapped_trailSize = sliderValue.p_size * mapFunction(1, mp.fTrailSize, this.progress,)

        //Setting PARTICLE COLOUR
        push()
        noStroke()
        fill(
            mapped_trailRR,
            mapped_trailGG,
            mapped_trailBB,
            mapped_trailAA / this.trailOpacityFactor)


        //DRAWING SMOKE PARTICLE
        if (currentPreset.emitter.drawEllipses) {
            ellipse(
                this.x,
                this.y,
                mapped_trailSize);
        }
        if (currentPreset.emitter.drawLines) {
            push()
            stroke(mapped_trailRR,
                mapped_trailGG,
                mapped_trailBB,
                mapped_trailAA / this.trailOpacityFactor)
            strokeWeight(mapped_trailSize)
            if (prevX.length > 1) {
                line(prevX[0], prevY[0], prevX[1], prevY[1])

            }
            pop()
        }
        pop()
    }

}