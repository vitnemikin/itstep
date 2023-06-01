import { Product } from "./tovar.js";

export class AddProduct {
    constructor () {
        this.confirm = document.createElement('button');

        this.module = document.createElement('div');
        this.module_control = document.createElement('div');
        // Заполняемые данные...
        this.inputDiscount = document.createElement('input');
        this.inputPrice = document.createElement('input');
        this.inputCardTittleText = document.createElement('input');
        this.inputUrlProduct = document.createElement('input');
        this.inputImage = document.createElement('input'); 

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

        this.confirm.classList.add('confirm');
        this.confirm.innerHTML = 'Заполнить';

        this.closeWindow.classList.add('close');
        this.closeWindow.innerHTML = 'Закрыть';

        this.inputDiscount.placeholder = 'Введите скидку';        
        this.inputPrice.placeholder = 'Введите цену';
        this.inputCardTittleText.placeholder = 'ВВедите текст под фото';
        this.inputUrlProduct.placeholder = 'Введите ссылку';
        this.inputImage.placeholder = 'Ввежите фото ссылку';

        this.module_control.append(this.inputDiscount);
        this.module_control.append(this.inputPrice);
        this.module_control.append(this.inputCardTittleText);
        this.module_control.append(this.inputUrlProduct);
        this.module_control.append(this.inputImage);

        this.module_control.append(this.confirm);
        this.module_control.append(this.closeWindow);

        this.module.append(this.module_control);
        document.body.append(this.module);

        this.confirm.onclick = () => {
            new Product (
                this.inputDiscount.value
                , this.inputPrice.value
                , this.inputCardTittleText.value
                , this.inputUrlProduct.value
                , this.inputImage.value
            )
        };
    }
}