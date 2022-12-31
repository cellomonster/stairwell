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