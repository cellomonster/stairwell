#version 300 es

precision lowp float;

uniform vec2[500] partPos;
uniform vec3[500] colors;
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

        float dx = texCoord.x - partPos[i].x;
        float dy = texCoord.y - partPos[i].y;

        float d = dx * dx + dy * dy;

        if(d < fClosest) {
            fClosest = d;
            iClosest = i;
        }

        f += 50.0 * 50.0 / d;
    }

    if(f > 0.3)
        fragColor = vec4(colors[iClosest], 1);
}