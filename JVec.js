/*** JVec ***/
/*
Julian's Vectors - dead simple functions for in-place vector operations
 */
let JVec = new function() {

    this.vCopy = function (v) {
        return Array.from(v);
    }

    this.fCalcDot = function (vA, vB) {
        if (vA.length !== vB.length) {
            throw 'vector lengths dont match ' + vA.length + ' vs ' + vB.length;
        }

        let f = 0;

        for (let i = 0; i < vA.length; i++) {
            f += vA[i] * vB[i];
        }

        return f;
    }

    this.fCalcMagnitude = function (v) {
        let hyp = 0;

        for (let i = 0; i < v.length; i++) {
            hyp += v[i] * v[i];
        }

        return Math.sqrt(hyp);
    }

    this.vNormalize = function (v) {
        let magnitude = 0;

        for (let i = 0; i < v.length; i++) {
            magnitude += v[i] * v[i];
        }

        magnitude = Math.sqrt(magnitude);

        for (let i = 0; i < v.length; i++) {
            v[i] /= magnitude;
        }

        return v;
    }

    this.vAdd = function (vA, vB) {

        if(vA.length < vB.length)
            vA.length = vB.length;

        for (let i = 0; i < vA.length; i++) {
            vA[i] += vB[i];
        }

        return vA;
    }

    this.vSub = function (vA, vB) {

        if(vA.length < vB.length)
            vA.length = vB.length;

        for (let i = 0; i < vB.length; i++) {
            vA[i] -= vB[i];
        }

        return vA;
    }

    this.vScale = function (v, f) {
        for (let i = 0; i < v.length; i++) {
            v[i] *= f;
        }

        return v;
    }
}