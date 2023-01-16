const socket = io();

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
const idColors = gl.getUniformLocation(program, "colors");

gl.uniform1ui(idNumParts, 0);

/*** Ball object ***/
const fPartInitVel = 5;

const iPosVecSize = 2;
let f2vPositions = [];
const iVelVecSize = 2;
let f2vVelocities = [];
let f1vRadii = [];

const iColorVecSize = 3;
let f3vColors = [];

let iNumParts = 0;

function createParticle(fr, fg, fb) {
  iNumParts++;

  gl.uniform1ui(idNumParts, iNumParts);

  // x
  f2vPositions.push(Math.random() * canvas.width);
  // y
  f2vPositions.push(Math.random() * canvas.height);

  // random initial direction
  const fRandRad = Math.random() * Math.PI * 2;

  // x velocity
  f2vVelocities.push(Math.cos(fRandRad) * fPartInitVel);
  // y vel
  f2vVelocities.push(Math.sin(fRandRad) * fPartInitVel);

  // color r, g, & b
  f3vColors.push(fr);
  f3vColors.push(fg);
  f3vColors.push(fb);

  gl.uniform3fv(idColors, f3vColors);

  // radius
  f1vRadii.push(50);
}

//simple hexcode to rgb method
const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // return {r, g, b}
  return { r, g, b };
};

socket.on("server to listener", (color, a, b, c, d, e) => {
  rgb = hex2rgb(color);

  createParticle(rgb.r / 255, rgb.g / 255, rgb.b / 255);
  if (iNumParts > 5) {
    iNumParts--;

    f2vPositions.shift();
    f2vPositions.shift();

    f2vVelocities.shift();
    f2vVelocities.shift();

    f3vColors.shift();
    f3vColors.shift();
    f3vColors.shift();
    gl.uniform3fv(idColors, f3vColors);

    f1vRadii.shift();
  }
});

window.requestAnimationFrame(update);
function update() {
  for (let indexA = 0; indexA < iNumParts; indexA++) {
    let indexAPosX = indexA * iPosVecSize;
    let indexAPosY = indexA * iPosVecSize + 1;
    let indexAVelX = indexA * iVelVecSize;
    let indexAVelY = indexA * iVelVecSize + 1;

    f2vPositions[indexAPosX] += f2vVelocities[indexAVelX];
    f2vPositions[indexAPosY] += f2vVelocities[indexAVelY];

    if (f2vPositions[indexAPosX] < 0) {
      f2vVelocities[indexAPosX] = Math.abs(f2vVelocities[indexAPosX]);
    } else if (f2vPositions[indexAPosX] > canvas.width) {
      f2vVelocities[indexAPosX] = -Math.abs(f2vVelocities[indexAPosX]);
    }

    if (f2vPositions[indexAPosY] < 0) {
      f2vVelocities[indexAPosY] = Math.abs(f2vVelocities[indexAPosY]);
    } else if (f2vPositions[indexAPosY] > canvas.height) {
      f2vVelocities[indexAPosY] = -Math.abs(f2vVelocities[indexAPosY]);
    }

    for (let indexB = indexA + 1; indexB < iNumParts; indexB++) {
      let indexBPosX = indexB * iPosVecSize;
      let indexBPosY = indexB * iPosVecSize + 1;
      let indexBVelX = indexB * iVelVecSize;
      let indexBVelY = indexB * iVelVecSize + 1;

      let fPosDifX = f2vPositions[indexAPosX] - f2vPositions[indexBPosX];
      let fPosDifY = f2vPositions[indexAPosY] - f2vPositions[indexBPosY];

      let fDist = Math.sqrt(fPosDifX * fPosDifX + fPosDifY * fPosDifY);

      /** on collision **/
      if (fDist < f1vRadii[indexA] + f1vRadii[indexB]) {
        const fVelDifX = f2vVelocities[indexAVelX] - f2vVelocities[indexBVelX];
        const fVelDifY = f2vVelocities[indexAVelY] - f2vVelocities[indexBVelY];

        //const vVelDif = JVec.vSubFromA(JVec.vCreate(f2vVelocities, indexA, 2), 0, f2vVelocities, indexB);

        const fNormX = fPosDifX / fDist;
        const fNormY = fPosDifY / fDist;

        const fDotVel = fNormX * fVelDifX + fNormY * fVelDifY;

        //const fDotVel = JVec.fCalcDot(vNorm, vVelDif);

        f2vVelocities[indexAVelX] += fNormX * -fDotVel;
        f2vVelocities[indexAVelY] += fNormY * -fDotVel;

        f2vVelocities[indexBVelX] += fNormX * fDotVel;
        f2vVelocities[indexBVelY] += fNormY * fDotVel;

        // JVec.vAddToA(f2vVelocities, indexA, JVec.vScale(JVec.vCopy(vNorm), -fDotVel), 0, 2);
        // JVec.vAddToA(f2vVelocities, indexB, JVec.vScale(JVec.vCopy(vNorm), fDotVel), 0, 2);

        // JVec.vAddToA(objBall1.vVel, JVec.vScale(JVec.vCopy(vNorm), -fDotVel));
        // JVec.vAddToA(objBall2.vVel, JVec.vScale(JVec.vCopy(vNorm), fDotVel));

        // prevent stick by moving touching particles out of each other
        const fOverlap = (fDist - (f1vRadii[indexA] + f1vRadii[indexB])) / 2;
        let fDisplaceX = fNormX * fOverlap;
        let fDisplaceY = fNormY * fOverlap;

        f2vPositions[indexAPosX] -= fDisplaceX;
        f2vPositions[indexAPosY] -= fDisplaceY;

        f2vPositions[indexBPosX] += fDisplaceX;
        f2vPositions[indexBPosY] += fDisplaceY;
      }
    }
  }

  gl.uniform2fv(idPartPos, f2vPositions);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

  window.requestAnimationFrame(update);
}

// add new cat

// for(let i = 0; i < 10; i++) {
//     new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
// }
