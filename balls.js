// WHO5 Metaball

/*** Metaball graphics object ***/
const gBall = new PIXI.Graphics();

gBall.beginFill(0xFFFFFF);
gBall.drawCircle(0, 0, 50);

gBall.endFill();

/*** Ball object ***/
const arrObjBalls = [];

const initialVel = 5;

function ObjBall(objEmotion) {
    this.fRadius = 50;
    this.vPos = [Math.random() * canvas.width, Math.random() * canvas.height];

    this.graphics = new PIXI.Graphics(gBall.geometry);
    this.graphics.x = this.vPos[0];
    this.graphics.y = this.vPos[1];

    app.stage.addChild(this.graphics);

    const fRandRad = Math.random() * Math.PI * 2;
    this.vVel = [Math.cos(fRandRad) * initialVel, Math.sin(fRandRad) * initialVel];

    arrObjBalls.push(this);

    app.ticker.add(() => {
        // move

        JVec.vAdd(this.vPos, this.vVel);
        this.graphics.x = this.vPos[0];
        this.graphics.y = this.vPos[1];

        if(this.vPos[0] < this.fRadius)
            this.vVel[0] = Math.abs(this.vVel[0]);
        else if (this.vPos[0] > canvas.width  - this.fRadius)
            this.vVel[0] = -Math.abs(this.vVel[0]);

        if(this.vPos[1] < this.fRadius)
            this.vVel[1] = Math.abs(this.vVel[1]);
        else if (this.vPos[1] > canvas.height  - this.fRadius)
            this.vVel[1] = -Math.abs(this.vVel[1]);
    });
}

app.ticker.add(() => {
   for(let i = 0; i < arrObjBalls.length; i++) {
       const objBall1 = arrObjBalls[i];

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
           }
       }
   }
});

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
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));
new ObjBall(new ObjEmotion(1, 1, 1, 1, 1));