#version 300 es

precision highp float;

uniform vec2[500] pos;
uniform int num;

in vec2 texCoord;

out vec4 fragColor;

void main(void) {
    fragColor = vec4(0, 1, 0, 1);
    float f = 0.;
    for(int i = 0; i < num; i++)
    {
        vec2 p = pos[i];

        float dx = texCoord.x - pos[i].x;
        float dy = texCoord.y - pos[i].y;

        f += 50.0 * 50.0 / (dx * dx + dy * dy);
    }


    fragColor = vec4(f > 1.0, f, f, 1);
}