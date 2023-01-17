const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl2");

function glCreateShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    alert("Shader compilation error. Check log");
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(vertSrc, fragSrc) {
    const program = gl.createProgram();
    gl.attachShader(program, glCreateShader(vertSrc, gl.VERTEX_SHADER));
    gl.attachShader(program, glCreateShader(fragSrc, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);

    // add this for extra debugging
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
        var info = gl.getProgramInfoLog(program);
        throw new Error('Could not compile WebGL program. \n\n' + info);
    }

    return program;
}

function getFile(name) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', name, false);
    xhr.send();
    return xhr.responseText;
}