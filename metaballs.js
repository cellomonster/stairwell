// WHO5 Metaball

/*** Create GL program ***/

// program
const program = createProgram(getFile("tri.glsl"), getFile("metaballs.glsl"));
gl.useProgram(program);

// locations
const idCanvWidth = gl.getUniformLocation(program, "canvWidth");
const idCanvHeight = gl.getUniformLocation(program, "canvHeight");

gl.uniform1f(idCanvWidth, canvas.width);
gl.uniform1f(idCanvHeight, canvas.height);

const idPartPos = gl.getUniformLocation(program, "partPos");
const idNumParts = gl.getUniformLocation(program, "numParts");

gl.uniform1i(idNumParts, 0);

/*** Ball object ***/
const fPartInitVel = 5;

const iPosVecSize = 2;
let fv2aPositions = [];
const iVelVecSize = 2;
let fv2aVelocities = [];
let faRadii = [];

let iNumParts = 0;

function createParticle() {

    iNumParts++;

    gl.uniform1i(idNumParts, iNumParts);

    // x
    fv2aPositions.push(Math.random() * canvas.width);
    // y
    fv2aPositions.push(Math.random() * canvas.height);

    // random initial direction
    const fRandRad = Math.random() * Math.PI * 2;

    // x velocity
    fv2aVelocities.push(Math.cos(fRandRad) * fPartInitVel);
    // y vel
    fv2aVelocities.push(Math.sin(fRandRad) * fPartInitVel);

    // radius
    faRadii.push(50);
}

for(let i = 0; i < 30; i++) {
    createParticle();
}

window.requestAnimationFrame(update);
function update() {

    for(let indexA = 0; indexA < iNumParts; indexA++) {

        let indexAPosX = indexA * iPosVecSize;
        let indexAPosY = indexA * iPosVecSize + 1;
        let indexAVelX = indexA * iVelVecSize;
        let indexAVelY = indexA * iVelVecSize + 1;

        fv2aPositions[indexAPosX] += fv2aVelocities[indexAVelX];
        fv2aPositions[indexAPosY] += fv2aVelocities[indexAVelY];

        if(fv2aPositions[indexAPosX] < 0) {
            fv2aVelocities[indexAPosX] = Math.abs(fv2aVelocities[indexAPosX]);
        } else if (fv2aPositions[indexAPosX] > canvas.width) {
            fv2aVelocities[indexAPosX] = -Math.abs(fv2aVelocities[indexAPosX]);
        }

        if(fv2aPositions[indexAPosY] < 0) {
            fv2aVelocities[indexAPosY] = Math.abs(fv2aVelocities[indexAPosY]);
        } else if (fv2aPositions[indexAPosY] > canvas.height) {
            fv2aVelocities[indexAPosY] = -Math.abs(fv2aVelocities[indexAPosY]);
        }

        for(let indexB = indexA + 1; indexB < iNumParts; indexB++) {

            let indexBPosX = indexB * iPosVecSize;
            let indexBPosY = indexB * iPosVecSize + 1;
            let indexBVelX = indexB * iVelVecSize;
            let indexBVelY = indexB * iVelVecSize + 1;

            let fPosDifX = fv2aPositions[indexAPosX] - fv2aPositions[indexBPosX];
            let fPosDifY = fv2aPositions[indexAPosY] - fv2aPositions[indexBPosY];

            let fDist = Math.sqrt(fPosDifX * fPosDifX + fPosDifY * fPosDifY);

            /** on collision **/
            // if(fDist < faRadii[indexA] + faRadii[indexB]) {
            //
            //     const fVelDifX = fv2aVelocities[indexAVelX] - fv2aVelocities[indexBVelX];
            //     const fVelDifY = fv2aVelocities[indexAVelY] - fv2aVelocities[indexBVelY];
            //
            //     //const vVelDif = JVec.vSubFromA(JVec.vCreate(fv2aVelocities, indexA, 2), 0, fv2aVelocities, indexB);
            //
            //     const fNormX = fPosDifX / fDist;
            //     const fNormY = fPosDifY / fDist;
            //
            //     const fDotVel = fNormX * fVelDifX + fNormY * fVelDifY;
            //
            //     //const fDotVel = JVec.fCalcDot(vNorm, vVelDif);
            //
            //     fv2aVelocities[indexAVelX] += fNormX * -fDotVel;
            //     fv2aVelocities[indexAVelY] += fNormY * -fDotVel;
            //
            //     fv2aVelocities[indexBVelX] += fNormX * fDotVel;
            //     fv2aVelocities[indexBVelY] += fNormY * fDotVel;
            //
            //     // JVec.vAddToA(fv2aVelocities, indexA, JVec.vScale(JVec.vCopy(vNorm), -fDotVel), 0, 2);
            //     // JVec.vAddToA(fv2aVelocities, indexB, JVec.vScale(JVec.vCopy(vNorm), fDotVel), 0, 2);
            //
            //     // JVec.vAddToA(objBall1.vVel, JVec.vScale(JVec.vCopy(vNorm), -fDotVel));
            //     // JVec.vAddToA(objBall2.vVel, JVec.vScale(JVec.vCopy(vNorm), fDotVel));
            //
            //     // prevent stick by moving touching particles out of each other
            //     const fOverlap = (fDist - (faRadii[indexA] + faRadii[indexB])) / 2;
            //     let fDisplaceX = fNormX * fOverlap;
            //     let fDisplaceY = fNormY * fOverlap;
            //
            //     fv2aPositions[indexAPosX] -= fDisplaceX;
            //     fv2aPositions[indexAPosY] -= fDisplaceY;
            //
            //     fv2aPositions[indexBPosX] += fDisplaceX;
            //     fv2aPositions[indexBPosY] += fDisplaceY;
            // }
        }
    }

    console.log(fv2aPositions);

    gl.uniform2fv(idPartPos, fv2aPositions);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

    window.requestAnimationFrame(update);
}

// add new cat

// for(let i = 0; i < 10; i++) {
//     new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
// }

