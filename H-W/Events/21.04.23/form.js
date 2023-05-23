import {Data} from "./data.js";

export class Form {
    dataSet = new Data('Сортировать по алфавиту', 'Сортировать по возрастанию');

    constructor () {
        this.confirm = document.createElement('button');

        this.module = document.createElement('div');
        this.module_control = document.createElement('div');
        // Заполняемые данные...
        this.firstData = document.createElement('input');
        this.secondData = document.createElement('input');
        // Обозначение вводимых данных...
        this.firstData_p = document.createElement('p');
        this.secondData_p = document.createElement('p');
        // Закрытия окна...
        this.closeWindow = document.createElement('button');

        this.closeWindow.onclick = () => this.modalHide();
    }
 
    modalHide() {
        let deleteElement = document.querySelectorAll('.modal');
        
        for (let i = 0; i < deleteElement.length; i++) {
            deleteElement[i].remove();
        }
    }

    show () {
        this.module.classList.add('modal');
        this.module.style.display = 'block';
        this.module_control.classList.add('module-control');

        this.firstData_p.innerHTML = 'Введите первые данные';
        this.secondData_p.innerHTML = 'Введите вторые данные';

        // Обработчик для ввода во второй input, только цифр
        this.secondData.addEventListener('input', (ev) => {
            ev.target.value = ev.target.value.replace(/[^0-9]/gi, '');
        });

        this.confirm.classList.add('confirm');
        this.confirm.innerHTML = 'Заполнить';

        this.closeWindow.classList.add('close');
        this.closeWindow.innerHTML = 'Закрыть';

        this.module_control.append(this.firstData_p);
        this.module_control.append(this.firstData);

        this.module_control.append(this.secondData_p);
        this.module_control.append(this.secondData);

        this.module_control.append(this.confirm);
        this.module_control.append(this.closeWindow);

        this.module.append(this.module_control);

        document.body.append(this.module);
 
        let holst = document.querySelector('.holst');

        this.confirm.onclick = () => {
            let data = [];
            data.push(this.firstData.value);
            data.push(this.secondData.value);
            
            this.dataSet.addRow(data);
            holst.append(this.dataSet.view);
        };
    }
}