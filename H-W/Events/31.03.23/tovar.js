import {AddProduct} from './windowMod.js'; 

export class Product {
    constructor (discount, price, cardTittleText, urlProduct, image) {
        // Сетка карточек товаров
        this.productCardGrid = document.querySelector('.cards');
        this.discount = discount;
        this.price = price;
        this.discountAfter = this.productDiscount(this.price, this.discount);;
        this.cardTittleText = cardTittleText;
        // 'Смартфон Apple IPhone 14 Pro Max 256Gb, золотой';
        this.urlProduct = urlProduct;
        // 'https://images.satu.kz/191370916_iphone-14-pro.jpg'; 
        // 'Apple IPhone 14 PRO Max Gold';

        // Карточка товара...
        this.divCard = document.createElement('div');
        this.divCard.classList.add('card');

        //-------------------------------------------------------------------------------
        // Верхняя часть...
        this.divCard_top = document.createElement('div');
        this.divCard_top.classList.add('card__top'); 

        // Верхняя часть, изображение-ссылка товара...
        // Ссылка картинки...
        this.cardImage = document.createElement('a');
        this.cardImage.classList.add('card__image');
        this.cardImage.setAttribute('href', this.urlProduct);
        
        // Картинка товара...
        this.img = document.createElement('img');

        this.img.setAttribute('src', image);

        // Скидка на товар...
        this.divCard_label = document.createElement('div');
        this.divCard_label.classList.add('card__label');
        this.divCard_label.textContent = '-' + this.discount + '%';
        
        //-------------------------------------------------------------------------------
        // Нижняя часть..
        this.divCard_bottom = document.createElement('div');
        this.divCard_bottom.classList.add('card__bottom'); 

        // Цены на товар (с учетом скидки и без)...
        this.divCard_priceAfter = document.createElement('div');
        this.divCard_priceBefore = document.createElement('div');
        this.divCard_price = document.createElement('div');

        this.divCard_price.classList.add('card__prices'); 
        this.divCard_priceAfter.classList.add('card__price'); 
        this.divCard_priceAfter.classList.add('card__price--discount'); 
        this.divCard_priceBefore.classList.add('card__price'); 
        this.divCard_priceBefore.classList.add('card__price--common'); 
 
        this.divCard_priceAfter.textContent = this.discountAfter;
        this.divCard_priceBefore.textContent = this.price;
        this.divCard_price.append(this.divCard_priceAfter);
        this.divCard_price.append(this.divCard_priceBefore);

        //-------------------------------------------------------------------------------
        // Ссылка-название товара...
        this.cardTittle = document.createElement('a');
        this.cardTittle.textContent = this.cardTittleText;

        this.cardTittle.classList.add('card__title');
        this.cardTittle.setAttribute('href', this.urlProduct);

        //-------------------------------------------------------------------------------
        // Кнопка добавить в корзину...
        this.cardAdd = document.createElement('button');
        this.cardAdd.classList.add('card__add');
        this.cardAdd.textContent = 'В корзину';

        this.showK();
    }

    showK () {
        // Вставляем в нижнюю часть все что есть...
        this.divCard_bottom.append(this.divCard_price);
        this.divCard_bottom.append(this.cardTittle);
        this.divCard_bottom.append(this.cardAdd);

        // Вставляем в верхнюю часть все что есть внутри...
        this.cardImage.append(this.img);
        this.divCard_top.append(this.cardImage);
        this.divCard_top.append(this.divCard_label);

        // Вставляем в карточку товара верхнюю часть
        this.divCard.append(this.divCard_top);  
        this.divCard.append(this.divCard_bottom);
          
        // Вставляем в сетку товаров карточку со всеми элементами
        this.productCardGrid.append(this.divCard);
    }

    productDiscount (price, discount) {
        const disc = price * (discount / 100);
        const res = price - disc;

        return res;
    }

	// sync () {
	// 	// this.#tbody синхронизируем с this.data
	// 	let trows = this.#tbody.childNodes;
	// 	for (let r in this.data) {
	// 		let currentRow = trows[r];
	// 		for (let c in this.data[r]) {
	// 			currentRow.cells[c].textContent = String(this.data[r][c]);
	// 		}
	// 	}
	// }
}