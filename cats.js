/*** Setup ***/
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const app = new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    resolution: 1,
    antialiasing: true,
    view:canvas,
    resizeTo: window
});

function resize() {
    console.log('resized');
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
window.onresize = resize;

/*** Emotion object ***/
// based on https://ogg.osu.edu/media/documents/MB%20Stream/who5.pdf
function ObjEmotion(intCheerful, intCalm, intActive, intFresh, intInterest) {
    this.intCheerful = intCheerful;
    this.intCalm = intCalm;
    this.intActive = intActive;
    this.intFresh = intFresh;
    this.intInterest = intInterest;
}

// WHO5 Cats

/*** Cat graphics object ***/
const gCat = new PIXI.Graphics();

gCat.pCheek = new PIXI.Point(40, -15);
gCat.pEar = new PIXI.Point(25, -50);
gCat.fHeight = -30;
gCat.pEyes = new PIXI.Point(10, -15);

gCat.beginFill(0xFFFFFF);
gCat.moveTo(0, 0);
gCat.quadraticCurveTo(gCat.pCheek.x, 0, gCat.pCheek.x, gCat.pCheek.y);
gCat.quadraticCurveTo(gCat.pCheek.x, gCat.pEar.y, gCat.pEar.x, gCat.pEar.y);
gCat.quadraticCurveTo(0, gCat.pEar.y, 0, gCat.fHeight);

gCat.quadraticCurveTo(0, gCat.pEar.y, -gCat.pEar.x, gCat.pEar.y);
gCat.quadraticCurveTo(-gCat.pCheek.x, gCat.pEar.y, -gCat.pCheek.x, gCat.pCheek.y);
gCat.quadraticCurveTo(-gCat.pCheek.x, 0, 0, 0);

gCat.beginFill(0x000000);
gCat.drawEllipse(gCat.pEyes.x, gCat.pEyes.y, 5, 5);
gCat.drawEllipse(-gCat.pEyes.x, gCat.pEyes.y, 5, 5);

gCat.endFill();

/*** Cat object ***/

let objCats = [];

function ObjCat(objEmotion) {

    objCats.push(this);

    this.objEmotion = objEmotion;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.graphics = new PIXI.Graphics(gCat.geometry);
    this.graphics.x = this.x;
    this.graphics.y = this.y;

    app.stage.addChild(this.graphics);

    // Move cat object
    this.SetPos = function(fX, fY) {

        this.x = Math.min(Math.max(fX, 0), canvas.width);
        this.y = Math.min(Math.max(fY, 0), canvas.height);

        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    this.Move = function(fDeltaX, fDeltaY) {
        this.SetPos(this.x + fDeltaX, this.y + fDeltaY);
    }

    this.BehaviorCycle = function() {};

    this.BehaviorWalk = function(fRad, fVel, fSec) {

        var fDeltaX = Math.cos(fRad) * fVel;
        var fDeltaY = Math.sin(fRad) * fVel;

// 		console.log("Begin walk");
// 		console.log(fRad);
// 		console.log(fVel);
// 		console.log(fSec);

        var MoveInDir = () => {

            if(this.x < 1 || this.x > canvas.width - 1) fDeltaX *= -1;
            if(this.y < 1 || this.y > canvas.height - 1) fDeltaY *= -1;

            this.Move(fDeltaX, fDeltaY);
        }

        app.ticker.add(MoveInDir);

        setTimeout(() => {
            app.ticker.remove(MoveInDir);
            this.BehaviorCycle();
        }, fSec * 1000);
    }

    this.behaviors = [
        () => {
            this.BehaviorWalk(
                Math.random() * Math.PI * 2,
                this.objEmotion.intActive,
                1 + Math.random() * this.objEmotion.intActive
            );
        }
    ];

    this.BehaviorCycle = function() {
        var waitForNextBehavior = 1 + 5 * Math.random() / this.objEmotion.intActive;

        setTimeout(() => {

            let behaviorIndex = 0;//Math.random() * behaviors.length;
            this.behaviors[behaviorIndex]();

        }, waitForNextBehavior * 1000);
    }

    this.BehaviorCycle();
}

// add new cat
new ObjCat(new ObjEmotion(1, 1, 1, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 1, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 1, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 1, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 1, 1, 1));


new ObjCat(new ObjEmotion(1, 1, 5, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 5, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 5, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 5, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 5, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 3, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 3, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 3, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 3, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 3, 1, 1));
new ObjCat(new ObjEmotion(1, 1, 3, 1, 1));
