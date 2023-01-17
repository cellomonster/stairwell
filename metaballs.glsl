#version 300 es

precision lowp float;

uniform vec2[256] partPos;
uniform vec3[256] colors;
uniform float radii[256];
uniform uint numParts;

in vec2 texCoord;

out vec4 fragColor;

void main(void) {
    float f = 0.0;
    uint iClosest = 0u;
    float fClosest = 999999.0;
    fragColor = vec4(0, 0, 0, 1);
    for(uint i = 0u; i < numParts; i++)
    {
        vec2 p = partPos[i];

        float rad = radii[i];

        float dx = texCoord.x - partPos[i].x;
        float dy = texCoord.y - partPos[i].y;

        float d = dx * dx + dy * dy;

        if(d < fClosest) {
            fClosest = d;
            iClosest = i;
        }

        f += rad * rad / d;
    }

    if(f > 0.3)
        fragColor = vec4(colors[iClosest], 1);
}