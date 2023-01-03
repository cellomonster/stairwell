const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl2");

function createShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(vertSrc, fragSrc) {
    const program = gl.createProgram();
    gl.attachShader(program, createShader(vertSrc, gl.VERTEX_SHADER));
    gl.attachShader(program, createShader(fragSrc, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);

    program.createUniform = function (type, name) {
        const location = gl.getUniformLocation(program, name);
        return function (v1, v2, v3, v4) {
            gl['uniform' + type](location, v1, v2, v3, v4);
        }
    };

    return program;
}

function getFile(name) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', name, false);
    xhr.send();
    return xhr.responseText;
}