export class Layer {
    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.objects = []; 
    }

    add (object) {
        this.objects.push(object);
        return object;
    };

    remove (object) {
        const { [Object.keys(obj).pop()]: lastKey, ...newObj } = obj;
    };
}