import {Tools} from "./tools.js";

export class Graphs {
    constructor () {
        this.canvas = document.querySelector('#canvas');
        this.ctx = canvas.getContext('2d');
        this.tools = new Tools();
        
        // Вычисляем сколько добавил ячеек пользователь
        this.tr = document.querySelectorAll('tr');
    }

    redistribution (type) {
        switch (type) {
            case 'Кольцевая': this.ring_circular(true); break;
            case 'Круговая': this.ring_circular(false); break;
            case 'Гистограмма': this.histogram(); break;
            case 'График': this.scatter(); break;
        }
    };

    ring_circular (flag) {
        // Очищаем весь холст
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const data = this.tools.data();
        let total_value = 0;

        data.forEach((data, index) => {
            if (index % 2 !== 0) total_value += Number(data);
        });

        let start_angle = 0;
        let posX = 110;
        let posY = 25;
        let posXText = 130;
        let sliceColor = ''; // Переменная для хранения цвета

        data.forEach((data, index) => {
            if (index % 2 !== 0) {
                let slice_angle = (2 * Math.PI * Number(data)) / total_value;
                this.tools.drawPieSlice (
                    this.canvas.width / 2
                    , this.canvas.height / 2
                    , Math.min(this.canvas.width / 2, this.canvas.height / 2)
                    , start_angle
                    , start_angle + slice_angle
                    , sliceColor // Передаем сохраненный цвет
                );
        
                start_angle += slice_angle;
            }
            else {
                this.tools.discardingText(data, posXText, posY, 8);
        
                this.ctx.fillText('=', posX + 25, posY);
                this.ctx.fillRect(posX + 40, posY - 17, 20, 20);
                this.ctx.fillStyle = sliceColor; // Устанавливаем сохраненный цвет в fillStyle
                posY += 20;
        
                sliceColor = this.tools.randomColor(); // Обновляем сохраненный цвет
            }
        });

        // Дыра посередине для кольцевой диаграммы
        if (flag === true) {
            const doughnutHoleSize = 0.5;
            if (doughnutHoleSize){
                this.tools.drawPieSlice (
                    this.canvas.width / 2
                    , this.canvas.height / 2
                    , doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2)
                    , 0
                    , 2 * Math.PI
                    , "#ffff"
                );
            }    
        }
    };

    scatter () {
        // Очищаем весь холст
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.tools.markup();        

        const data = this.tools.data();
        const widthCalc = this.canvas.width - 80;
        const heightCalc = this.canvas.height - 40;
        let posX = 163;
        let posXText= 150;
        let posYText = heightCalc + 10

        let arr = [];

        data.forEach( (data, index) => {
            
            if (index % 2 !== 0) {
                arr.push(posX);
                arr.push((heightCalc - 21) - (Number(data) / (this.tools.calcMaxNumber() * 10)) * 200);

                // Сохраняем текущие стили
                const prevFillStyle = this.ctx.fillStyle;
                const prevStrokeStyle = this.ctx.strokeStyle;
            
                this.ctx.beginPath();
                this.ctx.arc(
                    posX
                    , (heightCalc - 21) - (Number(data) / (this.tools.calcMaxNumber() * 10)) * 200
                    , 3
                    , 0
                    , 2 * Math.PI
                );
            
                // Устанавливаем стили для окружности
                this.ctx.fillStyle = 'blue';
                this.ctx.strokeStyle = 'black';
            
                // Рисуем окружность
                this.ctx.fill();
                this.ctx.stroke();
            
                // Восстанавливаем предыдущие стили
                this.ctx.fillStyle = prevFillStyle;
                this.ctx.strokeStyle = prevStrokeStyle;
            
                posX += this.tools.calc(widthCalc - 150);
                this.ctx.closePath();
            }
            else {
                this.ctx.fillText(data, posXText, posYText);
                posXText += this.tools.calc(widthCalc - 150);
            } 
        });

        for (let i = 0; i <= arr.length; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(arr[i] + 3, arr[i+1]); 
            this.ctx.lineTo(arr[i+2] - 3, arr[i+3]); 
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    };

    histogram () {
        // Очищаем весь холст
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.tools.markup();        
        
        const widthCalc = this.canvas.width - 80;
        const heightCalc = this.canvas.height - 40;
        const data = this.tools.data();

        let posX = 150
        let posY = heightCalc + 10
        let posXRect = 150;

        this.ctx.font = '20px Oswald';

        data.forEach((data, index) => {
            let dp = Number(data);
            
            if (index % 2 === 0) {
                this.ctx.fillText(data, posX, posY);
                posX += this.tools.calc(widthCalc - 150);
            } 
            else {
                const previousFillStyle = this.ctx.fillStyle; // Сохраняем текущий fillStyle
            
                this.ctx.fillStyle = this.tools.randomColor();
                this.ctx.fillRect(
                  posXRect
                  , heightCalc - 21
                  , 25
                  , -((data / (this.tools.calcMaxNumber() * 10)) * 200)
                );
            
                this.ctx.fillStyle = previousFillStyle; // Восстанавливаем предыдущий fillStyle
            
                posXRect += this.tools.calc(widthCalc - 150);
            }            
        });
    };
}