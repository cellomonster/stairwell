var canvas = document.getElementById("canvas");
var gl = canvas.getContext('webgl2');
gl.viewport(0, 0, canvas.width = window.innerWidth, canvas.height = window.innerHeight);

var program = createProgram(glsl('shader-vertex'), glsl('shader-fragment'));
var mouse = program.createUniform('2f', 'mouse');
gl.useProgram(program);

render();

listen("mousemove");

listen("touchstart");

function listen(eventType){
    window.addEventListener(eventType, function (e) {
        mouse(e.x, canvas.height - e.y);
        render();
    });
}

function render(){
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
}

function createShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader));
    return shader;
}

function createProgram(vertex, fragment) {
    const program = gl.createProgram();
    gl.attachShader(program, createShader(vertex, gl.VERTEX_SHADER));
    gl.attachShader(program, createShader(fragment, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);

    program.createUniform = function (type, name) {
        var location = gl.getUniformLocation(program, name);
        return function (v1, v2, v3, v4) {
            gl['uniform' + type](location, v1, v2, v3, v4);
        }
    };

    return program;
}