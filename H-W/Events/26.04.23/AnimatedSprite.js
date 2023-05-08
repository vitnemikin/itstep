export class AnimatedSprite {
    ready = false;
    rows = 0;
    cols = 0;
    r = 0;    // текущая строка в спрайт-листе
    c = 0;    // текущая колонка в спрайт-листе
    x = 0;    // текущая x координата на холсте
    y = 0;    // текущая y координата на холсте
    savedData = 0;
    ondestroy = () => {};
    oncollision = () => {};
    collisionMasks = [];

    constructor (layer, src, width, height) {
        this.layer = layer;
        this.ctx = layer.ctx;
        this.spriteSheet = new Image();
        this.spriteSheet.src = src;
        this.spriteSheet.onload = this.spriteLoaded.bind(this);
        this.width = width;
        this.height = height;
    }

    destroy () {
        this.hide();
        this.layer.remove(this);
        this.ondestroy();
        delete this;
    }

    makeCollisionMask (canvas, row, col) {
        let sourceX = col * this.width;
        let sourceY = row * this.height;

        let hctx = canvas.getContext('2d');
        hctx.drawImage(this.spriteSheet, sourceX, sourceY, this.width,
            this.height, 0, 0, this.width, this.height);

        let maskData = hctx.getImageData(0, 0, this.width, this.height);
        hctx.clearRect(0, 0, this.width, this.height);

        return maskData.data.map( (x, i) => {
            if ((i + 1) % 4) return 0;
            else return (x > 10) ? 255 : 0;
        });

        return maskData.filter( (x, i) => (i + 1) % 4 === 0 );
    }


    spriteLoaded (ev) {
        this.ready = true;
        this.rows = Math.trunc(ev.target.height / this.height);
        this.cols = Math.trunc(ev.target.width / this.width);
 
        let hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = this.width;
        hiddenCanvas.height = this.height;

        for (let r = 0; r < this.rows; r++) {
            this.collisionMasks[r] = [];

            for (let c = 0; c < this.cols; c++) 
                this.collisionMasks[r][c] = this.makeCollisionMask(hiddenCanvas, r, c);
        }
    };

    show (x, y) {
        this.x = x;
        this.y = y;
        let sourceX = this.c * this.width;
        let sourceY = this.r * this.height;
        this.savedData = this.ctx.getImageData(x, y, this.width, this.height);
        this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, this.width,
            this.height, this.x, this.y, this.width, this.height);
    };

    hide () {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.ctx.putImageData(this.savedData, this.x, this.y); // Восстанавливаем изображение после ходов игрока
    };

    get currentMask() {
        return this.collisionMasks[this.r][this.c];
    }

    isPrecizeCollision (other) {        
        let w = 0;
        let h = 0;

        if (other.x > this.x) w = this.width - (other.x - this.x);
        else                  w = other.width - (this.x - other.x);
        
        if (other.y > this.y) h = this.height - (other.y - this.y);
        else                  h = other.height - (this.y - other.y);

        let myMask = this.currentMask.filter( (x, i) => {
            let dx, dy;

            if (this.x > other.x) dx = other.x - this.x;
            else dx = 0;
            
            if (this.y > other.y) dy = other.y - this.y;
            else dy = 0;
    
            return (
                i % this.width >= dx && 
                i % this.width <= dx + w &&
                Math.trunc(i / this.width) >= dy &&
                Math.trunc(i / this.width) >= dy + h
            );
        });

        let yourMask = other.currentMask.filter( (x, i) => {
            let dx, dy;

            if (this.x > other.x) dx = this.x - other.x;
            else dx = 0;
            
            if (this.y > other.y) dy = this.y - other.y;
            else dy = 0;

            return (
                i % other.width >= dx && 
                i % other.width <= dx + w &&
                Math.trunc(i / other.width) >= dy &&
                Math.trunc(i / other.width) >= dy + h
            );
        });  

        // ???????????????????????????????????????????????????
        for (let i in myMask) {
            let collision = myMask[i] & yourMask;

            if (collision) return true;
            else false;
        }
    };

    isCollision (other) {
        // Collision by x...
        if (this.x < other.x) {
            if ((this.x + this.width) < other.x) return false;
        } else {
            if ((other.x + other.width) < this.x) return false;
        }

        // Collision by y...
        if (this.y < other.y) {
            if ((this.y + this.height) < other.y) return false;
        } else {
            if ((other.y + other.height) < this.y) return false;
        }

        return this.isPrecizeCollision(other);
    };
}