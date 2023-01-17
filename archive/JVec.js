/*** JVec ***/
/*
Julian's Vectors - dead simple functions for in-place vector operations
 */
let JVec = new function() {

    this.vCopy = function (v) {
        return Array.from(v);
    }

    this.vCreate = function(arr, index, size) {
        let v = new Array(size);

        index *= size;

        for(let i = 0; i < size; i++) {
            v[i] = arr[index + i];
        }

        return v;
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

    this.fCalcDot = function(arrA, iA, arrB, iB, size) {
        iA *= size;
        iB *= size;

        let f = 0;

        for(let i = 0; i < size; i++) {
            f += arrA[iA + i] * arrB[iB + i];
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

    this.fCalcMagnitude = function(arr, index, size) {
        index *= size;

        let magn = 0;

        for(let i = index; i < index + size; i++) {
            magn += arr[i] * arr[i];
        }

        return Math.sqrt(magn);
    }


    this.vNormalize = function (v) {
        let magnitude = this.fCalcMagnitude(v);

        for (let i = 0; i < v.length; i++) {
            v[i] /= magnitude;
        }

        return v;
    }

    this.fNormalize = function(arr, index, size) {
        index *= size;

        let magnitude = this.fCalcMagnitude(arr, index, size);

        for(let i = index; i < index + size; i++) {
            arr[i] /= magnitude;
        }
    }

    this.vAddToA = function (vA, vB) {

        if(vA.length < vB.length)
            vA.length = vB.length;

        for (let i = 0; i < vA.length; i++) {
            vA[i] += vB[i];
        }

        return vA;
    }

    this.vAddToA = function (arrA, iA, arrB, iB, size) {
        iA *= size;
        iB *= size;

        for (let i = 0; i < size; i++) {
            arrA[iA + i] += arrB[iB + i];
        }
    }

    this.vSubFromA = function (vA, vB) {

        if(vA.length < vB.length)
            vA.length = vB.length;

        for (let i = 0; i < vB.length; i++) {
            vA[i] -= vB[i];
        }

        return vA;
    }

    this.SubFromA = function (arrA, iA, arrB, iB, size) {
        iA *= size;
        iB *= size;

        for (let i = 0; i < size; i++) {
            arrA[iA + i] -= arrB[iB + i];
        }
    }

    this.vScale = function (v, f) {
        for (let i = 0; i < v.length; i++) {
            v[i] *= f;
        }

        return v;
    }
}