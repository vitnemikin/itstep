// // Уровень допуска...
logLevel = 0;

function log(level, args) {
    if (logLevel >= level) {
        let logInfo = [];

        for (let i in arguments) {
            if (i < 1) continue;  
            logInfo.push(arguments[i]);
        }
    
        console.log(...logInfo);
    }
}

class Coffee_Machine {
    // Состояния нашей кофемашинки
    ST_WAITING = 'ST_WAITING';
    ST_FINISH = 'ST_FINISH';

    // Сигналы кофемашинки
    SIG_BUTTON = 'SIG_BUTTON';
    SIG_TIMER = 'SIG_TIMER';
    ST_PREPARATION = 'ST_PREPARATION';

    // Ценники
    prices = {
        one: 520,
        two: 400,
        three: 550,
        four: 600,
        five: 1000,
        six: 400
    };

    // Текущий выбранный кофе
    currentCoffee = '';

    constructor () {
        this.coffee = document.querySelectorAll('.coffeeChose');
        this.payment_QR = document.querySelector('.QR');
        this.payment_card = document.querySelector('.MasterCard');
        this.backBtn = document.querySelector('#back');
        this.clientWallet = this.getRandom();

        this.display = document.createElement('img');
        this.display.style.width = '100%';
        this.display.style.height = '100%';
        this.display.style.cursor = 'pointer';

        this.tng50 = document.querySelector('.tng50');
        this.tng100 = document.querySelector('.tng100');
        this.tng200 = document.querySelector('.tng200');

        this.terminal = document.querySelector('.displ');
        this.loading = document.createElement('div');

        this.balans = document.querySelector('#balans');
        this.balans.innerHTML = `Баланс карты: ${this.clientWallet}`;

        this.currentCoffee = this.chose_coffee_event();
        this.chose_payment_event();
    }

    // Рандом для баланса карты
    getRandom() {
        return Math.trunc(Math.random() * (2000 - 600) + 600);
    }

    deleteItems (arg) {
        let deleteElement = document.querySelectorAll(arg);

        for (let i = 0; i < deleteElement.length; i++) {
            deleteElement[i].remove();
        }
    }

    chose_coffee_event () {
        for (let elem of this.coffee) {
            elem.onclick = (ev) => {
                this.currentCoffee = elem.value;
            }
        }   
    };

    chose_payment_event (coffee) {
        // Оплата QR кодом...
        this.payment_QR.onclick = (ev) => {
            this.deleteItems('.displ > button');
            this.display.src = './resources/f_7b7cfa2519d9385531861c40d171373e.png'
            this.terminal.append(this.display);
            
            // Если покупатель не выбрал кофе, действие...
            if (this.currentCoffee === undefined) {
                this.deleteItems('.displ > div');
                this.terminal.textContent = 'Выберите кофе!';

                setTimeout( () => {
                    this.terminal.textContent = '';
                    this.terminal.append(this.payment_QR);
                    this.terminal.append(this.payment_card);        
                }, 2 * 1000);               
            }

            this.loading = document.createElement('div');
            this.loading.classList.add('loader');

            this.display.onclick = () => {
                for (let x in this.prices) {
                    if (x === this.currentCoffee) {
                        if (this.prices[x] <= this.clientWallet) {
                            this.clientWallet = this.clientWallet - this.prices[x];
                            this.balans.textContent = `Баланс карты: ${this.clientWallet}`;
                            this.process(this.SIG_BUTTON);        

                        } else {
                            this.deleteItems('.displ > div');
                            this.terminal.textContent = 'Недостаточно средств!';
            
                            setTimeout( () => {
                                this.terminal.textContent = '';
                                this.terminal.append(this.payment_QR);
                                this.terminal.append(this.payment_card);        
                            }, 2 * 1000);               
                        } 
    
                        break;
                    }  
                }    
            };
        };

        // Оплата картой...
        this.payment_card.onclick = (ev) => {
            this.deleteItems('.displ > button');
            this.display.src = './resources/GranularVioletChimpanzee-size_restricted.gif'

            this.terminal.append(this.display);
            
            if (this.currentCoffee === undefined) {
                // Если покупатель не выбрал кофе, действие...
                this.deleteItems('.displ > div');
                this.terminal.textContent = 'Выберите кофе!';

                setTimeout( () => {
                    this.terminal.textContent = '';
                    this.terminal.append(this.payment_QR);
                    this.terminal.append(this.payment_card);        
                }, 2 * 1000);               
            }

            this.loading.classList.add('loader');

            this.display.onclick = () => {
                for (let x in this.prices) {
                    if (x === this.currentCoffee) {
                        if (this.prices[x] <= this.clientWallet) {
                            this.clientWallet = this.clientWallet - this.prices[x];
                            this.balans.textContent = `Баланс карты: ${this.clientWallet}`;
                            this.process(this.SIG_BUTTON);              

                        } else {
                            this.deleteItems('.displ > div');
                            this.terminal.textContent = 'Недостаточно средств!';
            
                            setTimeout( () => {
                                this.terminal.textContent = '';
                                this.terminal.append(this.payment_QR);
                                this.terminal.append(this.payment_card);        
                            }, 2 * 1000);               
                        } 
    
                        break;
                    }  
                }    
            };
        };

        // Оплата монетой
        let count = 0;
        let pay = document.createElement('button');
        pay.textContent = 'Оплатить';
        pay.style.fontSize = '7px';

        this.tng50.onclick = () => {
            this.deleteItems('.displ > button');
            count += 50;    
            this.terminal.textContent = `Баланс: ${count}`;
            this.terminal.append(pay);
        };
        
        this.tng100.onclick = () => {
            this.deleteItems('.displ > button');
            count += 100;    
            this.terminal.textContent = `Баланс: ${count}`;
            this.terminal.append(pay);
        };

        this.tng200.onclick = () => {
            this.deleteItems('.displ > button');
            count += 200;    
            this.terminal.textContent = `Баланс: ${count}`;
            this.terminal.append(pay);
        };

        pay.onclick = () => {
            for (let x in this.prices) {
                if (x === this.currentCoffee) {
                    if (this.prices[x] <= count) this.process(this.SIG_BUTTON);              
                    else {
                        this.deleteItems('.displ > div');
                        this.terminal.textContent = 'Недостаточно средств!';
        
                        setTimeout( () => {
                            this.terminal.textContent = `Баланс: ${count}`;
                            this.terminal.append(pay);
                        }, 2 * 1000);               
                    } 

                    break;
                }  
            }  
        };

        // Выход из дисплея...
        this.backBtn.onclick = () => {
            this.deleteItems('.displ > img');
            this.terminal.textContent = '';
            this.terminal.append(this.payment_QR);
            this.terminal.append(this.payment_card);
        };
    };

    // Описание конечного автомата (sm - state machine)...
    sm = [
        {from: this.SIG_BUTTON,     to: this.ST_WAITING}, 
        {from: this.SIG_TIMER,      to: this.ST_FINISH}
    ];

    #currentState = this.ST_WAITING;

    // Инизиализируем текущее состояние таймера, чтобы при переходах очищать его
    #currentTimers = [];

    // Мигалка готовности
    ready1 = document.querySelector('.btn1');
    ready2 = document.querySelector('.btn0');
    
    // Переходы состояния...
    processState () {
        let shadow = document.createElement('div');
        let back = document.querySelector('.back');
        shadow.classList.add('shadowMain');

        switch (this.#currentState) {
            case this.ST_WAITING:
                this.deleteItems('.displ > img');
                this.deleteItems('.displ > button');
                this.terminal.textContent = '';

                this.terminal.append(this.loading);
                    
                setTimeout( () => {
                    this.deleteItems('.displ > div');
                    this.terminal.textContent = 'Оплата завершена!';
                }, 2 * 1000);                
    
                setTimeout( () => {
                    this.deleteItems('.displ > img');
                    this.terminal.textContent = '';
                    this.terminal.append(this.payment_QR);
                    this.terminal.append(this.payment_card);                
                }, 4 * 1000);    

                this.#currentTimers.push(setTimeout( () => this.process(this.SIG_TIMER), 4 * 1000));
                console.log(this.#currentTimers, 'timer');
            break;

            case this.ST_FINISH:
                back.append(shadow);

                let readinessCoffee = document.querySelector('#readiness');
                let cup = document.querySelector('.cup');
                cup.style.cursor = 'pointer';
                this.ready1.style.backgroundColor = 'red';
                
                const alert = new Alert();

                let count = 0;
                let timerId = setInterval( () => {
                    count++;
                    readinessCoffee.textContent = count;
                }, 100);
                
                setTimeout( () => {
                    clearInterval(timerId);
                    this.ready1.style.backgroundColor = 'white';
                    this.ready2.style.backgroundColor = 'green';

                    this.clearTimers();

                    alert.show('Можете забрать ваш коффе!', 'Закрыть', false);

                    cup.onclick = () => {
                        this.deleteItems('.cup');
                        alert.show('Продолжить?', 'Да', true);
                    };

                }, 10 * 1000);

            break;
        }
    }

    // Очистка для таймера...
    clearTimers () {
        this.#currentTimers.forEach( t => clearTimeout(t));
        this.#currentTimers = [];
    }


    // Запуск всей процедуры перехода...
    process (sig) {
        console.log(`SM processing signal ${sig}`);
        let nextState = this.sm.filter( x => {
            log(3, x.from, 'NextState from sm.filter');
            return (x.from === sig); 
        });
        
        if (nextState.length) {
            console.log(`SM switched from ${sig} to ${nextState[0].to}`)
            this.#currentState = nextState[0].to;

            this.clearTimers();
            this.processState(this.#currentState);
        }
    }
}

let work = new Coffee_Machine();

// Модульное окно...
class Alert {
    ready2 = document.querySelector('.btn0');

    constructor () {
        this.div = document.createElement('div');
        this.p = document.createElement('p');
        this.reload = document.createElement('button');
        this.button = document.createElement('button');
        this.cup = document.querySelector('.cup');
    }
 
    modalHide () {
        let deleteElement = document.querySelectorAll('.modal');
        
        for (let i = 0; i < deleteElement.length; i++) {
            deleteElement[i].remove();
        }
    }

    show (userInput, btn, flag) {
        this.div.classList.add('modal');
        this.button.classList.add('close');
        
        this.div.style.display = 'block';
        this.p.textContent = userInput;
        this.button.textContent = btn;

        this.div.append(this.p)
        this.div.append(this.button)

        document.body.append(this.div);

        let back = document.querySelector('.back');
        let closeBtn = this.button;

        if (flag == true) {
            this.ready2.style.backgroundColor = 'white';
            this.reload.textContent = 'Начать все заново';
            this.div.append(this.reload);

            back.lastChild.remove();
            back.lastChild.remove();
            
            closeBtn.onclick = () => {
                back.append(this.cup);
                this.modalHide();            
            };    

            this.reload.onclick = () => {
                location.reload()
                this.modalHide();
            }; 
        }
        else {
            closeBtn.onclick = () => {
                this.modalHide();
            };
        }
    }
}