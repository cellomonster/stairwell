#version 300 es

precision highp float;

uniform float canvWidth;
uniform float canvHeight;

out vec2 texCoord;

void main(void) {
    float x = float((gl_VertexID & 1) << 2);
    float y = float((gl_VertexID & 2) << 1);
    texCoord.x = (x * 0.5f) * canvWidth;
    texCoord.y = (1. - y * 0.5f) * canvHeight;
    gl_Position = vec4(x - 1.0, y - 1.0, 0, 1);
}