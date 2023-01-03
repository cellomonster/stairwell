// WHO5 Metaball

/*** Create GL program ***/

// program
const program = createProgram(getFile("tri.glsl"), getFile("metaballs.glsl"));
gl.useProgram(program);

// locations
const locCanvWidth = gl.getUniformLocation(program, "canvWidth");
const locCanvHeight = gl.getUniformLocation(program, "canvHeight");

gl.uniform1f(locCanvWidth, canvas.width);
gl.uniform1f(locCanvHeight, canvas.height);

const locPos = gl.getUniformLocation(program, "pos");
const locNum = gl.getUniformLocation(program, "num");

gl.uniform1i(locNum, 0);

/*** Ball object ***/
const arrObjBalls = [];

const initialVel = 5;

let fPositions = [];

function ObjBall(objEmotion) {
    this.fRadius = 50;
    this.vPos = [Math.random() * canvas.width, Math.random() * canvas.height];

    const fRandRad = Math.random() * Math.PI * 2;
    this.vVel = [Math.cos(fRandRad) * initialVel, Math.sin(fRandRad) * initialVel];

    arrObjBalls.push(this);
    fPositions.push(this.vPos[0]);
    fPositions.push(this.vPos[1]);
    console.log(fPositions.length / 2);
    gl.uniform1i(locNum, fPositions.length / 2);

    this.update = function() {
        // move

        JVec.vAdd(this.vPos, this.vVel);

        if(this.vPos[0] < this.fRadius)
            this.vVel[0] = Math.abs(this.vVel[0]);
        else if (this.vPos[0] > canvas.width  - this.fRadius)
            this.vVel[0] = -Math.abs(this.vVel[0]);

        if(this.vPos[1] < this.fRadius)
            this.vVel[1] = Math.abs(this.vVel[1]);
        else if (this.vPos[1] > canvas.height  - this.fRadius)
            this.vVel[1] = -Math.abs(this.vVel[1]);
    };
}

window.requestAnimationFrame(update);
function update() {

    for(let i = 0; i < arrObjBalls.length; i++) {
        const objBall1 = arrObjBalls[i];

        objBall1.update();

        fPositions[i * 2] = objBall1.vPos[0];
        fPositions[i * 2 + 1] = objBall1.vPos[1];

        for(let j = i + 1; j < arrObjBalls.length; j++) {
            const objBall2 = arrObjBalls[j];

            let vDif = JVec.vSub(JVec.vCopy(objBall1.vPos), objBall2.vPos);
            let fDist = JVec.fCalcMagnitude(vDif);

            /** on collision **/
            if(fDist < objBall1.fRadius + objBall2.fRadius) {

                // collision impulse
                const vVelDif = JVec.vSub(JVec.vCopy(objBall1.vVel), objBall2.vVel);

                const vNorm = JVec.vNormalize(JVec.vCopy(vDif));

                const fDotVel = JVec.fCalcDot(vNorm, vVelDif);

                JVec.vAdd(objBall1.vVel, JVec.vScale(JVec.vCopy(vNorm), -fDotVel));
                JVec.vAdd(objBall2.vVel, JVec.vScale(JVec.vCopy(vNorm), fDotVel));

                // prevent stick by moving touching particles out of each other
                const fOverlap = (fDist - (objBall1.fRadius + objBall2.fRadius)) / 2;
                const vDisplace = JVec.vScale(vNorm, fOverlap);

                JVec.vSub(objBall1.vPos, vDisplace);
                JVec.vAdd(objBall2.vPos, vDisplace);

                fPositions[i * 2] = objBall1.vPos[0];
                fPositions[i * 2 + 1] = objBall1.vPos[1];

                fPositions[j * 2] = objBall2.vPos[0];
                fPositions[j * 2 + 1] = objBall2.vPos[1];
            }
        }
    }

    //console.log(fPositions);

    gl.uniform2fv(locPos, fPositions);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

    window.requestAnimationFrame(update);
}

// add new cat
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));

