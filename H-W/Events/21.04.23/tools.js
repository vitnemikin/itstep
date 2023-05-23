export class Tools {
    constructor () {
        this.canvas = document.querySelector('#canvas');
        this.canvas.height = 300;
        this.canvas.width = 700;
        this.ctx = canvas.getContext('2d');

        // Вычисляем сколько добавил ячеек пользователь
        this.tr = document.querySelectorAll('tr');
        this.widthCalc = this.canvas.width - 80;
        this.heightCalc = this.canvas.height - 40;
    }

    calcMaxNumber () {
        let data = document.querySelectorAll('td');
        let arr = [];

        data.forEach( (elem, index) => {
            if (index % 2 !== 0) arr.push(Number(elem.textContent));
        });        
        
        const max = Math.max(...arr);
        let num = '1'

        for (let i = 2; i <= String(max).length; i++) num += 0;
        return num;
    };

    random (max, min) {
        return Math.trunc(Math.random() * (max - min)) + min;
    };

    randomColor () {
        return `rgb(${this.random(255, 0)},${this.random(255, 0)},${this.random(255, 0)})`;
    };

    data () {
        const cells = document.querySelectorAll('td');
        const data = [];
        cells.forEach( (elem) => {
            data.push(elem.innerHTML);
        });
        return data;
    };

    drawPieSlice(centerX, centerY, radius, startAngle, endAngle, color) {
        this.ctx.fillStyle = color;

        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        this.ctx.closePath();
        this.ctx.fill();
    };

    discardingText (text, posX, posY, widthBetween) {
        const reversedStr = text.split('').reverse().join('');
        // Рисование текста
        this.ctx.font = '20px Oswald';
        for (let i = 0; i < reversedStr.length; i++) {
            this.ctx.fillText(reversedStr[i], posX - widthBetween, posY);
            widthBetween += 8;
        }
    }
 
    calc (width) {
        let cells = document.querySelectorAll('td');
        return Math.trunc(width / (cells.length / 2));
    };

    limitCanvasWidth () {
        // Если на холсте больше данных
        // заданного порога то увеличиваем ширину канваса
        let limit = 20;
        if (this.data().length > limit) {
            this.canvas.width += 200;
            this.widthCalc = this.canvas.width - 80;
            this.heightCalc = this.canvas.height - 40;

            limit += 20;
        }
    };

    markup () {
        this.limitCanvasWidth();

        // Очищаем весь холст
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Линии по x
        let count = 0;
        for (let i = 40; i <= 250; i += 20) {
            if (count % 2 !== 0) this.ctx.strokeStyle = 'grey';
            else this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
            this.ctx.beginPath();

            this.ctx.moveTo(130, i);
            this.ctx.lineTo(this.widthCalc, i);

            this.ctx.stroke();
            this.ctx.closePath();

            count++;
        }

        // Для отображения 0-я
        this.ctx.beginPath();
        this.ctx.font = '20px Oswald';
        this.ctx.fillText(0, 92, this.heightCalc - 15);
        this.ctx.closePath();

        // Значения по оси y
        let point = (this.calcMaxNumber() * 10) / 5;
        let posY2 = this.heightCalc - 55;

        for (let i = point; 
            i <= this.calcMaxNumber() * 10; 
            i += (this.calcMaxNumber() * 10) / 5) {

            this.ctx.beginPath();
            this.ctx.font = '20px Oswald';
            this.discardingText(String(point), 100, posY2, 8)
            // this.ctx.fillText(point, 50, posY2);
            posY2 -= 40;
            this.ctx.stroke();
            this.ctx.closePath();

            point += (this.calcMaxNumber() * 10) / 5;
        }

        // Для большей четкости нижней линии
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black'
        for (let i = 0; i <= 20; i++) {
            this.ctx.moveTo(130, 240);
            this.ctx.lineTo(this.widthCalc, 240);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    };
}