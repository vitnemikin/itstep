class Calculator {
    constructor () {
        this.buttons = document.getElementsByTagName('span');
        this.result = document.querySelectorAll('.result p')[0];
        this.clear = document.getElementsByClassName('clear')[0];
        this.equation = [];
        this.operator = false;

        this.attachEventListeners();
    }

    attachEventListeners () {
        for (let i = 0; i < this.buttons.length; i += 1) {
            if (this.buttons[i].innerHTML === '=') this.buttons[i].onclick = () => this.calculate(i);
            else if (this.buttons[i].innerHTML === '+/-') this.buttons[i].onclick = () => this.invert(i);
            else if (this.buttons[i].innerHTML === '%') this.buttons[i].onclick = () => this.percent(i);
            else if (this.buttons[i].innerHTML === 'AC') this.buttons[i].onclick = () => this.clearAll();
            else this.buttons[i].onclick = () => this.addValue(i);
        }

        this.clear.addEventListener("click", () => this.clearAll());
    }

    addValue (i) {
        if (this.buttons[i].innerHTML === '÷') {
            this.clicked(this.buttons[i]);
            this.ifOperatorThanSwap('/');
        } else if (this.buttons[i].innerHTML === 'x') {
            this.clicked(this.buttons[i]);
            this.ifOperatorThanSwap('*');
        } else if (this.buttons[i].innerHTML === '+') {
            this.clicked(this.buttons[i]);
            this.ifOperatorThanSwap('+');
        } else if (this.buttons[i].innerHTML === '-') {
            this.clicked(this.buttons[i]);
            this.ifOperatorThanSwap('-');
        } else {
            this.removeClicked();
            if (this.checkIfNum(this.equation[this.equation.length - 1])) {
                this.equation = [];
                this.equation.push(this.buttons[i].innerHTML);
                this.operator = true;
            }
            else this.equation.push(this.buttons[i].innerHTML);
            
            if (this.operator) this.result.innerHTML = this.buttons[i].innerHTML;
            else this.result.innerHTML += this.buttons[i].innerHTML;
            
            this.operator = false;
        }
    }

    clicked (element) {
        this.removeClicked();
        element.classList.add('clicked');
    }

    removeClicked () {
        const elems = document.querySelectorAll(".clicked");
        elems.forEach((el) => {
            el.classList.remove("clicked");
        });
    }

    calculate () {
        if (this.equation.length === 0) return;
        else {
            const answer = eval(this.equation.join(''));
            if (answer % 1 === 0) this.result.innerHTML = answer;
            else this.result.innerHTML = answer.toFixed(4);
            
            this.equation = [answer];
            this.operator = false;
        }
    }

    invert () {
        if (this.equation.length === 0) return;
        else {
            const number = this.result.innerHTML;
            this.popNumberOfDigits(number);
            const invert = number * -1;
            this.equation.push(invert);
            this.result.innerHTML = invert;
        }
    }

    percent () {
        const number = this.result.innerHTML;
        this.popNumberOfDigits(number);
        const percent = number * 0.01;
        this.equation.push(percent);
        this.result.innerHTML = percent.toFixed(2);
    }

    clearAll () {
        this.result.innerHTML = '';
        this.equation = [];
        this.operator = false;
    }

    ifOperatorThanSwap (str) {
        if (!this.operator) {
            this.equation.push(str);
            this.operator = true;
        } else {
            this.equation.pop();
            this.equation.push(str);
        }
    }

    checkIfNum (value) {
        return typeof value === 'number';
    }

    popNumberOfDigits (number) {
        const arr = number.split('');
        for (let i = 0; i < arr.length; i++) 
            this.equation.pop();
    }
}

window.onload = function () {
    new Calculator();
};
