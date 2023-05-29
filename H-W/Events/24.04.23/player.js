import {AnimatedSprite} from './animated_sprite.js';

export class Player extends AnimatedSprite {
    animate (direction) {
        switch (direction) {
            case 'right':
                this.hide(); // Скрываем героя
                this.x += 10; // Делаем движения
                this.c += 3.5; // Добавляем следующий спрайт

                // Если спрайты закончились переходим обратно к первому спрайту
                if (this.c >= this.cols) this.c = 0;
                
                this.r = 3; // Строка спрайта
                this.show(this.x, this.y);
            break;

            case 'left':
                this.hide();
                this.x -= 10;
                this.c += 3.5;
                
                if (this.c >= this.cols) this.c = 0;
                
                this.r = 1;
                this.show(this.x, this.y);
            break;

            case 'down':
                this.hide();
                this.y += 10;
                this.c += 3.4;
                
                if (this.c >= this.cols) this.c = 0;
                
                this.r = 0;
                this.show(this.x, this.y);
            break;

            case 'up':
                this.hide();
                this.y -= 10;
                this.c += 3.5;
                
                if (this.c >= this.cols) this.c = 0;
                
                this.r = 2;
                this.show(this.x, this.y);
            break;

            default: return;
        }
    };
}